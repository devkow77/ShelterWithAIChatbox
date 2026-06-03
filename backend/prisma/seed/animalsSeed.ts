import prisma from '../../src/prisma';
import {
  AnimalGender,
  AnimalHealthStatus,
  AnimalSize,
  AnimalStatus,
  AnimalType,
} from '../../src/generated/prisma/enums';

const yearsAgo = (years: number): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date;
};

const animalsSeed = async () => {
  console.log('Seedowanie zwierząt...');

  await prisma.animal.deleteMany();

  const animals = [
    {
      name: 'Burek',
      type: AnimalType.PIES,
      gender: AnimalGender.SAMIEC,
      size: AnimalSize.DUZY,
      status: AnimalStatus.SZUKA_DOMU,
      healthStatus: AnimalHealthStatus.ZDROWY,
      traits: 'energiczny, przyjazny',
      dateOfBirth: yearsAgo(4),
      description: 'Burek szuka nowego, kochającego domu.',
      foundAt: new Date('2025-11-01'),
      foundLocation: 'Rzeszów',
      imageUrl: [] as string[],
    },
    {
      name: 'Luna',
      type: AnimalType.KOT,
      gender: AnimalGender.SAMICA,
      size: AnimalSize.MALY,
      status: AnimalStatus.SZUKA_DOMU,
      healthStatus: AnimalHealthStatus.ZDROWY,
      traits: 'spokojny, pieszczoch',
      dateOfBirth: yearsAgo(2),
      description: 'Luna szuka nowego, kochającego domu.',
      foundAt: new Date('2025-12-10'),
      foundLocation: 'Kraków',
      imageUrl: [],
    },
    {
      name: 'Puszek',
      type: AnimalType.KROLIK,
      gender: AnimalGender.SAMICA,
      size: AnimalSize.MALY,
      status: AnimalStatus.ZNALEZIONY,
      healthStatus: AnimalHealthStatus.ZDROWY,
      traits: 'łagodny, nieśmiały',
      dateOfBirth: yearsAgo(1),
      description: 'Puszek szuka nowego, kochającego domu.',
      foundAt: new Date(),
      foundLocation: 'Warszawa',
      imageUrl: [],
    },
    {
      name: 'Chomiczek',
      type: AnimalType.CHOMIK,
      gender: AnimalGender.SAMIEC,
      size: AnimalSize.MALY,
      status: AnimalStatus.ZNALEZIONY,
      healthStatus: AnimalHealthStatus.ZDROWY,
      traits: 'skory do zabawy',
      dateOfBirth: yearsAgo(1),
      description: 'Chomiczek szuka nowego, kochającego domu.',
      foundAt: new Date(),
      foundLocation: 'Lublin',
      imageUrl: [],
    },
    {
      name: 'Żółwik',
      type: AnimalType.ZOLW,
      gender: AnimalGender.SAMIEC,
      size: AnimalSize.MALY,
      status: AnimalStatus.SZUKA_DOMU,
      healthStatus: AnimalHealthStatus.ZDROWY,
      traits: 'spokojny',
      dateOfBirth: yearsAgo(10),
      description: 'Żółwik szuka nowego, kochającego domu.',
      foundAt: new Date('2025-09-01'),
      foundLocation: 'Poznań',
      imageUrl: [],
    },
    {
      name: 'Fretka',
      type: AnimalType.INNE,
      gender: AnimalGender.SAMICA,
      size: AnimalSize.SREDNI,
      status: AnimalStatus.SZUKA_DOMU,
      healthStatus: AnimalHealthStatus.ZDROWY,
      traits: 'energiczny',
      dateOfBirth: yearsAgo(3),
      description: 'Fretka szuka nowego, kochającego domu.',
      foundAt: new Date('2025-10-15'),
      foundLocation: 'Wrocław',
      imageUrl: [],
    },
    {
      name: 'Azor',
      type: AnimalType.PIES,
      gender: AnimalGender.SAMIEC,
      size: AnimalSize.SREDNI,
      status: AnimalStatus.W_TRAKCIE_ADOPCJI,
      healthStatus: AnimalHealthStatus.CHORY,
      traits: 'przyjazny',
      dateOfBirth: yearsAgo(6),
      description: 'Azor w trakcie adopcji — wymaga kontroli po leczeniu.',
      foundAt: new Date('2025-06-01'),
      foundLocation: 'Gdańsk',
      nextVisitDate: new Date('2026-06-15'),
      imageUrl: [],
    },
    {
      name: 'Mruczek',
      type: AnimalType.KOT,
      gender: AnimalGender.SAMIEC,
      size: AnimalSize.SREDNI,
      status: AnimalStatus.ADOPTOWANY,
      healthStatus: AnimalHealthStatus.ZDROWY,
      traits: 'spokojny',
      dateOfBirth: yearsAgo(5),
      description: 'Mruczek został adoptowany.',
      foundAt: new Date('2024-03-01'),
      foundLocation: 'Katowice',
      imageUrl: [],
    },
    {
      name: 'Reksio',
      type: AnimalType.PIES,
      gender: AnimalGender.SAMIEC,
      size: AnimalSize.DUZY,
      status: AnimalStatus.SZUKA_DOMU,
      healthStatus: AnimalHealthStatus.ZARAŻONY,
      traits: 'energiczny',
      dateOfBirth: yearsAgo(3),
      description: 'Reksio wymaga izolacji i leczenia.',
      foundAt: new Date('2025-08-01'),
      foundLocation: 'Białystok',
      nextVisitDate: new Date('2026-06-01'),
      imageUrl: [],
    },
    {
      name: 'Kicia',
      type: AnimalType.KOT,
      gender: AnimalGender.SAMICA,
      size: AnimalSize.MALY,
      status: AnimalStatus.SZUKA_DOMU,
      healthStatus: AnimalHealthStatus.POTRZEBUJE_OPERACJI,
      traits: 'nieśmiały, łagodny',
      dateOfBirth: yearsAgo(2),
      description: 'Kicia czeka na zaplanowaną operację.',
      foundAt: new Date('2025-07-20'),
      foundLocation: 'Szczecin',
      nextVisitDate: new Date('2026-06-20'),
      imageUrl: [],
    },
  ];

  await prisma.animal.createMany({ data: animals });

  console.log(`Seedowanie zakończone. Dodano ${animals.length} zwierząt.`);
};

export default animalsSeed;
