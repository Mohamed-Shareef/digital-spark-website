import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { getBlogPosts, getBlogImageUrl, type BlogPost } from "@/lib/blogApi";

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    let active = true;

    getBlogPosts()
      .then((res) => {
        if (!active) return;
        setPosts(res.data);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="blog" className="relative py-28 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gradient-brand">
              Blog
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
              Insights, ideas, and updates.
            </h1>
          </Reveal>
        </div>

        {status === "loading" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-secondary/40" />
            ))}
          </div>
        )}

        {status === "error" && (
          <p className="text-muted-foreground">
            Couldn't load blog posts right now. Please try again shortly.
          </p>
        )}

        {status === "ready" && posts.length === 0 && (
          <p className="text-muted-foreground">No posts published yet — check back soon.</p>
        )}

        {status === "ready" && posts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.06}>
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full">
                  <article className="relative h-full glass rounded-2xl overflow-hidden cursor-pointer">
                    {getBlogImageUrl(post.image) && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={getBlogImageUrl(post.image)!}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-7">
                      {post.category && (
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gradient-brand">
                          {post.category.name}
                        </p>
                      )}
                      <h3 className="mt-3 text-xl font-bold line-clamp-2">{post.title}</h3>
                      <p className="mt-2 text-muted-foreground text-sm line-clamp-3">
                        {post.description}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gradient-brand">
                        Read more <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
