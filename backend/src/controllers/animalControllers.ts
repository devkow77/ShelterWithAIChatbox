import { StatusCodes } from 'http-status-codes';
import prisma from '../prisma';
import { type Request, type Response } from 'express';
import { animalSchema } from '../validators/animal.validator';

// Pobierz wszystkie zwierzęta
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

// Pobierz zwierzę o podanym id
export const getUniqueAnimal = async (req: Request, res: Response) => {
  const { id: animalId } = req.params;

  try {
    if (!animalId || typeof animalId !== 'string') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Nie można pobrać zwierzęcia bez podania id!' });
    }

    const animal = await prisma.animal.findUnique({
      where: { id: parseInt(animalId, 10) },
    });

    if (!animal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: 'Nie ma zwierzęcia z takim id!' });
    }

    return res.status(StatusCodes.OK).json(animal);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Wewnętrzny błąd serwera!' });
  }
};
// Zaktualizuj dane zwierzęcia o podanym id
export const updateUniqueAnimal = async (req: Request, res: Response) => {
  const { id: animalId } = req.params;
  const body = req.body;

  const parsedBody = animalSchema.safeParse(body);

  if (!parsedBody.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Nieprawidłowy format danych!',
    });
  }

  try {
    if (!animalId || typeof animalId !== 'string') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'ID zwierzęcia jest wymagane!' });
    }

    const numericId = parseInt(animalId, 10);

    const updatedAnimal = await prisma.animal.update({
      where: { id: numericId },
      data: {
        ...parsedBody.data,
      },
    });

    return res.status(StatusCodes.OK).json(updatedAnimal);
  } catch (err: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Wewnętrzny błąd serwera podczas aktualizacji!' });
  }
};

// Usuń zwierzę o podanym id
export const deleteUniqueAnimal = async (req: Request, res: Response) => {
  const { id: animalId } = req.params;

  try {
    if (!animalId || typeof animalId !== 'string') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Nie można usunąć zwierzęcia bez podania id!' });
    }

    await prisma.animal.delete({ where: { id: parseInt(animalId, 10) } });

    return res
      .status(StatusCodes.OK)
      .json({ msg: 'Pomyślnie usunięto zwierzę!' });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Wewnętrzny błąd serwera!' });
  }
};
