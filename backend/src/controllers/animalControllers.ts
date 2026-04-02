import { StatusCodes } from 'http-status-codes';
import prisma from '../prisma';
import { type Request, type Response } from 'express';

export const getAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await prisma.animal.findMany();
    return res.status(StatusCodes.OK).json(animals);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Wewnętrzny błąd serwera!' });
  }
};
