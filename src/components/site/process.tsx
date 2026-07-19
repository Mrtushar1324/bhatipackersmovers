import { SectionHeader } from "./services";
import {
  ClipboardCheck, Search, Package, Truck, Navigation, PackageOpen, Sparkles, Smile,
} from "lucide-react";

const steps = [
  { icon: ClipboardCheck, title: "Request Quote", desc: "Share your move details in under 30 seconds." },
  { icon: Search, title: "Survey", desc: "On-site or virtual survey to lock the price." },
  { icon: Package, title: "Packing", desc: "Multi-layer packing with premium materials." },
  { icon: Truck, title: "Loading", desc: "Trained crew loads with hydraulic care." },
  { icon: Navigation, title: "Transportation", desc: "GPS-tracked, insured transit." },
  { icon: PackageOpen, title: "Unloading", desc: "Careful unloading at destination." },
  { icon: Sparkles, title: "Unpacking", desc: "Arrange everything as per your layout." },
  { icon: Smile, title: "Happy Customer", desc: "Sign-off and 7-day support included." },
];

export function Process() {
  return (
    <section id="process" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Process Timeline"
          title="How Bhati packers & movers works"
          subtitle="Eight simple steps from your first message to unpacking your new home."
        />
        <div className="relative mt-14">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent lg:left-1/2" />
          <div className="grid gap-8">
            {steps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <div
                  key={s.title}
                  className={`relative grid gap-4 lg:grid-cols-2 lg:gap-16 ${right ? "lg:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className={`pl-16 lg:pl-0 ${right ? "lg:pl-16" : "lg:pr-16 lg:text-right"}`}>
                    <div className="glass rounded-2xl p-5 shadow-soft">
                      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step {i + 1}</p>
                      <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                  <div className="hidden lg:block" />
                  <div className="absolute left-0 top-4 grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant lg:left-1/2 lg:-translate-x-1/2">
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
