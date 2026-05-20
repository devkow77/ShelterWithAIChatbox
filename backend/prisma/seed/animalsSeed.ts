import prisma from '../../src/prisma';
import {
  AnimalGender,
  AnimalSize,
  AnimalStatus,
  AnimalType,
} from '../../src/generated/prisma/enums';

const animalsSeed = async () => {
  console.log('Seedowanie zwierząt...');

  await prisma.animal.deleteMany();

  const traitsList = [
    'energiczny',
    'spokojny',
    'przyjazny',
    'nieśmiały',
    'pieszczoch',
    'skory do zabawy',
    'łagodny',
  ];

  const locations = [
    'Warszawa',
    'Kraków',
    'Rzeszów',
    'Lublin',
    'Poznań',
    'Wrocław',
    'Gdańsk',
    'Katowice',
    'Białystok',
    'Szczecin',
    'Tarnów',
    'Przemyśl',
    'Kielce',
    'Zakopane',
    'Olsztyn',
  ];

  const randomFrom = <T>(arr: T[]): T => {
    if (arr.length === 0) {
      throw new Error('Cannot pick from empty array');
    }

    const index = Math.floor(Math.random() * arr.length);
    return arr[index]!;
  };

  const getRandomTraits = (): string => {
    const shuffled = [...traitsList].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 3) + 1;

    return shuffled.slice(0, count).join(', ');
  };

  const getRandomAge = (): number => Math.floor(Math.random() * 15) + 1;

  const getRandomLocation = (): string => {
    return randomFrom(locations);
  };

  const getRandomFoundDate = (): Date => {
    const random = Math.random();

    if (random > 0.5) {
      return new Date();
    }

    return new Date('2026-05-14T10:00:00');
  };

  const animalNames = {
    PIES: [
      'Felix',
      'Burek',
      'Reksio',
      'Azor',
      'Pimpek',
      'Max',
      'Rocky',
      'Fido',
      'Lassie',
      'Rex',
    ],
    KOT: [
      'Mruczek',
      'Luna',
      'Kitty',
      'Simba',
      'Kicia',
      'Milo',
      'Shadow',
      'Bella',
      'Cleo',
      'Tiger',
    ],
    KROLIK: [
      'Bunny',
      'Fluffy',
      'Puszek',
      'Hopper',
      'Snowball',
      'Cotton',
      'Thumper',
      'Cinnabon',
      'Binky',
      'Uszatek',
    ],
    INNE: [
      'Chomik',
      'Papuga',
      'Świnka',
      'Fretka',
      'Żółw',
      'Myszka',
      'Ryba',
      'Kura',
      'Koza',
      'Alpaka',
    ],
  } as const;

  const genderOptions: AnimalGender[] = [
    AnimalGender.SAMICA,
    AnimalGender.SAMIEC,
  ];

  const sizeOptions: AnimalSize[] = [
    AnimalSize.MALY,
    AnimalSize.SREDNI,
    AnimalSize.DUZY,
  ];

  const getStatusByDate = (foundAt: Date): AnimalStatus => {
    const now = new Date();

    const diffInMs = now.getTime() - foundAt.getTime();
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const diffInDays = Math.floor(diffInMs / MS_PER_DAY);

    return diffInDays >= 7 ? AnimalStatus.SZUKA_DOMU : AnimalStatus.ZNALEZIONY;
  };

  const createAnimalData = (name: string, type: AnimalType) => {
    const foundAt = getRandomFoundDate();

    return {
      name,
      type,
      gender: randomFrom(genderOptions),
      size: randomFrom(sizeOptions),
      status: getStatusByDate(foundAt),
      traits: getRandomTraits(),
      age: getRandomAge(),
      description: `${name} szuka nowego, kochającego domu.`,
      foundAt,
      foundLocation: getRandomLocation(),
      imageUrl: [],
    };
  };

  const animals: ReturnType<typeof createAnimalData>[] = [];

  animalNames.PIES.forEach((name) => {
    animals.push(createAnimalData(name, AnimalType.PIES));
  });

  animalNames.KOT.forEach((name) => {
    animals.push(createAnimalData(name, AnimalType.KOT));
  });

  animalNames.KROLIK.forEach((name) => {
    animals.push(createAnimalData(name, AnimalType.KROLIK));
  });

  animalNames.INNE.forEach((name) => {
    animals.push(createAnimalData(name, AnimalType.INNE));
  });

  await prisma.animal.createMany({
    data: animals,
  });

  console.log(`Seedowanie zakończone. Dodano ${animals.length} zwierząt.`);
};

export default animalsSeed;
