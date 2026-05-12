import type { IconType } from "react-icons";
import {
  PawPrint,
  UsersRound,
  Pencil,
  File,
  ChartColumn,
  SendHorizontal,
} from "lucide-react";
import { useLocation } from "react-router";

interface AdminOptions {
  icon?: IconType;
  href: string;
  name: string;
}

const adminOptions: AdminOptions[] = [
  {
    icon: PawPrint,
    href: "/admin/zwierzeta",
    name: "Zarządzaj zwierzętami",
  },
  {
    icon: UsersRound,
    href: "/admin/pracownicy",
    name: "Zarządzaj pracownikami",
  },
  {
    icon: UsersRound,
    href: "/",
    name: "Zarządzaj użytkownikami",
  },
  {
    icon: Pencil,
    href: "/",
    name: "Zarządzaj blogiem",
  },
  {
    icon: File,
    href: "/",
    name: "Wnioski adopcyjne",
  },
  {
    icon: ChartColumn,
    href: "/",
    name: "Statystyki",
  },
  {
    icon: SendHorizontal,
    href: "/",
    name: "Newsletter",
  },
];

const DashboardNavbar = () => {
  const location = useLocation();

  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
      {adminOptions.map((option, index: number) => (
        <a href={option.href} key={index}>
          <div
            className={`${location.pathname == option.href ? "rounded-full bg-green-600 font-medium text-white" : "rounded-xl bg-gray-200 duration-300 hover:bg-white hover:shadow-lg"} relative grid aspect-square place-items-center overflow-hidden p-2 text-center`}
          >
            <div>
              {option.icon && (
                <option.icon
                  size={26}
                  className="mx-auto mb-2 scale-80 md:scale-100"
                />
              )}
              <p className="text-sm">{option.name}</p>
            </div>
          </div>
        </a>
      ))}
    </section>
  );
};

export default DashboardNavbar;
