import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logo from "../assets/exavia.jpeg";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Work" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border/40" : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-2"
        aria-label="Primary"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center font-extrabold text-lg">
          <img
            src={logo}
            alt="Exavia Logo"
            className="h-15 w-15 md:h-13 md:w-13 rounded-lg object-cover"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = location.pathname === link.to;

            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-foreground",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-brand" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.03]"
        >
          Let's Talk
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden glass border-t border-border/40 animate-fade-in">
          <ul className="mx-auto max-w-[1200px] px-6 py-4 flex flex-col gap-2">
            {links.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={cn(
                      "block rounded-md px-3 py-2 text-base font-medium",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            <Link
              to="/contact"
              className="mt-2 inline-flex justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white"
            >
              Let's Talk
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}