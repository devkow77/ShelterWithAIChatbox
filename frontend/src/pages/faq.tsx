import { FullFaqList } from "@/components/shared";
import { Container } from "@/components/ui";

const FaqPage = () => {
  return (
    <main>
      <Container>
        <section className="space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
              Najczęstsze pytania
            </h1>
            <p className="text-sm leading-6 md:text-base md:leading-7">
              Masz pytania dotyczące adopcji, wolontariatu lub innych aspektów.
              <br /> Sprawdź nasze FAQ – być może znajdziesz tam odpowiedź,
              której szukasz!
            </p>
          </div>
          <FullFaqList />
        </section>
      </Container>
    </main>
  );
};

export default FaqPage;
