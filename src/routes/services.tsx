import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      {
        title: "Digital Marketing Services | Exavia",
      },
      {
        name: "description",
        content:
          "SEO, social media marketing, paid advertising, branding, and website design services.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Services />
      <Footer />
    </div>
  );
}