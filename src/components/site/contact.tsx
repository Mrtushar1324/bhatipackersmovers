import { SectionHeader } from "./services";
import { Mail, MapPin, Phone, MessageCircle, Clock, ShieldAlert } from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Contact" title="Talk to a relocation expert" subtitle="Available across India, 7 days a week." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-4">
            <InfoCard icon={Phone} title="Phone" lines={["+91 70235 68588"]} href="tel:+917023568588" />
            <InfoCard icon={MessageCircle} title="WhatsApp" lines={["Chat with our team instantly on +91 70235 68588"]} href="https://wa.me/917023568588?text=Hi%20Bhati%20Packers%20%26%20Movers%2C%20I%20need%20a%20quote." accent />
            <InfoCard icon={Mail} title="Email" lines={["bhatipackersmovers@gmail.com"]} href="mailto:bhatipackersmovers@gmail.com" />
            <InfoCard icon={MapPin} title="Head Office" lines={["Shop No. 2, Prithvi Tower, Plot No. 117,", "Sumer Nagar, Mansarovar, Jaipur - 302020"]} />
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard icon={Clock} title="Working Hours" lines={["Mon – Sun: 7:00 – 22:00"]} compact />
              <InfoCard icon={ShieldAlert} title="Emergency" lines={["+91 73398 07006"]} href="tel:+917339807006" compact />
            </div>
            <div className="flex items-center gap-3 pt-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition hover:gradient-primary hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-elegant">
            <iframe
              title="Bhati Packers & Movers — Head Office, Mansarovar, Jaipur"
              src="https://www.google.com/maps?q=Prithvi+Tower+Plot+117+Sumer+Nagar+Mansarovar+Jaipur+302020&output=embed"
              className="h-full min-h-[420px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon: Icon, title, lines, href, accent, compact,
}: {
  icon: typeof Phone; title: string; lines: string[]; href?: string; accent?: boolean; compact?: boolean;
}) {
  const Wrap: any = href ? "a" : "div";
  return (
    <Wrap
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={`flex items-start gap-4 rounded-2xl border border-border bg-card ${compact ? "p-4" : "p-5"} shadow-soft transition ${href ? "hover:-translate-y-1 hover:shadow-elegant" : ""}`}
    >
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accent ? "gradient-accent text-accent-foreground" : "gradient-primary text-primary-foreground"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm text-muted-foreground">{l}</p>
        ))}
      </div>
    </Wrap>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary font-black text-primary-foreground">B</span>
              <span className="font-display text-lg font-bold">Bhati Packers & Movers</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Safe, fast and trusted packers and movers across India. Household shifting, office
              relocation, vehicle transport and warehousing — all under one roof.
            </p>
          </div>
          <FooterCol title="Quick Links" links={[
            { label: "Home", href: "#home" }, { label: "Services", href: "#services" },
            { label: "Pricing", href: "#pricing" }, { label: "Gallery", href: "#gallery" },
            { label: "FAQ", href: "#faq" }, { label: "Contact", href: "#contact" },
          ]} />
          <FooterCol title="Services" links={[
            { label: "House Shifting", href: "#services" },
            { label: "Office Relocation", href: "#services" },
            { label: "Vehicle Transport", href: "#services" },
            { label: "Warehouse & Storage", href: "#services" },
            { label: "Packing Services", href: "#services" },
          ]} />
          <FooterCol title="Cities Served" links={[
            { label: "All Over India", href: "#" }, { label: "Jaipur", href: "#" },
            { label: "Delhi NCR", href: "#" }, { label: "Mumbai", href: "#" },
            { label: "Bengaluru", href: "#" }, { label: "Hyderabad", href: "#" },
          ]} />
        </div>
        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} Bhati Packers & Movers. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms & Conditions</a>
            <a href="#" className="hover:text-primary">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-display font-bold">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}><a href={l.href} className="hover:text-primary">{l.label}</a></li>
        ))}
      </ul>
    </div>
  );
}
