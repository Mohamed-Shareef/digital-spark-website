import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nova — Digital Marketing Agency that Grows Brands" },
      { name: "description", content: "Award-winning digital marketing agency. SEO, social, paid ads & design that drive measurable growth for ambitious brands." },
      { property: "og:title", content: "Nova — Digital Marketing Agency" },
      { property: "og:description", content: "Performance-driven SEO, social, paid ads, and design that turn clicks into customers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
