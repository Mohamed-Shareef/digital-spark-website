import { useEffect, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

export function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative border-t border-border/40 px-6 py-14">
      <div className="mx-auto max-w-[1200px] grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <a href="#home" className="flex items-center gap-2 font-extrabold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            Nova<span className="text-gradient-brand">.</span>
          </a>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            A digital marketing agency engineering measurable growth for ambitious brands worldwide.
          </p>
        </div>
        <FooterCol title="Company" items={[
          { label: "About", href: "#about" },
          { label: "Services", href: "#services" },
          { label: "Work", href: "#work" },
          { label: "Contact", href: "#contact" },
        ]} />
        <FooterCol title="Services" items={[
          { label: "SEO", href: "#services" },
          { label: "Social", href: "#services" },
          { label: "Paid Ads", href: "#services" },
          { label: "Web Design", href: "#services" },
        ]} />
      </div>
      <div className="mx-auto max-w-[1200px] mt-10 pt-6 border-t border-border/40 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Nova Agency. All rights reserved.</p>
        <p>Made with care · <span className="text-gradient-brand font-semibold">Grow boldly</span></p>
      </div>

      {show && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-white glow-brand transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((l) => (
          <li key={l.label}><a href={l.href} className="hover:text-foreground transition-colors">{l.label}</a></li>
        ))}
      </ul>
    </div>
  );
}