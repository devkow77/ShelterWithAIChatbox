import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Imię i nazwisko musi mieć minimum 3 znaki.')
    .max(50, 'Imię i nazwisko nie może mieć więcej niż 50 znaków.'),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Niepoprawny adres email.'),
  message: z
    .string()
    .min(10, 'Wiadomość musi mieć minimum 10 znaków.')
    .max(200, 'Wiadomość nie może mieć więcej niż 200 znaków.'),
});
