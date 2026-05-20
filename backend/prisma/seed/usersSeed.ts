import prisma from '../../src/prisma';
import bcrypt from 'bcrypt';

const usersSeed = async () => {
  const hashedPassword = await bcrypt.hash('Haslo12345.', 10);
  console.log('Seed użytkowników...');

  await prisma.user.deleteMany();

  // 1xADMIN, 2xWORKER, 2xUSER
  await prisma.user.createMany({
    data: [
      {
        fullName: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        gender: 'MEZCZYZNA',
        role: 'ADMINISTRATOR',
      },
      {
        fullName: 'Pracownik Ola',
        email: 'pracownik@gmail.com',
        password: hashedPassword,
        gender: 'KOBIETA',
        role: 'PRACOWNIK',
      },
      {
        fullName: 'Pracownik Jan',
        email: 'pracownik2@gmail.com',
        password: hashedPassword,
        gender: 'MEZCZYZNA',
        role: 'PRACOWNIK',
      },
      {
        fullName: 'Michał',
        email: 'michal@gmail.com',
        password: hashedPassword,
        gender: 'MEZCZYZNA',
      },
      {
        fullName: 'Dominika',
        email: 'dominika@gmail.com',
        password: hashedPassword,
        gender: 'KOBIETA',
      },
    ],
  });

  console.log('Seed użytkowników zakończony');
};

export default usersSeed;
