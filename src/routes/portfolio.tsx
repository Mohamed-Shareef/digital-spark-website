import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/Portfolio";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      {
        title: "Our Portfolio | Exavia",
      },
      {
        name: "description",
        content:
          "Explore Exavia's portfolio and successful digital marketing campaigns.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Portfolio />
      <Footer />
    </div>
  );
}