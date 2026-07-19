import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";

export function FloatingButtons({ onOpenChat }: { onOpenChat: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/917023568588?text=Hi%20Bhati%20Packers%20%26%20Movers%2C%20I%20need%20a%20quote%20for%20my%20move."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-elegant transition hover:scale-110 animate-float"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href="tel:+917023568588"
        aria-label="Call now"
        className="grid h-14 w-14 place-items-center rounded-full gradient-accent text-accent-foreground shadow-accent transition hover:scale-110"
      >
        <Phone className="h-6 w-6" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-12 w-12 place-items-center rounded-full glass shadow-soft transition hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <button
        onClick={onOpenChat}
        aria-label="Open chat"
        className="lg:hidden grid h-14 w-14 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elegant transition hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
