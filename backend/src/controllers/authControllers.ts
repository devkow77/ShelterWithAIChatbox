import { type Request, type Response } from 'express';
import prisma from '../prisma';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middlewares/auth.middleware';

// Rejestracja nowego konta użytkownika
export const registerAccount = async (req: Request, res: Response) => {
  const parsedBody = registerSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Nieprawidłowy format danych!' });
  }

  const { fullName, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: 'Konto o podanym emailu już istnieje!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: 'Utworzono pomyślnie nowego użytkownika!' });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Wewnętrzny błąd serwera!' });
  }
};

// Logowanie do konta użytkownika
export const loginToAccount = async (req: Request, res: Response) => {
  const parsedBody = loginSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Niepoprawny format danych!' });
  }

  const { email, password } = parsedBody.data; // Używaj danych zwalidowanych przez Zod

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    // Generyczny komunikat błędu (nie podpowiadamy, czy zawiódł mail czy hasło)
    if (!existingUser) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'Niepoprawny email lub hasło!' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'Niepoprawny email lub hasło!' });
    }

    const token = generateToken({ userId: existingUser.id });

    // Wyciągamy dane bez hasła
    const userResponse = {
      fullName: existingUser.fullName,
      email: existingUser.email,
      role: existingUser.role,
    };

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 3600 * 24, // Zwiększyłem do 24h, żeby sesja nie wygasła za szybko
        path: '/',
      })
      .status(StatusCodes.OK)
      .json({
        user: userResponse,
      });
  } catch (err) {
    console.error(err); // Zawsze loguj błędy na serwerze!
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Wewnętrzny błąd serwera!' });
  }
};

export const authInfo = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Błąd autoryzacji' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: 'Użytkownik nie istnieje' });
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Błąd serwera' });
  }
};

// wylogowanie użytkownika (usuniecie tokenu)
export const logout = (req: Request, res: Response) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })
    .status(StatusCodes.NO_CONTENT)
    .json({ msg: 'Pomyślnie wylogowano' });
};
