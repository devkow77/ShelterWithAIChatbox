import { type Request, type Response } from 'express';
import prisma from '../prisma';
import { registerSchema } from '../validators/auth.validator';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

// Rejestracja nowego konta użytkownika
export const registerAccount = async (req: Request, res: Response) => {
  const parsedBody = registerSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Nieprawidłowy format danych!' });
  }

  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Wszystkie pola są wymagane!' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ msg: 'Konto o podanym emailu już istnieje!' });
  }

  try {
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
