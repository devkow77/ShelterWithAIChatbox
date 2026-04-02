import { Container } from "@/components/ui/index";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebookSquare, FaInstagram, FaTiktok } from "react-icons/fa";
import type { IconType } from "react-icons";
import GoogleMaps from "./GoogleMaps";

interface Link {
  name: string;
  href?: string;
  icon?: IconType;
}

const links: Link[] = [
  {
    name: "Strona główna",
    href: "/",
  },
  {
    name: "O nas",
    href: "/about",
  },
  {
    name: "Zwierzęta",
    href: "/animals",
  },
  {
    name: "Jak pomóc?",
    href: "/jak-pomoc",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Faq",
    href: "/faq",
  },
  {
    name: "Kontakt",
    href: "/contact",
  },
];

const socials: Link[] = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookSquare,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    name: "Tiktok",
    href: "https://tiktok.com",
    icon: FaTiktok,
  },
];

const informations: Link[] = [
  {
    name: "Regulami serwisu",
    href: "/",
  },
  {
    name: "Polityka prywatności",
    href: "/",
  },
  {
    name: "Wszelkie prawa zastrzeżone",
  },
];

const Footer = () => {
  return (
    <footer className="mt-8 text-sm md:mt-16 md:text-base">
      <Container>
        <h2 className="mb-6 text-center text-2xl font-bold text-green-900 md:text-4xl lg:mb-8">
          Tu nas znajdziesz
        </h2>
        <GoogleMaps />
        <section className="my-12 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-medium">
            Zapisz się do <span className="font-bold">newslettera</span> i bądź
            na bieżąco z naszymi działaniami!
          </h3>
          <form className="flex gap-4">
            <Input type="email" placeholder="Email" />
            <Button type="submit" variant={"success"}>
              Subskrybuj
            </Button>
          </form>
        </section>
        <section className="border-t border-neutral-300 py-12 dark:border-neutral-700">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <section className="space-y-6">
              <h2 className="font-semibold">Schronisko</h2>
              <p className="leading-6 md:leading-8 dark:opacity-80">
                Nasza misja to zapewnienie bezpiecznego i kochającego domu dla
                bezdomnych zwierząt. Działamy na rzecz ich dobrostanu poprzez
                adopcje, opiekę weterynaryjną i edukację społeczeństwa na temat
                odpowiedzialnej opieki nad zwierzętami.
              </p>
            </section>
            <section className="space-y-6 lg:mx-auto">
              <h2 className="font-semibold">Linki</h2>
              <ul className="space-y-4">
                {links.map((link: Link, index: number) => (
                  <li key={index}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </section>
            <section className="items-end space-y-6 lg:flex lg:flex-col">
              <h2 className="font-semibold">Social Media</h2>
              <ul className="space-y-4">
                {socials.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.href}
                      className="flex items-center gap-x-2"
                      target="_blank"
                    >
                      {social.icon && <social.icon className="text-2xl" />}
                      <p>{social.name}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <section className="space-y-6">
              <h2 className="font-semibold">O fundacji</h2>
              <ul className="space-y-4">
                <li>Fundacja Schronisko</li>
                <li>
                  al. Tadeusz Rejtana 53 <br /> 35-326 Rzeszów
                </li>
                <li>
                  KRS: 0000000000 <br /> NIP: 1111111111
                </li>
                <li>schronisko@gmail.com</li>
              </ul>
            </section>
            <section className="flex flex-col justify-end gap-y-6 sm:col-span-2 lg:items-end">
              <h2 className="font-semibold">Informacje</h2>
              <ul className="flex flex-wrap items-center gap-4">
                {informations.map((info: Link, index: number) => (
                  <li key={index}>
                    <a href={info.href}>{info.name}</a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </Container>
    </footer>
  );
};

export default Footer;
