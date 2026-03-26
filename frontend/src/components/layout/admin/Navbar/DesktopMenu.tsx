"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

const DesktopMenu = () => {
  return (
    <NavigationMenu viewport={false} className="z-10 hidden xl:block">
      <NavigationMenuList className="space-x-2">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/" className="font-semibold">
              Strona główna
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/admin/dashboard">Panel Admina</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/admin/raports">
              Raporty <ChartNoAxesColumnIncreasing />
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/admin/email">Wiadomości</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopMenu;
