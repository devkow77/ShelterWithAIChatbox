import { Container, Input, Label } from "@/components/ui";
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
import DashboardNavbar from "@/components/layout/admin/DashboardNavbar";
import { Button } from "@/components/ui";
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
import { MoreHorizontalIcon } from "lucide-react";
import axios from "axios";
import { styleUserRole } from "@/lib/utils";

type WorkerType = {
  label: string;
  value: string;
};

type Worker = {
  id: number;
  fullName: string;
  gender: string;
  email: string;
  role: string;
  twoFactorEnabled: boolean;
  imageUrl?: string;
  createdAt: string;
};

type SelectorProps = {
  items: WorkerType[];
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

const AdminWorkersPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>(""); // stan do przechowywania wartości wyszukiwania
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]); // stan do przechowywania wybranych typów pracowników
  const [selectedGender, setSelectedGender] = useState<string[]>([]); // stan do przechowywania wybranych płci

  const workerRoles: WorkerType[] = [
    { label: "Administrator", value: "ADMINISTRATOR" },
    { label: "Pracownik", value: "PRACOWNIK" },
  ];

  const workerGenders: WorkerType[] = [
    { label: "Mężczyzna", value: "MEZCZYZNA" },
    { label: "Kobieta", value: "KOBIETA" },
  ];

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await axios.get("/api/users/workers");
        setWorkers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkers();
  }, []);

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        worker.fullName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRoles =
        selectedRoles.length === 0 || selectedRoles.includes(worker.role);

      const matchesGender =
        selectedGender.length === 0 || selectedGender.includes(worker.gender);

      return matchesSearch && matchesRoles && matchesGender;
    });
  }, [workers, searchQuery, selectedRoles, selectedGender]);

  // Funkcja do resetowania wszystkich filtrów
  const resetFilters = () => {
    setSelectedRoles([]);
    setSelectedGender([]);
    setSearchQuery("");
  };

  return (
    <main>
      <Container className="mb-6 space-y-12 md:mb-10 md:space-y-16">
        <section id="info" className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
              Zarządzaj pracownikami
            </h1>
            <p className="text-sm leading-6 font-medium md:text-base md:leading-7">
              W tym panelu znajdują się wszyscy pracownicy schroniska.
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
              items={workerRoles}
              placeholder="Rola pracownika"
              value={selectedRoles}
              onValueChange={setSelectedRoles}
            />

            <GenericSelector
              items={workerGenders}
              placeholder="Płeć"
              value={selectedGender}
              onValueChange={setSelectedGender}
            />

            <Button onClick={resetFilters} variant="destructive">
              Resetuj filtry
            </Button>

            <Button variant="success">
              <a href="/admin/pracownicy/dodaj">Dodaj pracownika</a>
            </Button>
          </div>

          <Table>
            <TableCaption>Lista pracowników schroniska</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Imię i nazwisko</TableHead>
                <TableHead>Rola</TableHead>
                <TableHead>Płeć</TableHead>
                <TableHead>Pracuje od</TableHead>
                <TableHead className="text-right">Opcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell className="flex items-center gap-x-4 font-medium">
                    {worker.imageUrl ? (
                      <img
                        src={worker.imageUrl}
                        className="size-12 rounded-full object-cover"
                        alt={worker.fullName}
                      />
                    ) : (
                      <div className="size-12 rounded-full bg-gray-200" />
                    )}
                    {worker.fullName}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`${styleUserRole(
                        worker.role,
                      )} rounded-2xl p-2 text-xs`}
                    >
                      {worker.role}
                    </span>
                  </TableCell>
                  <TableCell>{worker.gender}</TableCell>
                  <TableCell>
                    {new Date(worker.createdAt).toLocaleDateString("pl-PL")} r.
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="transparent"
                          size="icon"
                          className="size-8"
                        >
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <a href={`/admin/pracownicy/${worker.id}/edycja`}>
                            Edytuj dane
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Usuń osobę
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Suma pracowników</TableCell>
                <TableCell className="text-right">{workers.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>
      </Container>
    </main>
  );
};

export default AdminWorkersPage;
