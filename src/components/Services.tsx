import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Reveal } from "./Reveal";
import { services } from "@/data/services";
import { ArrowUpRight } from "lucide-react";

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>("[data-service]");
    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const icon = card.querySelector("[data-icon]");
      const enter = () => {
        gsap.to(card, { y: -8, duration: 0.4, ease: "power2.out" });
        gsap.to(icon, { rotate: 8, scale: 1.1, duration: 0.4, ease: "power2.out" });
      };
      const leave = () => {
        gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: "power2.out" });
      };
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section id="services" className="relative py-28 px-6 bg-secondary/30">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gradient-brand">
                Services
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
                Everything you need to scale online.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground max-w-md">
              One integrated team across SEO, social, paid, and design — all rowing toward your revenue goals.
            </p>
          </Reveal>
        </div>

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <article
                data-service
                className="group relative h-full glass rounded-2xl p-7 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[color:var(--brand-from)]/10 via-transparent to-[color:var(--brand-to)]/10" />
                <div className="relative">
                  <div data-icon className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm">{s.description}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-1 w-1 rounded-full bg-gradient-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gradient-brand">
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}