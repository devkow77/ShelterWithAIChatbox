import { Container, Input } from "@/components/ui";
import { toast } from "sonner";
import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui";
import { MoreHorizontalIcon } from "lucide-react";
import DashboardNavbar from "@/components/layout/admin/DashboardNavbar";
import axios from "axios";
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
import { styleAnimalStatus } from "@/lib/utils";
import { Label } from "@/components/ui";

type AnimalType = {
  label: string;
  value: string;
};

type Animal = {
  id: number;
  name: string;
  type: string;
  gender: string;
  size: string;
  traits: string[];
  age: number;
  status: string;
  imageUrl: string[];
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

const AdminAnimalsPage = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedStatutes, setSelectedStatutes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 25]);

  const animalTypes: AnimalType[] = [
    { label: "Pies", value: "pies" },
    { label: "Kot", value: "kot" },
    { label: "Króliki", value: "królik" },
  ];

  const animalGenders: AnimalType[] = [
    { label: "Samiec", value: "samiec" },
    { label: "Samica", value: "samica" },
  ];

  const animalStatuses: AnimalType[] = [
    { label: "Szuka domu", value: "SZUKA_DOMU" },
    { label: "Adoptowany", value: "ADOPTOWANY" },
    { label: "Znaleziony", value: "ZNALEZIONY" },
    { label: "W trakcie adopcji", value: "W_TRAKCIE_ADOPCJI" },
  ];

  const animalSizes: AnimalType[] = [
    { label: "Mały", value: "mały" },
    { label: "Średni", value: "średni" },
    { label: "Duży", value: "duży" },
  ];

  const animalTraits: AnimalType[] = [
    { label: "Energetyczny", value: "energiczny" },
    { label: "Spokojny", value: "spokojny" },
    { label: "Przyjazny", value: "przyjazny" },
    { label: "Nieśmiały", value: "nieśmiały" },
    { label: "Pieszczoch", value: "pieszczoch" },
    { label: "Skory do zabawy", value: "skory do zabawy" },
    { label: "Łagodny", value: "łagodny" },
  ];

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await axios.get("/api/animals");
        setAnimals(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnimals();
  }, []);

  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        animal.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedAnimals.length === 0 || selectedAnimals.includes(animal.type);

      const matchesGender =
        selectedGender.length === 0 || selectedGender.includes(animal.gender);

      const matchesStatus =
        selectedStatutes.length === 0 ||
        selectedStatutes.includes(animal.status);

      const matchesSize =
        selectedSize.length === 0 || selectedSize.includes(animal.size);

      const matchesTraits =
        selectedTraits.length === 0 ||
        selectedTraits.every((t) => animal.traits.includes(t));

      const matchesAge = animal.age >= ageRange[0] && animal.age <= ageRange[1];

      return (
        matchesSearch &&
        matchesType &&
        matchesGender &&
        matchesStatus &&
        matchesSize &&
        matchesTraits &&
        matchesAge
      );
    });
  }, [
    animals,
    searchQuery,
    selectedAnimals,
    selectedGender,
    selectedStatutes,
    selectedSize,
    selectedTraits,
    ageRange,
  ]);

  const resetFilters = () => {
    setSelectedAnimals([]);
    setSelectedGender([]);
    setSelectedStatutes([]);
    setSelectedSize([]);
    setSelectedTraits([]);
    setAgeRange([0, 25]);
    setSearchQuery("");
  };

  const handleDeleteAnimal = async (id: number) => {
    try {
      await axios.delete(`/api/animals/${id}`);
      setAnimals((prev) => prev.filter((a) => a.id !== id));
      toast.success("Pomyślnie usunięto zwierzę!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <Container className="mb-6 space-y-12 md:mb-10 md:space-y-16">
        <section id="info" className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
              Zarządzaj zwierzętami
            </h1>
            <p className="text-sm leading-6 font-medium md:text-base md:leading-7">
              W tym panelu możesz edytować dane zwierząt w schronisku.
            </p>
          </div>
          <DashboardNavbar />
        </section>

        <section id="table">
          <div className="top-0 z-2 flex flex-wrap items-center gap-4 bg-white py-4 sm:sticky">
            <div className="flex flex-row gap-x-2">
              <Label>Wyszukaj</Label>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj po imieniu..."
                className="h-7.5 placeholder:text-sm"
              />
            </div>

            <GenericSelector
              items={animalTypes}
              placeholder="Gatunek"
              value={selectedAnimals}
              onValueChange={setSelectedAnimals}
            />

            <GenericSelector
              items={animalGenders}
              placeholder="Płeć"
              value={selectedGender}
              onValueChange={setSelectedGender}
            />

            <GenericSelector
              items={animalStatuses}
              placeholder="Status"
              value={selectedStatutes}
              onValueChange={setSelectedStatutes}
            />

            <GenericSelector
              items={animalSizes}
              placeholder="Rozmiar"
              value={selectedSize}
              onValueChange={setSelectedSize}
            />

            <GenericSelector
              items={animalTraits}
              placeholder="Cechy"
              value={selectedTraits}
              onValueChange={setSelectedTraits}
            />

            <AgeSlider value={ageRange} onChange={setAgeRange} />

            <Button onClick={resetFilters} variant="destructive">
              Resetuj filtry
            </Button>

            <Button variant="success">Dodaj zwierzę</Button>
          </div>

          <Table>
            <TableCaption>Lista zwierząt w schronisku</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Imię</TableHead>
                <TableHead>Gatunek</TableHead>
                <TableHead>Płeć</TableHead>
                <TableHead>Status adopcji</TableHead>
                <TableHead>Wiek (lat)</TableHead>
                <TableHead>Ilość zdjęć</TableHead>
                <TableHead className="text-right">Opcje</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredAnimals.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell className="flex items-center gap-x-4 font-medium">
                    {animal.imageUrl.length ? (
                      <img
                        src={animal.imageUrl[0]}
                        className="size-12 rounded-full object-cover"
                        alt={animal.name}
                      />
                    ) : (
                      <div className="size-12 rounded-full bg-gray-200" />
                    )}
                    {animal.name}
                  </TableCell>
                  <TableCell>{animal.type}</TableCell>
                  <TableCell>{animal.gender}</TableCell>
                  <TableCell>
                    <span
                      className={`${styleAnimalStatus(
                        animal.status,
                      )} rounded-2xl p-2 text-xs`}
                    >
                      {animal.status}
                    </span>
                  </TableCell>
                  <TableCell>{animal.age}</TableCell>
                  <TableCell>{animal.imageUrl.length} z 5</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="transparent" size="icon">
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <a href={`/admin/zwierzeta/${animal.id}/edycja`}>
                            Edytuj dane
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteAnimal(animal.id)}
                          className="cursor-pointer text-red-600"
                        >
                          Usuń zwierzę
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>Suma zwierząt</TableCell>
                <TableCell className="text-right">
                  {filteredAnimals.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>
      </Container>
    </main>
  );
};

export default AdminAnimalsPage;
