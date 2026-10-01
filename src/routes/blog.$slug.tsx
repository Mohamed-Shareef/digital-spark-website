import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { BlogPost } from "@/components/BlogPost";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <BlogPost slug={slug} />
      <Footer />
    </div>
  );
}
