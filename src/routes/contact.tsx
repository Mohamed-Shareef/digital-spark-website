import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Exavia | Let's Grow Your Business",
      },
      {
        name: "description",
        content:
          "Contact Exavia for SEO, paid ads, branding, and digital marketing services.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Contact />
      <Footer />
    </div>
  );
}