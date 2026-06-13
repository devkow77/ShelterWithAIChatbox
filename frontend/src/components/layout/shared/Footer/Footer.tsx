import { Container } from "@/components/ui/index";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebookSquare, FaInstagram, FaTiktok } from "react-icons/fa";
import type { IconType } from "react-icons";
import GoogleMaps from "./GoogleMaps";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

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
    href: "/o-nas",
  },
  {
    name: "Zwierzęta",
    href: "/zwierzeta",
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
    href: "/kontakt",
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
    name: "Regulamin serwisu",
    href: "/regulamin",
  },
  {
    name: "Polityka prywatności",
    href: "/polityka-prywatnosci",
  },
  {
    name: "Wszelkie prawa zastrzeżone",
  },
];

const newsletterSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Niepoprawny adres email."),
  consent: z.boolean().refine((val) => val === true, {
    message: "Wymagana jest zgoda na otrzymywanie newslettera.",
  }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      consent: false,
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      const res = await axios.post("/api/newsletter/subscribe", data);
      toast.success(res.data.msg);
      reset();
    } catch (err: any) {
      toast.error(
        err.response?.data?.msg ?? "Wystąpił błąd podczas zapisywania.",
      );
    }
  };

  return (
    <footer className="mt-8 text-sm md:mt-16 md:text-base">
      <Container>
        <h2 className="mb-6 text-center text-2xl font-bold text-green-900 md:text-4xl lg:mb-8">
          Tu nas znajdziesz
        </h2>
        <GoogleMaps />
        <section className="my-12 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">
              Zapisz się do <span className="font-bold">newslettera</span> i
              bądź na bieżąco z naszymi działaniami!
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Otrzymasz informacje o zwierzętach szukających domu.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-xl flex-col gap-3 sm:w-auto"
          >
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              <Button
                type="submit"
                variant={"success"}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Zapisywanie..." : "Subskrybuj"}
              </Button>
            </div>
            <label className="flex items-start gap-2 text-xs">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-0.5"
              />
              <span>
                Wyrażam zgodę na otrzymywanie informacji o zwierzętach
                schroniska na podany adres email.{" "}
                <a href="/polityka-prywatnosci" className="underline">
                  Polityka prywatności
                </a>
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-red-600">{errors.consent.message}</p>
            )}
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
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
