import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../app';
import prisma from '../prisma';
import { StatusCodes } from 'http-status-codes';

describe('POST /api/auth/register', () => {
  // Wyczyszczenie uzytkowników przed testami
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  // Poprawna rejestracja nowego użytkownika
  it('Poprawna rejestracja konta', async () => {
    const res = await request(app).post('/api/auth/register').send({
      fullName: 'Jan Kowalski',
      email: 'jan@example.com',
      password: 'Haslo12345!',
      confirmPassword: 'Haslo12345!',
    });

    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body.msg).toBe('Utworzono pomyślnie nowego użytkownika!');
  });

  // Brak pozwolenia na rejestracje konta z emailem ktory jest uzyty
  it('Brak pozwolenia na rejestrację konta z wykorzystanym emailem', async () => {
    const res = await request(app).post('/api/auth/register').send({
      fullName: 'Jan Kowalski',
      email: 'jan@example.com',
      password: 'Haslo12345!',
      confirmPassword: 'Haslo12345!',
    });

    expect(res.status).toBe(StatusCodes.CONFLICT);
    expect(res.body.msg).toBe('Konto o podanym emailu już istnieje!');
  });

  // Wyrzucenie bledu jezeli hasla sa rozne od siebie
  it('Zwrócenie komunikatu o błędzie jeżeli hasla są różne', async () => {
    const res = await request(app).post('/api/auth/register').send({
      fullName: 'Anna Nowak',
      email: 'anna@example.com',
      password: 'Haslo12345!',
      confirmPassword: 'InneHaslo12345!',
    });

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.msg).toBe('Nieprawidłowy format danych!');
  });

  // Wyrzucenie błędu jeżeli hasło nie ma znaku specjalnego
  it('Zwrócenie komunikatu o błędzie jeżeli pole hasło nie ma znaku specjalnego', async () => {
    const res = await request(app).post('/api/auth/register').send({
      fullName: 'Michał Nowak',
      email: 'michal@example.com',
      password: 'Haslo12345',
      confirmPassword: 'Haslo12345',
    });

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.msg).toBe('Nieprawidłowy format danych!');
  });

  // Wyrzucenie błędu jeżeli pola są puste
  it('Zwrócenie komunikatu o błędzie jeżeli pola są puste', async () => {
    const res = await request(app).post('/api/auth/register').send({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.msg).toBe('Nieprawidłowy format danych!');
  });
});

describe('POST /api/auth/login', () => {
  beforeAll(async () => {
    // Używamy istniejącego konta, który powinien być utworzony w sekcji register
    await request(app).post('/api/auth/register').send({
      fullName: 'Jan Kowalski',
      email: 'jan@example.com',
      password: 'Haslo12345!',
      confirmPassword: 'Haslo12345!',
    });
  });

  // Rozłaczenie po testach
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Poprawne logowanie
  it('Poprawne logowanie', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'jan@example.com',
      password: 'Haslo12345!',
    });

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body).toHaveProperty('user');

    const cookies = (res.headers['set-cookie'] ?? []) as string[];
    expect(cookies.some((c) => c.startsWith('token='))).toBe(true);
  });

  it('Brak pozwolenia na logowanie z nieistniejącym emailem', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'zlyemail@gmail.com',
      password: 'Haslo12345.',
    });

    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body.msg).toBe('Niepoprawny email lub hasło!');
  });

  it('Brak pozwolenia na logowanie z niepoprawnym hasłem', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'jan@example.com',
      password: 'ZleHaslo12345!',
    });

    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body.msg).toBe('Niepoprawny email lub hasło!');
  });
});

describe('GET /api/auth/info', () => {
  const agent = request.agent(app);

  beforeAll(async () => {
    const loginRes = await agent.post('/api/auth/login').send({
      email: 'jan@example.com',
      password: 'Haslo12345!',
    });

    expect(loginRes.status).toBe(StatusCodes.OK);
  });

  it('Zwraca dane użytkownika przy poprawnym tokenie', async () => {
    const res = await agent.get('/api/auth/info');

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body).toMatchObject({
      email: 'jan@example.com',
      fullName: 'Jan Kowalski',
      role: 'USER',
    });
  });

  it('Zwraca UNAUTHORIZED bez tokenu', async () => {
    const res = await request(app).get('/api/auth/info');

    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body.msg).toBe('Brak tokenu, autoryzacja odmówiona!');
  });
});

describe('POST /api/auth/logout', () => {
  const agent = request.agent(app);

  beforeAll(async () => {
    // Zakładamy, że konto jan@example.com już istnieje z testów rejestracji
    const loginRes = await agent.post('/api/auth/login').send({
      email: 'jan@example.com',
      password: 'Haslo12345!',
    });

    expect(loginRes.status).toBe(StatusCodes.OK);
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Wylogowanie powinno zwrócić NO_CONTENT', async () => {
    const res = await agent.post('/api/auth/logout');

    expect(res.status).toBe(StatusCodes.NO_CONTENT);
  });

  it('Po wylogowaniu /info powinno zwrócić UNAUTHORIZED', async () => {
    const res = await agent.get('/api/auth/info');

    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body.msg).toBe('Brak tokenu, autoryzacja odmówiona!');
  });
});
