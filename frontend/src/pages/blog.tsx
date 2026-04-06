import { Container } from "@/components/ui";

const BlogPage = () => {
  return (
    <main>
      <Container className="space-y-12 md:space-y-16">
        <section id="categories" className="space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-900 md:text-5xl">
              Nasze życie schroniska
            </h1>
            <p className="text-sm leading-6 md:text-base md:leading-7">
              Poznaj codzienne życie naszego schroniska, historie podopiecznych
              i ciekawostki ze świata zwierząt.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <a href={"/"} className="mx-auto space-y-2 sm:col-span-2">
              <div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl bg-black/10"></div>
              <div className="space-y-1">
                <h3 className="font-semibold lg:text-2xl">Główny post</h3>
                <p className="line-clamp-4 text-xs leading-5 font-medium lg:text-sm lg:leading-6">
                  Opublikowano 13.02.2026 r.
                </p>
                <p className="line-clamp-4 text-xs leading-5 lg:text-sm lg:leading-6">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Repudiandae provident temporibus ipsam cumque, obcaecati
                  officiis!
                </p>
              </div>
            </a>
            {Array.from({ length: 12 }).map((_, index) => (
              <a href={"/"} key={index} className="space-y-2">
                <div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl bg-black/10"></div>
                <div className="space-y-1">
                  <h3 className="font-semibold lg:text-lg">
                    Pomoc wolontariuszy
                  </h3>
                  <p className="line-clamp-4 text-xs leading-5 font-medium lg:text-sm lg:leading-6">
                    Opublikowano 13.02.2026 r.
                  </p>
                  <p className="line-clamp-4 text-xs leading-5 lg:text-sm lg:leading-6">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Repudiandae provident temporibus ipsam cumque, obcaecati
                    officiis!
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
};

export default BlogPage;
