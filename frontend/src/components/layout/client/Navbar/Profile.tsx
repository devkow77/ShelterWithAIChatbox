"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  name: string;
  email: string;
  avatar: string;
}
const Profile = () => {
  const session: boolean = false;

  const user: User = {
    name: "Gość",
    email: "zaloguj się, aby mieć możliwość adopcji.",
    avatar: session ? "/logged-avatar.png" : "/not-logged-avatar.png",
  };

  const trigger = (
    <DropdownMenuTrigger asChild>
      <div className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition">
        <div className="hidden flex-col text-right text-sm text-black md:flex dark:text-white">
          <span className="leading-none font-medium">{user.name}</span>
          <span className="text-xs text-black/70 dark:text-white/70">
            {user.email}
          </span>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
      </div>
    </DropdownMenuTrigger>
  );

  return (
    <DropdownMenu>
      {trigger}
      {session ? (
        <DropdownMenuContent
          align="end"
          className="bg-popover w-60 rounded-xl border border-white/10 p-2 shadow-lg backdrop-blur-md"
        >
          <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <a href="/profile">Profil</a>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Ustawienia
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer font-semibold text-red-600"
            onClick={() => {}}
          >
            Wyloguj się
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent
          align="end"
          className="bg-popover w-60 rounded-xl border border-white/10 p-2 shadow-lg backdrop-blur-md"
        >
          <DropdownMenuItem
            className="cursor-pointer font-medium"
            onClick={() => {}}
          >
            <a href="/login">Zaloguj się</a>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer font-medium"
            onClick={() => {}}
          >
            Zaloguj się przez Google
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs opacity-80">
            Nie masz konta?
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer font-medium">
            <a href="/register">Zarejestruj nowe konto</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default Profile;
