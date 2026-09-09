import { ArrowRight, Phone, ShieldCheck, Truck, Sparkles, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-movers.jpg";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Professional Bhati Packers & Movers team loading household goods into a truck"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:pt-24">
        <div className="animate-fade-up max-w-3xl text-primary-foreground">
          {/* Launch offer badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-foreground">
            <span>🚀</span> New in your city — launch offers live
          </div>

          {/* Trust strip - GST + other badges, same style, in a row */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
          <TrustBadge icon={ShieldCheck} label="GST Registered" value="08ABHFB4245L1Z8" />
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-white drop-shadow sm:text-5xl lg:text-6xl">
            Safe, Fast & Trusted <span className="text-gradient bg-gradient-to-r from-white to-[color:var(--accent-glow)]">Packers and Movers</span> Across India
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/90 sm:text-lg">
            Household shifting, office relocation, vehicle transportation, warehouse services,
            packing, loading, unloading and insurance — handled with complete safety by trained
            professionals.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gradient-accent text-accent-foreground shadow-accent hover:opacity-95">
              <a href="#quote">
                Get Free Quote <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
              <a href="tel:+917023568588">
                <Phone className="mr-1 h-4 w-4" /> Call Now
              </a>
            </Button>
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, label: "Fully Insured" },
              { icon: Truck, label: "GPS Tracked" },
              { icon: Sparkles, label: "Damage-Free" },
            ].map((f) => (
              <div key={f.label} className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-foreground">
                <f.icon className="h-4 w-4 text-primary" />
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBadge({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2">
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/20">
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="text-left leading-tight">
        <p className="text-[10px] font-medium uppercase tracking-wide text-white/70">{label}</p>
        <p className="text-xs font-bold text-white">{value}</p>
      </div>
    </div>
  );
}