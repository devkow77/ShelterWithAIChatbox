import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: 'UŻYTKOWNIK' | 'PRACOWNIK' | 'ADMINISTRATOR';
}

export const optionalAuthenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      userRole: 'UŻYTKOWNIK' | 'PRACOWNIK' | 'ADMINISTRATOR';
    };

    req.userId = payload.userId;
    req.userRole = payload.userRole;

    next();
  } catch (err) {
    next();
  }
};
