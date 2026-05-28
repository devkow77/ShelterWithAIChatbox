import { Container } from "@/components/ui";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  slug: string;
  title: string;
  content: any;
  image: any;
  createdAt: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_STRIPE_CMS_ADMIN_URL}/api/posts?populate=*`,
        );
        setPosts(res.data.data);
      } catch (err) {
        console.error("Błąd pobierania postów:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <main>
        <Container className="space-y-12 md:space-y-16">
          <section id="categories" className="space-y-6 lg:space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-15 max-w-100" />
              <Skeleton className="h-10 w-60 md:w-170" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
              <div className="space-y-4 sm:col-span-2">
                <Skeleton className="relative aspect-video" />
                <div className="space-y-2">
                  <Skeleton className="h-10 w-60 md:w-80" />
                  <Skeleton className="h-7.5 w-40 md:w-60" />
                  <Skeleton className="h-10 w-70 md:w-140" />
                </div>
              </div>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="relative aspect-video" />
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-60" />
                    <Skeleton className="h-7.5 w-40" />
                    <Skeleton className="h-10 w-70 md:w-full" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main>
        <Container>
          <p>Brak postów.</p>
        </Container>
      </main>
    );
  }

  const getPlainText = (content: any[]) => {
    return content
      ?.map((block) =>
        block.children?.map((child: any) => child.text).join(" "),
      )
      .join(" ");
  };

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            <a
              href={`/blog/${featuredPost.slug}`}
              className="space-y-2 sm:col-span-2 lg:space-y-4"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl border-4 border-green-900 bg-black/10">
                <img
                  src={`http://localhost:1337${featuredPost.image[0].url}`}
                  alt={featuredPost.title}
                  className="absolute size-full object-cover duration-200 hover:scale-120"
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="font-semibold sm:text-lg lg:text-2xl">
                  {featuredPost.title}
                </h3>
                <p className="line-clamp-4 text-xs leading-5 font-medium sm:text-sm lg:leading-6">
                  Opublikowano{" "}
                  {new Date(featuredPost.createdAt).toLocaleDateString("pl-PL")}{" "}
                  r.
                </p>
                <p className="line-clamp-3 text-xs leading-6 sm:text-sm">
                  {getPlainText(featuredPost.content || [])}
                </p>
              </div>
            </a>
            {otherPosts.map((post, index) => (
              <a href={`/blog/${post.slug}`} key={index} className="space-y-2">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-black/10">
                  <img
                    src={`http://localhost:1337${post.image[0].url}`}
                    alt={post.title}
                    className="absolute size-full object-cover duration-200 hover:scale-110"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold lg:text-lg">{post.title}</h3>
                  <p className="text-xs leading-5 font-medium lg:text-sm lg:leading-6">
                    Opublikowano{" "}
                    {new Date(post.createdAt).toLocaleDateString("pl-PL")} r.
                  </p>
                  <p className="line-clamp-2 text-xs leading-5 lg:text-sm lg:leading-6">
                    {getPlainText(post.content || [])}
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
