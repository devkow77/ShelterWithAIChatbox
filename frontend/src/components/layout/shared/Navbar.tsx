import { Container } from "@/components/ui/index";
import {
  DesktopMenu as ClientDesktopMenu,
  Profile as ClientProfile,
  Hamburger as ClientHamburger,
} from "@/components/layout/client/Navbar";
import {
  DesktopMenu as WorkerDesktopMenu,
  Profile as WorkerProfile,
  Hamburger as WorkerHamburger,
} from "@/components/layout/worker/Navbar";
import {
  DesktopMenu as AdminDesktopMenu,
  Profile as AdminProfile,
  Hamburger as AdminHamburger,
} from "@/components/layout/admin/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const role = user?.role || "CLIENT";

  const DesktopMenu =
    role === "ADMIN"
      ? AdminDesktopMenu
      : role === "WORKER"
        ? WorkerDesktopMenu
        : ClientDesktopMenu;
  const Profile =
    role === "ADMIN"
      ? AdminProfile
      : role === "WORKER"
        ? WorkerProfile
        : ClientProfile;
  const Hamburger =
    role === "ADMIN"
      ? AdminHamburger
      : role === "WORKER"
        ? WorkerHamburger
        : ClientHamburger;

  return (
    <nav className="mb-6 py-6 md:mb-10">
      <Container className="flex items-center justify-between">
        <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
        <DesktopMenu />
        <div className="flex items-center sm:gap-2">
          <Profile />
          <Hamburger />
        </div>
      </Container>
    </nav>
  );
}
