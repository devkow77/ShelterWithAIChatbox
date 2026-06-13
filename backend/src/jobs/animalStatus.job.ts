import cron from 'node-cron';
import prisma from '../prisma';
import { AnimalStatus } from '../generated/prisma/enums';
import { triggerNewAnimalNotification } from '../services/emailService';

export const startAnimalStatusJob = () => {
  cron.schedule(
    '0 0 * * *',
    async () => {
      console.log('Aktualizacja statusów zwierząt...');

      try {
        const today = new Date();

        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        const animalsToUpdate = await prisma.animal.findMany({
          where: {
            status: AnimalStatus.ZNALEZIONY,
            foundAt: {
              lte: sevenDaysAgo,
            },
          },
        });

        for (const animal of animalsToUpdate) {
          const updatedAnimal = await prisma.animal.update({
            where: { id: animal.id },
            data: {
              status: AnimalStatus.SZUKA_DOMU,
            },
          });

          triggerNewAnimalNotification(updatedAnimal);
        }

        console.log(`Zaktualizowano ${animalsToUpdate.length} zwierząt`);
      } catch (error) {
        console.error('Błąd aktualizacji statusów:', error);
      }
    },
    { timezone: 'Europe/Warsaw' },
  );
};
