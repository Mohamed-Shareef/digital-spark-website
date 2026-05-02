import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "../assets/exavia.jpeg";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-border/40"
          : "bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-2"
        aria-label="Primary"
      >
        <a href="#home" className="flex items-center  font-extrabold text-lg">
          {/* <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>Nova<span className="text-gradient-brand">.</span></span> */}
          <img src={logo} alt="Nova Logo" className="h-15 w-15 md:h-13 md:w-13 rounded-lg object-cover" />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-foreground",
                  active === l.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {l.label}
                {active === l.href && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-brand" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.03]"
        >
          Let's Talk
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-border/40 animate-fade-in">
          <ul className="mx-auto max-w-[1200px] px-6 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    active === l.href
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white"
            >
              Let's Talk
            </a>
          </ul>
        </div>
      )}
    </header>
  );
}