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
            <a href="/worker/dashboard">Panel Pracownika</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/worker/animals">Zwierzęta</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/worker/adoptions">Wnioski adopcyjne</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/worker/clients">Klienci</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/worker/raports">
              Raporty <ChartNoAxesColumnIncreasing />
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/worker/messages">Wiadomości</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopMenu;
