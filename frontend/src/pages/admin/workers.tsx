import { Container } from "@/components/ui";
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

const invoices = [
  {
    invoice: "001",
    name: "Piotr Wal",
    type: "Pracownik",
  },
  {
    invoice: "002",
    name: "Anna Warosz",
    type: "Pracownik",
  },
  {
    invoice: "003",
    name: "Tomasz Polak",
    type: "Pracownik",
  },
  {
    invoice: "004",
    name: "Wiktor Ziemba",
    type: "Pracownik",
  },
  {
    invoice: "005",
    name: "Artur Moles",
    type: "Pracownik",
  },
];

const AdminWorkersPage = () => {
  return (
    <main>
      <Container className="mb-6 space-y-12 md:mb-10 md:space-y-16">
        <section id="info" className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
              Zarządzaj pracownikami
            </h1>
            <p className="text-sm leading-6 font-medium md:text-base md:leading-7">
              W tym panelu możesz edytować dane pracowników schroniska.
            </p>
          </div>
          <DashboardNavbar />
        </section>
        <section id="table">
          <Table>
            <TableCaption>Lista pracowników schroniska</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">ID</TableHead>
                <TableHead>Imię i nazwisko</TableHead>
                <TableHead>Rola</TableHead>
                <TableHead className="text-right">Opcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.name}</TableCell>
                  <TableCell>{invoice.type}</TableCell>
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
                        <DropdownMenuItem>Edytuj dane</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Usuń pracownika
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Suma pracowników</TableCell>
                <TableCell className="text-right">5 </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>
      </Container>
    </main>
  );
};

export default AdminWorkersPage;
