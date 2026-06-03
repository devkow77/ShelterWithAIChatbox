import { StatusCodes } from 'http-status-codes';
import prisma from '../prisma';
import { type Request, type Response } from 'express';

// 1. Pobierz wszystkie adopcje
export const getAdoptions = async (_req: Request, res: Response) => {
  try {
    const adoptions = await prisma.adoption.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        animal: true,
      },
    });

    return res.status(StatusCodes.OK).json(adoptions);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: 'Wewnętrzny błąd serwera!',
    });
  }
};

// 2. Pobierz adopcję po ID
export const getAdoptionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Nieprawidłowe ID adopcji!',
    });
  }

  try {
    const adoption = await prisma.adoption.findUnique({
      where: {
        id: numericId,
      },
      include: {
        user: true,
        animal: true,
      },
    });

    if (!adoption) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: 'Adopcja o podanym ID nie została znaleziona!',
      });
    }

    return res.status(StatusCodes.OK).json(adoption);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: 'Wewnętrzny błąd serwera!',
    });
  }
};
