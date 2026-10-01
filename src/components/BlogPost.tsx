import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getBlogImageUrl, type BlogPost as BlogPostType } from "@/lib/blogApi";

export function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");

    getBlogPostBySlug(slug)
      .then((res) => {
        if (!active) return;
        setPost(res.data);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <article className="relative py-28 px-6">
      <div className="mx-auto max-w-[800px]">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        {status === "loading" && (
          <div className="mt-8 space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded-md bg-secondary/40" />
            <div className="h-64 animate-pulse rounded-2xl bg-secondary/40" />
          </div>
        )}

        {status === "error" && (
          <p className="mt-8 text-muted-foreground">
            This post couldn't be found or isn't available.
          </p>
        )}

        {status === "ready" && post && (
          <>
            {post.category && (
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-gradient-brand">
                {post.category.name}
              </p>
            )}
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-muted-foreground">{post.description}</p>

            {getBlogImageUrl(post.image) && (
              <img
                src={getBlogImageUrl(post.image)!}
                alt={post.title}
                className="mt-8 w-full rounded-2xl object-cover"
              />
            )}

            {post.content && (
              <div
                className="prose prose-invert mt-10 max-w-none text-foreground/90"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </>
        )}
      </div>
    </article>
  );
}
