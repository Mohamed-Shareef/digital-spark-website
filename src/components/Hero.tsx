import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Play } from "lucide-react";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6 })
        .from(".hero-word", { y: 60, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.3")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-cta > *", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".hero-stat", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.2");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative isolate overflow-hidden min-h-screen flex items-center pt-28 pb-20"
    >
      <HeroBackground />
      {/* Vignette */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_85%)]" />

      <div className="mx-auto w-full max-w-[1200px] px-6">
        <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
          Award-winning digital marketing agency
        </span>

        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]">
          <span className="hero-word inline-block mr-3">We</span>
          <span className="hero-word inline-block mr-3">Grow</span>
          <span className="hero-word inline-block mr-3">Brands</span>
          <br className="hidden sm:block" />
          <span className="hero-word inline-block mr-3">Digitally</span>
          <span className="hero-word inline-block text-gradient-brand">.</span>
        </h1>

        <p className="hero-sub mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
          Performance-driven SEO, social, paid ads, and design that turn clicks
          into customers — and customers into fans.
        </p>

        <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 font-semibold text-white glow-brand transition-transform hover:scale-[1.03]"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-semibold hover:bg-white/10 transition-colors"
          >
            <Play className="h-4 w-4" />
            View Services
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl">
          {[
            { k: "250+", v: "Clients served" },
            { k: "12x", v: "Avg. ROAS" },
            { k: "98%", v: "Retention" },
            { k: "9", v: "Industry awards" },
          ].map((s) => (
            <div key={s.v} className="hero-stat">
              <dt className="text-3xl md:text-4xl font-extrabold text-gradient-brand">
                {s.k}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}