import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./services";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Truck, Package, Warehouse, Building2, Sofa, Car } from "lucide-react";

const faqs = [
  { q: "How much does shifting cost?", a: "Local shifting starts around ₹6,000 for a 1 BHK. Intercity costs depend on distance, house size, floor and packing. Use our calculator above for a live estimate." },
  { q: "How many days before should I book?", a: "For local moves, 2–3 days is enough. For intercity or end-of-month dates, book at least 5–7 days in advance to lock the best price." },
  { q: "Is insurance included?", a: "Basic transit insurance is optional and available at ~3% of goods value. Full-value coverage can also be arranged on request." },
  { q: "Do you provide packing materials?", a: "Yes. We use bubble wrap, stretch film, corrugated sheets, double-wall cartons and wooden crates for fragile or premium items." },
  { q: "Can I track my shipment?", a: "Yes — every truck is GPS-tracked and you get live status on WhatsApp plus a dedicated move coordinator." },
  { q: "Do you handle vehicle transport?", a: "Yes. Cars and two-wheelers are transported on dedicated car carriers with full insurance." },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-10 rounded-2xl border border-border bg-card p-2 shadow-soft">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={String(i)} className="border-b last:border-b-0">
              <AccordionTrigger className="px-4 text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

const stats = [
  { value: 5000, suffix: "+", label: "Moves Planned Capacity" },
  { value: 50, suffix: "+", label: "Cities Served" },
  { value: 24, suffix: "/7", label: "Support" },
  { value: 100, suffix: "%", label: "Insured Moves" },
];

export function Stats() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 rounded-3xl gradient-primary p-8 text-primary-foreground shadow-elegant sm:grid-cols-2 sm:p-12 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const dur = 1400;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold sm:text-5xl">
        {n.toLocaleString("en-IN")}{suffix}
      </p>
      <p className="mt-2 text-sm opacity-90">{label}</p>
    </div>
  );
}

const gallery = [
  { icon: Package, title: "Packing", color: "gradient-primary" },
  { icon: Truck, title: "Loading", color: "gradient-accent" },
  { icon: Warehouse, title: "Warehouse", color: "gradient-primary" },
  { icon: Building2, title: "Office Move", color: "gradient-accent" },
  { icon: Sofa, title: "Furniture", color: "gradient-primary" },
  { icon: Car, title: "Vehicle Transport", color: "gradient-accent" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our Work"
          title="A glimpse of how we handle every move"
          subtitle="From compact studio moves to full corporate relocations."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g) => (
            <div
              key={g.title}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className={`absolute inset-0 ${g.color} opacity-90`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,white_0%,transparent_50%)] opacity-30" />
              <div className="relative flex h-full flex-col items-center justify-center gap-3 text-primary-foreground">
                <g.icon className="h-14 w-14 transition group-hover:scale-110" />
                <span className="font-display text-2xl font-bold">{g.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const posts = [
  { title: "10 Moving Tips That Save Time & Money", cat: "Moving Tips", read: "6 min" },
  { title: "The Ultimate Packing Guide for Fragile Items", cat: "Packing", read: "8 min" },
  { title: "House Shifting Checklist: 30 Days Before to Move Day", cat: "Checklist", read: "5 min" },
  { title: "Office Relocation Without Downtime — A 2026 Guide", cat: "Office", read: "9 min" },
];

export function Blog() {
  return (
    <section id="blog" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Blog"
          title="Moving guides & expert tips"
          subtitle="Everything you need to plan a smooth relocation."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p, i) => (
            <article key={p.title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
              <div className={`aspect-[16/10] ${i % 2 ? "gradient-accent" : "gradient-primary"}`} />
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">{p.cat}</span>
                <h3 className="mt-2 line-clamp-2 font-display text-lg font-bold group-hover:text-primary">{p.title}</h3>
                <p className="mt-3 text-xs text-muted-foreground">{p.read} read</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
