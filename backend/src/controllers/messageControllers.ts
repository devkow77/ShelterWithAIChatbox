import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer';
import { contactSchema } from '../validators/message.validator';
import { AuthRequest } from '../middlewares/auth.middleware';

export const sendContactMessage = async (req: AuthRequest, res: Response) => {
  const parsedBody = contactSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Nieprawidłowy format danych!' });
  }

  const userRole = req.userRole;

  if (userRole == 'WORKER' || userRole == 'ADMIN') {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: 'Tylko użytkownicy mogą wysyłać wiadomości!' });
  }

  const { fullName, email, message } = parsedBody.data;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: 'Formularz kontaktowy Schronisko',
      to: process.env.EMAIL_USER,
      subject: 'Wiadomość ze Schroniska - Formularz kontaktowy',
      text: `Imię i nazwisko: ${fullName}\nEmail: ${email}\nWiadomość: ${message}`,
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: 'Wiadomość została wysłana pomyślnie!' });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Wystąpił błąd podczas wysyłania wiadomości!' });
  }
};
