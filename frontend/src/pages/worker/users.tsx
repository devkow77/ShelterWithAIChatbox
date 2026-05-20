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
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { DeleteUserDialog } from "@/components/ui";

type UserType = {
  label: string;
  value: string;
};

type User = {
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
  items: UserType[];
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

const WorkerUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>(""); // stan do przechowywania wartości wyszukiwania
  const [selectedGender, setSelectedGender] = useState<string[]>([]); // stan do przechowywania wybranych płci

  const { user: loggedUser } = useAuth();

  const userGenders: UserType[] = [
    { label: "Mężczyzna", value: "MEZCZYZNA" },
    { label: "Kobieta", value: "KOBIETA" },
  ];

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGender =
        selectedGender.length === 0 || selectedGender.includes(user.gender);

      return matchesSearch && matchesGender;
    });
  }, [users, searchQuery, selectedGender]);

  // Funkcja do resetowania wszystkich filtrów
  const resetFilters = () => {
    setSelectedGender([]);
    setSearchQuery("");
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((a) => a.id !== id));
      toast.success("Pomyślnie usunięto użytkownika!");
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
              {loggedUser?.role === "ADMINISTRATOR"
                ? "Zarządzaj użytkownikami"
                : "Przeglądaj użytkowników"}
            </h1>
            <p className="text-sm leading-6 font-medium md:text-base md:leading-7">
              W tym panelu znajdują się wszyscy użytkownicy schroniska.
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
              items={userGenders}
              placeholder="Płeć"
              value={selectedGender}
              onValueChange={setSelectedGender}
            />

            <Button onClick={resetFilters} variant="destructive">
              Resetuj filtry
            </Button>

            {loggedUser?.role === "ADMINISTRATOR" ? (
              <Button variant="success">
                <a href="/admin/uzytkownicy/dodaj">Dodaj użytkownika</a>
              </Button>
            ) : null}
          </div>

          <Table>
            <TableCaption>Lista użytkowników schroniska</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Imię i nazwisko</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Płeć</TableHead>
                <TableHead>Zarejestrowany od</TableHead>
                <TableHead className="text-right">Opcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-x-4 font-medium">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        className="size-12 rounded-full object-cover"
                        alt={user.fullName}
                      />
                    ) : (
                      <div className="size-12 rounded-full bg-gray-200" />
                    )}
                    {user.fullName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("pl-PL")} r.
                  </TableCell>
                  {loggedUser?.role === "ADMINISTRATOR" ? (
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
                            <a href={`/admin/uzytkownicy/${user.id}/edycja`}>
                              Edytuj dane
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DeleteUserDialog
                            userId={user.id}
                            onConfirm={handleDeleteUser}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Suma użytkowników</TableCell>
                <TableCell className="text-right">{users.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>
      </Container>
    </main>
  );
};

export default WorkerUsersPage;
