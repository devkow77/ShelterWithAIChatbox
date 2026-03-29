import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../app';
import prisma from '../prisma';

describe('POST /api/auth/register', () => {
  // Wyczyszczenie uzytkowników przed testami
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  // Rozłaczenie po testach
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Poprawna rejestracja nowego użytkownika
  it('Poprawna rejestracja konta', async () => {
    const res = await request(app).post('/api/auth/register').send({
      fullName: 'Jan Kowalski',
      email: 'jan@example.com',
      password: 'Haslo123!',
      confirmPassword: 'Haslo123!',
    });

    expect(res.status).toBe(201);
    expect(res.body.msg).toBe('Utworzono pomyślnie nowego użytkownika!');
  });

  // Brak pozwolenia na rejestracje konta z emailem ktory jest uzyty
  it('Brak pozwolenia na rejestrację konta z wykorzystanym emailem', async () => {
    const res = await request(app).post('/api/auth/register').send({
      fullName: 'Jan Kowalski',
      email: 'jan@example.com',
      password: 'Haslo123!',
      confirmPassword: 'Haslo123!',
    });

    expect(res.status).toBe(409);
    expect(res.body.msg).toBe('Konto o podanym emailu już istnieje!');
  });

  // Wyrzucenie bledu jezeli hasla sa rozne od siebie
  it('Zwrócenie komunikatu o błędzie jeżeli hasla są różne', async () => {
    const res = await request(app).post('/api/auth/register').send({
      fullName: 'Anna Nowak',
      email: 'anna@example.com',
      password: 'Haslo123!',
      confirmPassword: 'InneHaslo!',
    });

    expect(res.status).toBe(400);
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

    expect(res.status).toBe(400);
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

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe('Nieprawidłowy format danych!');
  });
});
