import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, User, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Role = "bot" | "user";
type Msg = { id: string; role: Role; text: string; quick?: string[] };

type Estimate = {
  pickup?: string; drop?: string; bhk?: string; floor?: string; lift?: string;
  date?: string; vehicle?: string; packing?: string; storage?: string; insurance?: string;
  name?: string; phone?: string;
};

const stepOrder: (keyof Estimate)[] = [
  "pickup", "drop", "bhk", "floor", "lift", "date", "vehicle",
  "packing", "storage", "insurance", "name", "phone",
];

const prompts: Record<keyof Estimate, { q: string; quick?: string[] }> = {
  pickup:   { q: "Great! What's your pickup city?", quick: ["Delhi", "Mumbai", "Bengaluru", "Jaipur"] },
  drop:     { q: "And your destination city?", quick: ["Mumbai", "Pune", "Hyderabad", "Chennai"] },
  bhk:      { q: "How big is the move?", quick: ["1 BHK", "2 BHK", "3 BHK", "4+ BHK / Villa"] },
  floor:    { q: "Which floor is the pickup on?", quick: ["Ground", "1st", "2nd", "3rd+"] },
  lift:     { q: "Is a lift available?", quick: ["Yes", "No"] },
  date:     { q: "When do you plan to move?", quick: ["This week", "This month", "Next month", "Flexible"] },
  vehicle:  { q: "Any vehicle preference?", quick: ["Mini Tempo", "14 ft", "17 ft", "20 ft container"] },
  packing:  { q: "Do you need packing?", quick: ["Yes, full packing", "Partial", "No, self-pack"] },
  storage:  { q: "Any warehouse / storage needed?", quick: ["Yes", "No"] },
  insurance:{ q: "Would you like transit insurance?", quick: ["Yes, recommended", "No"] },
  name:     { q: "Almost done — what's your name?" },
  phone:    { q: "And a phone number where our expert can call you?" },
};

const faq: { match: RegExp; a: string }[] = [
  { match: /price|cost|quote|charge/i, a: "Local moves start around ₹6,000 for a 1 BHK. Intercity depends on distance, house size and packing. I can estimate it for you — just answer a few quick questions." },
  { match: /track|gps/i, a: "Every truck is GPS-tracked and you'll get live WhatsApp updates from a dedicated coordinator." },
  { match: /pack(ing)? material/i, a: "We use bubble wrap, corrugated sheets, stretch film, double-wall cartons and wooden crates for fragile items." },
  { match: /days? before|advance|book/i, a: "For local moves, 2–3 days is enough. For intercity, book 5–7 days in advance." },
  { match: /vehicle|car|bike/i, a: "We transport cars and two-wheelers on dedicated carriers, fully insured." },
];

// function priceOf(e: Estimate) {
//   const bhk = /1/.test(e.bhk ?? "") ? 6000 : /2/.test(e.bhk ?? "") ? 10000 : /3/.test(e.bhk ?? "") ? 15000 : 22000;
//   const vm = /mini|tempo/i.test(e.vehicle ?? "") ? 0.9 : /17/.test(e.vehicle ?? "") ? 1.35 : /20/.test(e.vehicle ?? "") ? 1.6 : 1.1;
//   let p = bhk * vm;
//   if (/villa|4/.test(e.bhk ?? "")) p *= 1.15;
//   if (/no/i.test(e.lift ?? "")) p += (/3|4/.test(e.floor ?? "") ? 1600 : 800);
//   if (/full|yes/i.test(e.packing ?? "")) p += 2500;
//   if (/yes/i.test(e.storage ?? "")) p += 3000;
//   if (/yes/i.test(e.insurance ?? "")) p += Math.round(p * 0.03);
//   return Math.round(p / 100) * 100;
//}

const uid = () => Math.random().toString(36).slice(2, 9);

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [estimate, setEstimate] = useState<Estimate>({});
  const [step, setStep] = useState(-1); // -1 = idle small talk
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      pushBot(
        "Hi! I'm Bhati's Assistant 👋 I can answer questions or build an instant moving quote for you.",
        ["Get instant quote", "Services offered", "Talk on WhatsApp"],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const pushBot = (text: string, quick?: string[]) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: uid(), role: "bot", text, quick }]);
      setTyping(false);
    }, 550);
  };
  const pushUser = (text: string) =>
    setMessages((m) => [...m, { id: uid(), role: "user", text }]);

  const startFlow = () => {
    setStep(0);
    setEstimate({});
    pushBot(prompts.pickup.q, prompts.pickup.quick);
  };

  const advance = (nextStep: number, answer: string) => {
    const key = stepOrder[nextStep - 1];
    setEstimate((e) => ({ ...e, [key]: answer }));
    if (nextStep >= stepOrder.length) {
      const finalEst: Estimate = { ...estimate, [key]: answer };
      //const p = priceOf(finalEst);
      setStep(-1);
      pushBot(
        `Thanks ${finalEst.name ?? "there"}! \n\nOur expert will call you at ${finalEst.phone ?? "your number"} shortly with the exact quote.`,
        ["Continue on WhatsApp", "Start new estimate", "Talk to human"],
      );
      return;
    }
    setStep(nextStep);
    const next = prompts[stepOrder[nextStep]];
    pushBot(next.q, next.quick);
  };

  const handleAnswer = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    pushUser(text);

    if (/whatsapp/i.test(text)) {
      window.open("https://wa.me/917023568588?text=Hi%20Bhati%20Packers,%20I%20want%20a%20quote", "_blank");
      pushBot("Opening WhatsApp… our team will reply in minutes.");
      return;
    }
    if (/human|talk to (agent|expert|human)|call/i.test(text)) {
      pushBot("You can reach us at +91 70235 68588. I've also flagged your chat to a coordinator.");
      return;
    }

    if (step === -1) {
      if (/quote|estimate|price|cost|shift|move/i.test(text)) {
        startFlow();
        return;
      }
      if (/service/i.test(text)) {
        pushBot(
          "We offer house shifting, office relocation, local & intercity moving, vehicle transport, packing, loading/unloading, furniture shifting and warehousing.",
          ["Get instant quote", "Pricing", "Talk on WhatsApp"],
        );
        return;
      }
      const hit = faq.find((f) => f.match.test(text));
      if (hit) { pushBot(hit.a, ["Get instant quote", "Talk on WhatsApp"]); return; }
      pushBot(
        "I couldn't find the information you're looking for. Please contact our team on WhatsApp or call us for immediate assistance.",
        ["Get instant quote", "Services"],
      );
      return;
    }

    advance(step + 1, text);
  };

  const send = () => { handleAnswer(input); setInput(""); };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chatbot"
        className={cn(
          "fixed bottom-5 right-5 z-40 grid h-16 w-16 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elegant transition hover:scale-110",
          open && "scale-0",
        )}
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full gradient-accent text-[10px] font-bold text-accent-foreground">1</span>
      </button>

      <div
        className={cn(
          "fixed bottom-5 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-elegant transition-all duration-300 sm:w-96",
          open ? "h-[600px] max-h-[85vh] scale-100 opacity-100" : "pointer-events-none h-0 scale-95 opacity-0",
        )}
      >
        <div className="flex items-center gap-3 gradient-primary p-4 text-primary-foreground">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20">
            <Bot className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display font-bold leading-tight">Bhati Assistant</p>
            <p className="text-xs opacity-90"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-400" />Online — replies in seconds</p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-2 hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-secondary/40 p-4">
          {messages.map((m) => (
            <Bubble key={m.id} msg={m} onQuick={handleAnswer} />
          ))}
          {typing && <TypingBubble />}
        </div>

        <form
          className="flex items-center gap-2 border-t border-border bg-card p-3"
          onSubmit={(e) => { e.preventDefault(); send(); }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message…"
            className="flex-1"
          />
          <Button type="submit" size="icon" className="gradient-accent text-accent-foreground shadow-accent">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}

function Bubble({ msg, onQuick }: { msg: Msg; onQuick: (v: string) => void }) {
  const isBot = msg.role === "bot";
  return (
    <div className={cn("flex gap-2", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-primary text-primary-foreground">
          <Bot className="h-3.5 w-3.5" />
        </div>
      )}
      <div className={cn("max-w-[78%]", isBot ? "" : "items-end text-right")}>
        <div
          className={cn(
            "whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm shadow-soft",
            isBot ? "rounded-tl-sm bg-card text-foreground" : "rounded-tr-sm gradient-primary text-primary-foreground",
          )}
        >
          {msg.text}
        </div>
        {msg.quick && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {msg.quick.map((q) => (
              <button
                key={q}
                onClick={() => onQuick(q)}
                className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
      {!isBot && (
        <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
          <User className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex gap-2">
      <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-primary text-primary-foreground">
        <Bot className="h-3.5 w-3.5" />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-card px-4 py-3 shadow-soft">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: "0.15s" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
}
