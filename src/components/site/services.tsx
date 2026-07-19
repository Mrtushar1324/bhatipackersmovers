import { services, whyItems } from "./data";
import { ArrowRight } from "lucide-react";

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our Services"
          title="Everything you need for a stress-free move"
          subtitle="From a studio apartment to a full corporate office — one team, one price, zero surprises."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-elegant transition group-hover:scale-110">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <a
                href="#quote"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full gradient-accent opacity-0 blur-2xl transition group-hover:opacity-40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow, title, subtitle, center = true,
}: { eyebrow: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="A moving company built on trust"
          subtitle="Every detail is engineered to protect your belongings and your time."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((w) => (
            <div
              key={w.title}
              className="glass flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-accent text-accent-foreground">
                <w.icon className="h-5 w-5" />
              </div>
              <span className="min-w-0 font-semibold">{w.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
