import prisma from '../../src/prisma';
import { AnimalStatus } from '../../src/generated/prisma/enums';

const animalsSeed = async () => {
  console.log('Seedowanie zwierząt...');

  // Usuń istniejące zwierzęta
  await prisma.animal.deleteMany();

  // Polskie cechy pasujące do formularza
  const traitsList = [
    'energiczny',
    'spokojny',
    'przyjazny',
    'nieśmiały',
    'pieszczoch',
    'skory do zabawy',
    'łagodny',
  ];

  function getRandomTraits() {
    const shuffled = [...traitsList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 1).join(', ');
  }

  function getRandomAge() {
    return Math.floor(Math.random() * 15) + 1; // 1-15 lat
  }

  const animalNames = {
    pies: [
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
    kot: [
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
    królik: [
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
    inny: [
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
  };

  const animals: any[] = [];

  // Statusy zgodne z Twoim frontendem
  const statusOptions: AnimalStatus[] = [
    AnimalStatus.ADOPTOWANY,
    AnimalStatus.SZUKA_DOMU,
    AnimalStatus.W_TRAKCIE_ADOPCJI,
    AnimalStatus.ZNALEZIONY,
  ];

  const getImageUrl = (path: string) =>
    `${process.env.SUPABASE_STORAGE_URL}/storage/v1/object/public/animals/${path}`;

  // Helper do tworzenia obiektów zwierząt
  const createAnimalData = (name: string, type: string) => ({
    name,
    type,
    gender: Math.random() > 0.5 ? 'samiec' : 'samica',
    size: ['mały', 'średni', 'duży'][Math.floor(Math.random() * 3)],
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    traits: getRandomTraits(),
    age: getRandomAge(),
    description: `${name} szuka nowego, kochającego domu. Jest bardzo ${traitsList[Math.floor(Math.random() * traitsList.length)]}.`,
    imageUrl: [
      getImageUrl('kot1/img1.jpg'),
      getImageUrl('kot1/img2.jpg'),
      getImageUrl('kot1/img3.jpg'),
      getImageUrl('kot1/img4.jpg'),
    ],
  });

  // Dodawanie zwierząt do tablicy
  animalNames.pies.forEach((name) => {
    animals.push(createAnimalData(name, 'pies'));
  });

  animalNames.kot.forEach((name) => {
    animals.push(createAnimalData(name, 'kot'));
  });

  animalNames.królik.forEach((name) => {
    animals.push(createAnimalData(name, 'królik'));
  });

  animalNames.inny.forEach((name) => {
    animals.push(createAnimalData(name, 'inny'));
  });

  await prisma.animal.createMany({
    data: animals,
  });

  console.log(`Seedowanie zakończone. Dodano ${animals.length} zwierząt.`);
};

export default animalsSeed;
