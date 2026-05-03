import { Reveal } from "./Reveal";
import { Target, Eye, Users } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gradient-brand">
            About Exavia
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl">
            We engineer growth at the intersection of strategy, story, and data.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-muted-foreground text-lg">
            At Exavia, we drive business growth through strategic thinking, creative excellence, and
            performance-focused marketing delivering results that truly matter.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Our Mission",
              body: "To become a trusted digital growth partner for businesses by delivering innovative, result-driven marketing solutions that create real impact and long-term success.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              body: "At Exavia, our mission is to help brands grow online through smart strategies, creative content, and performance-focused marketing. We aim to simplify digital marketing for businesses and turn ideas into measurable results.",
            },
            {
              icon: Users,
              title: "Our Team",
              body: "We are a passionate team of digital marketers, content creators, and strategists who believe in creativity, consistency, and results. Every project we take on is handled with dedication, attention to detail, and a focus on helping our clients succeed in the digital world.",
            },
          ].map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 0.08}
              className="glass rounded-2xl p-7 hover:-translate-y-1 transition-transform"
            >
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
