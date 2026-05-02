import { useState } from "react";
import { Reveal } from "./Reveal";
import { cases, type CaseStudy } from "@/data/cases";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";

export function Portfolio() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="relative py-28 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gradient-brand">
                Case Studies
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
                Real results for real brands.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => setActive(c)}
                className="group relative w-full text-left h-full glass rounded-2xl p-7 overflow-hidden transition-transform hover:-translate-y-1"
              >
                <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-brand opacity-20 blur-3xl group-hover:opacity-40 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">{c.category}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  </div>
                  <p className="mt-4 text-5xl font-extrabold text-gradient-brand">
                    {c.metric}
                  </p>
                  <p className="text-sm text-muted-foreground">{c.metricLabel}</p>
                  <h3 className="mt-6 text-lg font-bold">{c.client}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.summary}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl">
          {active && (
            <>
              <DialogHeader>
                <p className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">
                  {active.category}
                </p>
                <DialogTitle className="text-2xl md:text-3xl font-extrabold">
                  {active.headline}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {active.client}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {active.results.map((r) => (
                  <div key={r.label} className="rounded-xl border border-border p-4 text-center">
                    <div className="text-xl font-extrabold text-gradient-brand">{r.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{r.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed">{active.details}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}