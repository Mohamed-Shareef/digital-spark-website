import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      {
        title: "Blog | Exavia",
      },
      {
        name: "description",
        content: "Insights, ideas, and updates from the Exavia team.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Blog />
      <Footer />
    </div>
  );
}
