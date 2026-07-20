import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import logo from "@/assets/bhati-logo.jpeg";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#why", label: "Why Us" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-soft py-2" : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Bhati Packers & Movers logo"
            className="h-11 w-11 shrink-0 rounded-xl object-cover shadow-elegant"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-base font-bold sm:text-lg">Bhati Packers</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              & Movers
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+917023568588"
            className="hidden items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary sm:flex"
          >
            <Phone className="h-4 w-4 text-primary" /> +91 70235 68588
          </a>
          <a
            href="tel:+916376498773"
            className="hidden items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary sm:flex"
          >
            <Phone className="h-4 w-4 text-primary" /> +91 63764 98773
          </a>
          <Button
            asChild
            className="hidden gradient-accent text-accent-foreground shadow-accent hover:opacity-95 sm:inline-flex"
          >
            <a href="#quote">Get Quote</a>
          </Button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass mx-4 mt-2 rounded-2xl p-4 lg:hidden">
          <div className="grid gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <Button asChild className="mt-2 gradient-accent text-accent-foreground">
              <a href="#quote" onClick={() => setOpen(false)}>Get Free Quote</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
