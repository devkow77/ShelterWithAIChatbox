import prisma from '../../src/prisma';

const vetsSeed = async () => {
  console.log('Seedowanie weterynarzy...');

  await prisma.vet.deleteMany();

  await prisma.vet.createMany({
    data: [
      {
        name: 'dr Anna Kowalczyk',
        phone: '17 123 45 67',
        clinic: 'Przychodnia Weterynaryjna „Azyl” Rzeszów',
      },
      {
        name: 'dr Piotr Nowak',
        phone: '12 987 65 43',
        clinic: 'Centrum Medycyny Weterynaryjnej Kraków',
      },
      {
        name: 'dr Maria Wiśniewska',
        phone: null,
        clinic: 'Mobilna opieka weterynaryjna',
      },
    ],
  });

  console.log('Seed weterynarzy zakończony');
};

export default vetsSeed;
