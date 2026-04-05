import { Outlet } from "react-router";
import { Navbar } from "@/components/layout/shared";

export const NavbarOnlyLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
