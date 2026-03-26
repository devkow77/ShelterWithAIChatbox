import { Container } from "@/components/ui/index";
import {
  DesktopMenu as ClientDesktopMenu,
  Profile as ClientProfile,
  Hamburger as ClientHamburger,
} from "@/components/layout/client/Navbar";
import {
  DesktopMenu as AdminDesktopMenu,
  Profile as AdminProfile,
  Hamburger as AdminHamburger,
} from "@/components/layout/admin/Navbar";

export default function Navbar() {
  const isAdmin: boolean = false;

  const DesktopMenu = isAdmin ? AdminDesktopMenu : ClientDesktopMenu;
  const Profile = isAdmin ? AdminProfile : ClientProfile;
  const Hamburger = isAdmin ? AdminHamburger : ClientHamburger;

  return (
    <nav className="mb-6 py-6 md:mb-10">
      <Container className="flex items-center justify-between">
        <p className="font-semibold">Schronisko</p>
        <DesktopMenu />
        <div className="flex items-center sm:gap-2">
          <Profile />
          <Hamburger />
        </div>
      </Container>
    </nav>
  );
}
