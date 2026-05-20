import { z } from 'zod';

// router.patch('/password', authenticateUser, updatePassword);
export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Hasło musi mieć min. 8 znaków')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        'Hasło musi zawierać min. 1 wielką literę, 1 cyfrę i 1 znak specjalny.',
      ),
    newPassword: z
      .string()
      .min(8, 'Hasło musi mieć min. 8 znaków')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        'Hasło musi zawierać min. 1 wielką literę, 1 cyfrę i 1 znak specjalny.',
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Hasła muszą być takie same.',
    path: ['confirmPassword'],
  });

export const RoleEnum = z.enum(['UZYTKOWNIK', 'ADMINISTRATOR', 'PRACOWNIK']);
export const GenderEnum = z.enum(['MEZCZYZNA', 'KOBIETA']);

// router.patch('/:id', updateUniqueAnimal);
export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Imię i nazwisko musi mieć minimum 3 znaki.')
    .max(50, 'Imię i nazwisko nie może mieć więcej niż 50 znaków.'),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Niepoprawny adres email.'),
  role: RoleEnum,
  gender: GenderEnum,
  imageUrl: z.string().nullable(),
});

// router.post('/', createUser);
export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Imię i nazwisko musi mieć minimum 3 znaki.')
    .max(50, 'Imię i nazwisko nie może mieć więcej niż 50 znaków.'),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Niepoprawny adres email.'),
  password: z
    .string()
    .min(8, 'Hasło musi mieć min. 8 znaków')
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
      'Hasło musi zawierać min. 1 wielką literę, 1 cyfrę i 1 znak specjalny.',
    ),
  gender: GenderEnum,
  role: RoleEnum,
  imageUrl: z.string().nullable(),
});
