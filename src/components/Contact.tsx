import { useState } from "react";
import { z } from "zod";
import { Reveal } from "./Reveal";
import { toast } from "sonner";
import { Instagram, Linkedin, Twitter, Mail, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(160),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(1000),
});

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Thanks! We'll be in touch within 24 hours.");
    form.reset();
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gradient-brand">
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight">
              Let's grow your <span className="text-gradient-brand">business</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-muted-foreground max-w-md">
              Tell us about your goals. We'll respond within 24 hours with a custom growth plan.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex items-center gap-3">
              {[
                {
                  Icon: Instagram,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
                {
                  Icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  Icon: FaWhatsapp,
                  href: "https://wa.me/919003721577?text=Hello%20Exavia",
                  label: "WhatsApp",
                },
                {
                  Icon: Mail,
                  href: "https://mail.google.com/mail/?view=cm&fs=1&to=exavia.co@gmail.com",
                  label: "Email",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full glass hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="glass rounded-3xl p-7 md:p-9 space-y-5" noValidate>
            <Field label="Name" name="name" error={errors.name} placeholder="Jane Cooper" />
            <Field
              label="Email"
              name="email"
              type="email"
              error={errors.email}
              placeholder="jane@brand.com"
            />
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your goals…"
                className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-to)] transition"
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-gradient-brand px-7 py-3.5 font-semibold text-white glow-brand transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {loading ? (
                "Sending…"
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-to)] transition"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
