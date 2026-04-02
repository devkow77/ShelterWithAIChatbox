import prisma from '../../src/prisma';
import seedUsers from './usersSeed';
import seedAnimals from './animalsSeed';

async function main() {
  console.log('Start seedowania bazy...');

  // Seed użytkowników
  await seedUsers();

  // Seed zwierząt
  await seedAnimals();

  console.log('Seedowanie zakończone');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
