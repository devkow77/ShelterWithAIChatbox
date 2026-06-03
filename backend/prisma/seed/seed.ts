import prisma from '../../src/prisma';
import seedUsers from './usersSeed';
import seedAnimals from './animalsSeed';
import vetsSeed from './vetsSeed';
import medicalRecordsSeed from './medicalRecordsSeed';
import adoptionsSeed from './adoptionsSeed';

async function main() {
  console.log('Start seedowania bazy...');

  await seedUsers();
  await seedAnimals();
  await vetsSeed();
  await medicalRecordsSeed();
  await adoptionsSeed();

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
