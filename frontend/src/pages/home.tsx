import { Container } from "@/components/ui";

function Home() {
  return (
    <main>
      <Container>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold md:text-5xl">Schronisko</h1>
          <p className="text-sm leading-6 md:text-base md:leading-7">
            Aktualnie posiadamy 300 zwierząt, które czekają na nowy dom! <br />{" "}
            Nie bądź obojętny i stań się rodzicem jednego z naszych czworonogich
            przyjacieli.
          </p>
        </div>
      </Container>
    </main>
  );
}

export default Home;
