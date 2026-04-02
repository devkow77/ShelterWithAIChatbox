import { Container } from "@/components/ui";
import { useEffect, useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxChip,
} from "@/components/ui/combobox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface Animal {
  slug: string;
  name: string;
  type: string;
  gender: string;
  size: string;
  traits: string[];
  age: number;
  img: string;
  description: string;
}

type AnimalType = {
  label: string;
  value: string;
};

type SelectorProps = {
  items: AnimalType[];
  placeholder: string;
  value: string[];
  onValueChange: (v: string[]) => void;
};

const GenericSelector = ({
  items,
  placeholder,
  value,
  onValueChange,
}: SelectorProps) => (
  <Combobox items={items} multiple value={value} onValueChange={onValueChange}>
    <ComboboxChips>
      <ComboboxValue>
        {value
          .map((val) => items.find((i) => i.value === val)?.label)
          .filter(Boolean)
          .map((label) => (
            <ComboboxChip key={label}>{label}</ComboboxChip>
          ))}
      </ComboboxValue>
      <ComboboxChipsInput placeholder={placeholder} />
    </ComboboxChips>
    <ComboboxContent>
      <ComboboxEmpty>Brak dostępnych opcji</ComboboxEmpty>
      <ComboboxList>
        {(item) => (
          <ComboboxItem key={item.value} value={item.value}>
            {item.label}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
);

const AgeSlider = ({
  value,
  onChange,
}: {
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) => (
  <div className="w-64">
    <label className="mb-2 block text-sm">
      Wiek (lata): {value[0]} - {value[1]}
    </label>
    <Slider value={value} min={0} max={20} step={1} onValueChange={onChange} />
  </div>
);

const AnimalsPage = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 25]);

  const animalTypes: AnimalType[] = [
    { label: "Pies", value: "dog" },
    { label: "Kot", value: "cat" },
    { label: "Króliki", value: "rabbit" },
  ];

  const animalGenders: AnimalType[] = [
    { label: "Samiec", value: "male" },
    { label: "Samica", value: "female" },
  ];

  const animalSizes: AnimalType[] = [
    { label: "Mały", value: "small" },
    { label: "Średni", value: "medium" },
    { label: "Duży", value: "large" },
  ];

  const animalTraits: AnimalType[] = [
    { label: "Energetyczny", value: "energetic" },
    { label: "Spokojny", value: "calm" },
    { label: "Przyjazny", value: "friendly" },
    { label: "Nieśmiały", value: "shy" },
    { label: "Czuły", value: "affectionate" },
  ];

  useEffect(() => {
    const handleGetAnimals = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/animals");
        setAnimals(res.data);
        setFilteredAnimals(res.data);
      } catch (err) {
        console.error("Błąd podczas pobierania zwierząt:", err);
      } finally {
        setLoading(false);
      }
    };

    handleGetAnimals();
  }, []);

  const applyFilters = () => {
    const filtered = animals.filter((animal) => {
      const matchesType =
        selectedAnimals.length === 0 || selectedAnimals.includes(animal.type);

      const matchesGender =
        selectedGender.length === 0 || selectedGender.includes(animal.gender);

      const matchesSize =
        selectedSize.length === 0 || selectedSize.includes(animal.size);

      const matchesTraits =
        selectedTraits.length === 0 ||
        selectedTraits.every((trait) => animal.traits.includes(trait));

      const matchesAge = animal.age >= ageRange[0] && animal.age <= ageRange[1];

      return (
        matchesType &&
        matchesGender &&
        matchesSize &&
        matchesTraits &&
        matchesAge
      );
    });

    setFilteredAnimals(filtered);
  };

  return (
    <main>
      <Container className="space-y-12 md:space-y-16">
        <section id="categories" className="space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
              Wszystkie zwierzęta
            </h1>
            <p className="text-sm leading-6 md:text-base md:leading-7">
              Aktualnie posiadamy {animals.length} zwierząt, które czekają na
              nowy dom!
            </p>
          </div>
          <div className="top-0 z-2 -mt-4 flex flex-wrap items-center gap-4 bg-white py-4 sm:sticky lg:-mt-8">
            <GenericSelector
              items={animalTypes}
              placeholder="Wybierz zwierzę"
              value={selectedAnimals}
              onValueChange={setSelectedAnimals}
            />
            <GenericSelector
              items={animalGenders}
              placeholder="Wybierz płeć"
              value={selectedGender}
              onValueChange={setSelectedGender}
            />
            <GenericSelector
              items={animalSizes}
              placeholder="Wybierz rozmiar"
              value={selectedSize}
              onValueChange={setSelectedSize}
            />
            <GenericSelector
              items={animalTraits}
              placeholder="Wybierz cechy"
              value={selectedTraits}
              onValueChange={setSelectedTraits}
            />
            <AgeSlider value={ageRange} onChange={setAgeRange} />
            <Button onClick={applyFilters} variant={"success"}>
              Zastosuj
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {loading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="aspect-video rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40 rounded-xl" />
                    <Skeleton className="h-20 w-100 rounded-xl" />
                  </div>
                </div>
              ))
            ) : filteredAnimals.length === 0 ? (
              <div className="sm:col-span-2 lg:col-span-3">
                <p className="text-center font-medium">
                  Nie znaleziono zwierząt spełniających wybrane kryteria.
                </p>
              </div>
            ) : (
              filteredAnimals.map((animal, index) => (
                <a
                  href={`/zwierzeta/${animal.type}/${animal.slug}`}
                  key={index}
                  className="space-y-2"
                >
                  <div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl bg-black/10"></div>
                  <div>
                    <h3 className="font-semibold lg:text-lg">
                      {animal.name} {animal.age} lat
                    </h3>
                    <p className="line-clamp-4 text-xs leading-5 lg:text-sm lg:leading-6">
                      {animal.description}
                    </p>
                  </div>
                </a>
              ))
            )}
          </div>
        </section>
      </Container>
    </main>
  );
};

export default AnimalsPage;
