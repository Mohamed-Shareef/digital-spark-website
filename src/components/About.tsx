import { Reveal } from "./Reveal";
import { Target, Eye, Users } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gradient-brand">
            About Nova
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl">
            We engineer growth at the intersection of strategy, story, and data.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-muted-foreground text-lg">
            From scrappy startups to global enterprises, we partner with brands
            ready to scale. No fluff, no vanity metrics — just measurable
            outcomes.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, title: "Our Mission", body: "Make world-class growth marketing accessible to every ambitious brand." },
            { icon: Eye, title: "Our Vision", body: "A world where every dollar spent on marketing creates compounding value." },
            { icon: Users, title: "Our Team", body: "30+ strategists, designers, and engineers obsessed with results." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="glass rounded-2xl p-7 hover:-translate-y-1 transition-transform">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-muted-foreground">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}