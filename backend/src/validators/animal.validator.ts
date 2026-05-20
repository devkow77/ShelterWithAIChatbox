import { z } from 'zod';

const TypeEnum = z.enum(['PIES', 'KOT', 'KROLIK', 'CHOMIK', 'ZOLW', 'INNE'], {
  message: 'Typ zwierzęcia jest wymagany.',
});
const GenderEnum = z.enum(['SAMIEC', 'SAMICA'], {
  message: 'Płeć zwierzęcia jest wymagana.',
});
const SizeEnum = z.enum(['MALY', 'SREDNI', 'DUZY'], {
  message: 'Rozmiar zwierzęcia jest wymagany.',
});
const StatusEnum = z.enum(
  ['SZUKA_DOMU', 'ZNALEZIONY', 'W_TRAKCIE_ADOPCJI', 'ADOPTOWANY'],
  {
    message: 'Status zwierzęcia jest wymagany.',
  },
);

export const animalSchema = z.object({
  name: z
    .string()
    .min(3, 'Imię musi posiadać minimum 3 znaki.')
    .max(20, 'Imię może maksymalnie posiadać 20 znaków.'),
  type: TypeEnum,
  gender: GenderEnum,
  status: StatusEnum,
  age: z.coerce
    .number()
    .int()
    .min(0, 'Wiek nie może być ujemny.')
    .max(25, 'Maksymalny wiek to 25 lat.'),
  size: SizeEnum,
  traits: z.string().min(3, 'Cechy muszą posiadać minimum 3 znaki.'),
  description: z
    .string()
    .min(20, 'Opis musi mieć co najmniej 20 znaków.')
    .max(200, 'Opis może mieć maksymalnie 200 znaków.'),
  imageUrl: z.array(z.string()).max(5, 'Możesz dodać maksymalnie 5 zdjęć.'),
  foundAt: z.preprocess(
    (val) => {
      if (val === '' || val == null) return undefined;
      return val;
    },
    z.coerce.date({
      message: 'Data znalezienia jest wymagana.',
    }),
  ),
  foundLocation: z
    .string()
    .min(3, 'Miejsowość musi posiadać minimum 3 znaki.')
    .max(40, 'Miejscowość może maksymalnie posiadać 40 znaków.'),
});
