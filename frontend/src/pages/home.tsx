import { Button, Container } from "@/components/ui";
import { ShortFaqList } from "@/components/shared";
import { Heart } from "lucide-react";

interface Animal {
  name: string;
  image: string;
  href: string;
}

const animals: Animal[] = [
  {
    name: "Psy",
    image: "./dog.webp",
    href: "/zwierzeta/psy",
  },
  {
    name: "Koty",
    image: "./cat.webp",
    href: "/zwierzeta/koty",
  },
  {
    name: "Króliki",
    image: "./rabbit.webp",
    href: "/zwierzeta/króliki",
  },
];

interface AdoptionReason {
  icon: string;
  bgColor: string;
  title: string;
  description: string;
}

const adoptionsReasons: AdoptionReason[] = [
  {
    icon: "🐾",
    title: "Ratujesz życie",
    bgColor: "bg-slate-100",
    description:
      "Każda adopcja to szansa dla zwierzaka na opuszczenie schroniska i znalezienie kochającego domu.",
  },
  {
    icon: "❤️",
    bgColor: "bg-red-100",
    title: "Zyskujesz przyjaciela",
    description:
      "Zwierzęta ze schroniska są często bardzo oddane i wdzięczne za opiekę.",
  },
  {
    icon: "💰",
    bgColor: "bg-yellow-100",
    title: "Oszczędzasz pieniądze",
    description:
      "Wiele zwierząt jest już zaszczepionych, odrobaczonych i wykastrowanych.",
  },
  {
    icon: "🏡",
    bgColor: "bg-green-100",
    title: "Pomagasz zwierzętom",
    description:
      "Adoptując pupila, robisz miejsce dla kolejnego potrzebującego.",
  },
];

type FaqFeature = {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
};

const faqFeatures: FaqFeature[] = [
  {
    icon: "📢",
    title: "Uświadamiaj innych",
    bgColor: "bg-blue-100",
    description:
      "Zachęcaj innych do adopcji – wiele osób nawet nie wie, że może znaleźć swojego pupila w schronisku.",
  },
  {
    icon: "🎁",
    title: "Organizuj zbiórki",
    bgColor: "bg-yellow-100",
    description:
      "Możesz zorganizować zbiórkę karmy lub akcesoriów. Daj nam znać – pomożemy ją nagłośnić.",
  },
  {
    icon: "🐕",
    title: "Pomagaj na miejscu",
    bgColor: "bg-green-100",
    description:
      "Wyprowadzanie psów, pielęgnacja i socjalizacja to ogromna pomoc dla zwierząt w schronisku.",
  },
  {
    icon: "❤️",
    title: "Wesprzyj darowizną",
    bgColor: "bg-red-100",
    description:
      "Każda wpłata pomaga zapewnić zwierzętom jedzenie, leczenie i lepsze warunki życia.",
  },
];

const HomePage = () => {
  return (
    <main>
      <Container className="space-y-12 md:space-y-16">
        <section id="categories" className="space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
              Schronisko
            </h1>
            <p className="text-sm leading-6 md:text-base md:leading-7">
              Aktualnie posiadamy 300 zwierząt, które czekają na nowy dom!{" "}
              <br /> Nie bądź obojętny i stań się rodzicem jednego z naszych
              czworonogich przyjacieli.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {animals.map((animal: Animal, index: number) => (
              <a href={animal.href} key={index}>
                <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl">
                  <img
                    src={animal.image}
                    alt=""
                    role="presentation"
                    className="absolute size-full object-cover"
                  />
                  <div className="absolute size-full bg-black/50 object-cover" />
                  <h2 className="z-2 text-xl font-semibold text-white lg:text-3xl">
                    {animal.name}
                  </h2>
                </div>
              </a>
            ))}
            <a href="/zwierzeta">
              <div className="grid aspect-square place-items-center rounded-full bg-green-900">
                <h2 className="z-2 text-xl font-semibold text-white lg:text-3xl">
                  Wszystkie
                </h2>
              </div>
            </a>
          </div>
        </section>
        <section id="adoptionsReasons" className="space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-green-900 md:text-4xl">
              Dlaczego warto adoptować?
            </h1>
            <p className="text-sm leading-6 md:text-base md:leading-7">
              Adoptując zwierzę ze schroniska, nie tylko zyskujesz wiernego
              przyjaciela, ale także dajesz drugą szansę na lepsze życie.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
            {adoptionsReasons.map((reason, index) => (
              <div className="space-y-2" key={index}>
                <div
                  key={index}
                  className={`${reason.bgColor} grid aspect-square place-items-center rounded-full text-3xl`}
                >
                  {reason.icon}
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-semibold md:text-lg">{reason.title}</h3>
                  <p className="text-xs md:text-sm">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="longestWaiting" className="space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-green-900 md:text-4xl">
              Najdłużej czekające
            </h1>
            <p className="text-sm leading-6 md:text-base md:leading-7">
              Poznaj naszych podopiecznych, którzy czekają na nowy dom już od
              dłuższego czasu. Każdy z nich zasługuje na miłość i opiekę, a Ty
              możesz być tym, który odmieni ich życie.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
            {Array.from({ length: 8 }).map((_, index: number) => (
              <a href="/" key={index} className="space-y-2">
                <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-black/20">
                  <span className="absolute top-3 right-3 rounded-full bg-white p-1 sm:p-2">
                    <Heart className="scale-80 text-red-600 sm:scale-100" />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold lg:text-lg">Felix</h3>
                  <p className="text-xs lg:text-sm">Z nami od 03.04.2023 r.</p>
                </div>
              </a>
            ))}
          </div>
          <Button variant={"success"}>
            <a href="/zwierzeta">Zobacz wszystkie</a>
          </Button>
        </section>
        <section id="faq" className="space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-green-900 md:text-4xl">
              Często zadawane pytania
            </h1>
          </div>
          <div className="space-y-4 md:flex md:gap-6">
            <ShortFaqList />
            <div className="flex-1 space-y-4 md:pl-6">
              {faqFeatures.map((reason, index) => (
                <div className="flex items-center gap-x-4" key={index}>
                  <div
                    key={index}
                    className={`${reason.bgColor} grid h-30 min-w-30 place-items-center rounded-full text-3xl`}
                  >
                    {reason.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold lg:text-lg">{reason.title}</h3>
                    <p className="text-xs lg:text-sm">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button variant={"success"}>
            <a href="/kontakt">Skontaktuj się z nami</a>
          </Button>
        </section>
        <section id="blog" className="space-y-6 lg:space-y-8">
          <h2 className="text-2xl font-bold text-green-900 md:text-4xl">
            Nasze ostatnie akcje
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {Array.from({ length: 3 }).map((_, index: number) => (
              <a href="/" key={index} className="space-y-2">
                <div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl bg-black/20"></div>
                <h3 className="font-semibold lg:text-lg">
                  Akcja "Mikołaj" w naszej okolicy
                </h3>
                <p className="line-clamp-4 text-xs leading-5 lg:text-sm lg:leading-6">
                  W dniu 15.12.2023 r. w naszym schronisku odbyła się coroczna
                  akcja "Mikołaj", podczas której rozdaliśmy ponad 200 paczek z
                  prezentami dla naszych podopiecznych. Dziękujemy wszystkim
                  darczyńcom za wsparcie i pomoc w organizacji tego wydarzenia!
                </p>
              </a>
            ))}
          </div>
          <Button variant={"success"}>
            <a href="/blog">Zobacz nasze akcje</a>
          </Button>
        </section>
      </Container>
    </main>
  );
};

export default HomePage;
