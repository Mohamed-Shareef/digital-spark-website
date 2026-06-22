import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Exavia | Digital Marketing Experts",
      },
      {
        name: "description",
        content:
          "Learn about Exavia's mission, vision, and expert team dedicated to helping brands grow online.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <About />
      <Footer />
    </div>
  );
}