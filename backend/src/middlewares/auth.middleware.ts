import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: 'UŻYTKOWNIK' | 'PRACOWNIK' | 'ADMINISTRATOR';
}

export const authenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Brak tokenu, autoryzacja odmówiona!' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      userRole: 'UŻYTKOWNIK' | 'PRACOWNIK' | 'ADMINISTRATOR';
    };
    req.userId = payload.userId;
    req.userRole = payload.userRole;
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Token jest nieprawidłowy lub wygasł!' });
  }
};
