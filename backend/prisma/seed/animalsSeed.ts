import prisma from '../../src/prisma';

const animalsSeed = async () => {
  console.log('Seed zwierząt...');

  // Usuń istniejące zwierzęta
  await prisma.animal.deleteMany();

  const traitsList = ['energetic', 'calm', 'friendly', 'shy', 'affectionate'];

  function getRandomTraits() {
    const shuffled = traitsList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * traitsList.length) + 1);
  }

  function getRandomAge() {
    return Math.floor(Math.random() * 15) + 1; // 1-15 lat
  }

  const animalNames = {
    dog: [
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
    cat: [
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
    rabbit: [
      'Królik',
      'Bunny',
      'Fluffy',
      'Puszek',
      'Hopper',
      'Snowball',
      'Cotton',
      'Thumper',
      'Cinnabon',
      'Binky',
    ],
    other: [
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

  // Tworzymy 10 psów
  animalNames.dog.forEach((name, idx) => {
    animals.push({
      slug: `dog-${idx + 1}`,
      name,
      type: 'dog',
      gender: Math.random() > 0.5 ? 'male' : 'female',
      size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)],
      traits: getRandomTraits(),
      age: getRandomAge(),
      img: `animals/dog${idx + 1}.png`,
      description: `Pies ${name} jest bardzo przyjazny i wesoły.`,
    });
  });

  // Tworzymy 10 kotów
  animalNames.cat.forEach((name, idx) => {
    animals.push({
      slug: `cat-${idx + 1}`,
      name,
      type: 'cat',
      gender: Math.random() > 0.5 ? 'male' : 'female',
      size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)],
      traits: getRandomTraits(),
      age: getRandomAge(),
      img: `animals/cat${idx + 1}.png`,
      description: `Kot ${name} jest bardzo przyjazny i uwielbia pieszczoty.`,
    });
  });

  // Tworzymy 10 królików
  animalNames.rabbit.forEach((name, idx) => {
    animals.push({
      slug: `rabbit-${idx + 1}`,
      name,
      type: 'rabbit',
      gender: Math.random() > 0.5 ? 'male' : 'female',
      size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)],
      traits: getRandomTraits(),
      age: getRandomAge(),
      img: `animals/rabbit${idx + 1}.png`,
      description: `Królik ${name} jest spokojny i lubi spędzać czas w ogrodzie.`,
    });
  });

  // Tworzymy 10 innych zwierząt
  animalNames.other.forEach((name, idx) => {
    animals.push({
      slug: `other-${idx + 1}`,
      name,
      type: 'other',
      gender: Math.random() > 0.5 ? 'male' : 'female',
      size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)],
      traits: getRandomTraits(),
      age: getRandomAge(),
      img: `animals/other${idx + 1}.png`,
      description: `${name} jest bardzo przyjazny i ciekawski.`,
    });
  });

  await prisma.animal.createMany({
    data: animals,
  });

  console.log('Seed zwierząt zakończony');
};

export default animalsSeed;
