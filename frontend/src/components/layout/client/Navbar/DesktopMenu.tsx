"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface Animal {
  title: string;
  href: string;
  description: string;
}

const animals: Animal[] = [
  {
    title: "Psy",
    href: "/zwierzeta/psy",
    description:
      "Tutaj znajdziesz wiernych i lojalnych towarzyszy, gotowych na wspólne przygody.",
  },
  {
    title: "Koty",
    href: "/zwierzeta/koty",
    description:
      "Odkryj niezależne i pełne wdzięku stworzenia, które wniosą radość do Twojego życia.",
  },
  {
    title: "Króliki",
    href: "/zwierzeta/kroliki",
    description:
      "Poznaj urocze i delikatne króliki, które są idealnymi towarzyszami dla całej rodziny.",
  },
  {
    title: "Wszystkie",
    href: "/zwierzeta",
    description:
      "Znajdź różnorodne zwierzęta, które czekają na kochający dom i nowe przygody.",
  },
];

const DesktopMenu = () => {
  return (
    <NavigationMenu viewport={false} className="z-10 hidden xl:block">
      <NavigationMenuList className="space-x-2">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/" className="font-semibold text-green-900">
              Strona główna
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Zwierzęta</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-75 gap-4">
              {animals.length
                ? animals.map(({ title, href, description }, index) => (
                    <NavigationMenuLink asChild key={index}>
                      <a
                        href={href}
                        className="flex flex-col items-start bg-transparent"
                      >
                        <div>{title}</div>
                        <div className="text-muted-foreground">
                          {description}
                        </div>
                      </a>
                    </NavigationMenuLink>
                  ))
                : null}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/znalezione-zwierzeta">Znalezione</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/jak-pomoc">Jak pomóc?</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/blog">Blog</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/faq">Faq</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/kontakt">Kontakt</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopMenu;
