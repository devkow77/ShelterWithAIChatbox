import cron from 'node-cron';
import prisma from '../prisma';
import { AnimalStatus } from '../generated/prisma/enums';

export const startAnimalStatusJob = () => {
  cron.schedule(
    '0 0 * * *',
    async () => {
      console.log('Aktualizacja statusów zwierząt...');

      try {
        const today = new Date();

        // 7 dni = 7 * 24 * 60 * 60 * 1000
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        const result = await prisma.animal.updateMany({
          where: {
            status: AnimalStatus.ZNALEZIONY,
            foundAt: {
              lte: sevenDaysAgo,
            },
          },
          data: {
            status: AnimalStatus.SZUKA_DOMU,
          },
        });

        console.log(`Zaktualizowano ${result.count} zwierząt`);
      } catch (error) {
        console.error('Błąd aktualizacji statusów:', error);
      }
    },
    { timezone: 'Europe/Warsaw' },
  );
};
