import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Niepoprawny adres email.'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Wymagana jest zgoda na otrzymywanie newslettera.',
  }),
});
