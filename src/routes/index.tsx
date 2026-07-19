import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Services, WhyChooseUs } from "@/components/site/services";
import { Process } from "@/components/site/process";

import { BookingForm } from "@/components/site/booking-form";
import { FAQ, Gallery } from "@/components/site/misc-sections";
import { Contact, Footer } from "@/components/site/contact";
import { FloatingButtons } from "@/components/site/floating";
import { Chatbot } from "@/components/site/chatbot";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Bhati Packers & Movers — Safe, Fast & Trusted Movers Across India" },
      { name: "description", content: "Household shifting, office relocation, vehicle transport, packing, loading, unloading, warehousing and insurance. Get a free quote from Bhati Packers & Movers." },
      { property: "og:title", content: "Bhati Packers & Movers — Trusted Movers Across India" },
      { property: "og:description", content: "Free quote, GPS tracked, fully insured, damage-free delivery across 50+ Indian cities." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [chatOpen, setChatOpen] = useState(0);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Process />
        
        <Gallery />
        <BookingForm />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons onOpenChat={() => setChatOpen((n) => n + 1)} />
      <Chatbot key={chatOpen} />
      <Toaster position="top-center" richColors />
    </div>
  );
}
