import { StatusCodes } from 'http-status-codes';
import prisma from '../prisma';
import { type Request, type Response } from 'express';
import { updatePasswordSchema } from '../validators/user.validator';
import bcrypt from 'bcrypt';

// Aktualizacja hasła
export const updatePassword = async (req: Request, res: Response) => {
  const parsedBody = updatePasswordSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Nieprawidłowy format danych!' });
  }

  if (!req.userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Brak tokenu, autoryzacja odmówiona!',
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: 'Nie ma takiego użytkownika!' });
    }

    const { newPassword, currentPassword } = parsedBody.data;

    // sprawdzenie czy podane obecne hasło jest prawdziwe
    const isMatchPassword = await bcrypt.compare(
      currentPassword,
      existingUser.password,
    );

    if (!isMatchPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: 'Nieprawidłowe obecne hasło!',
      });
    }

    // sprawdzenie czy nowe hasło jest takie same jak aktualne
    const isSamePassword = await bcrypt.compare(
      newPassword,
      existingUser.password,
    );

    if (isSamePassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'Nowe hasło musi być inne niż obecne!',
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: req.userId },
      data: { password: newHashedPassword },
    });

    return res
      .clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      })
      .status(StatusCodes.OK)
      .json({ msg: 'Hasło zostało pomyślnie zaktualizowane!' });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Wewnętrzny błąd serwera!' });
  }
};
