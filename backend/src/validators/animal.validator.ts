import { z } from 'zod';

const AnimalStatusEnum = z.enum([
  'SZUKA_DOMU',
  'ZNALEZIONY',
  'W_TRAKCIE_ADOPCJI',
  'ADOPTOWANY',
]);
const AnimalGenderEnum = z.enum(['samiec', 'samica']);
const AnimalSizeEnum = z.enum(['mały', 'średni', 'duży']);

export const animalSchema = z.object({
  name: z
    .string()
    .min(3, 'Imię musi posiadać minimum 3 znaki.')
    .max(20, 'Imię może maksymalnie posiadać 20 znaków.'),
  type: z
    .string()
    .min(3, 'Gatunek musi posiadać minimum 3 znaki')
    .max(20, 'Gatunek musi posiadać maksymalnie 20 znaków.'),
  gender: AnimalGenderEnum,
  size: AnimalSizeEnum,

  traits: z.string().min(3, 'Cechy muszą posiadać minimum 3 znaki.'),
  age: z.coerce
    .number()
    .int()
    .min(0, 'Wiek nie może być ujemny.')
    .max(25, 'Maksymalny wiek to 25 lat.'),
  description: z
    .string()
    .min(20, 'Opis musi mieć co najmniej 20 znaków.')
    .max(200, 'Opis może mieć maksymalnie 200 znaków.'),
  status: AnimalStatusEnum,

  foundAt: z.coerce.date().nullable().optional(),
  foundLocation: z.string().nullable().optional(),
  availableFrom: z.coerce.date().nullable().optional(),

  imageUrl: z.array(z.string()).max(5, 'Możesz dodać maksymalnie 5 zdjęć.'),
});
