import { useState } from "react";
import { SectionHeader } from "./services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone"),
  email: z.string().trim().email("Enter a valid email").max(120),
  pickup: z.string().trim().min(3, "Pickup address required").max(200),
  destination: z.string().trim().min(3, "Destination required").max(200),
  date: z.string().min(1, "Pick a date"),
  houseSize: z.string(),
  service: z.string(),
  notes: z.string().max(500).optional(),
  contact: z.string(),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = {
  name: "", phone: "", email: "", pickup: "", destination: "",
  date: "", houseSize: "2bhk", service: "house", notes: "", contact: "call",
};

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initial);
  const [done, setDone] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const submit = () => {
    const r = schema.safeParse(data);
    const phoneRegex=/^[6-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)){
      alert("please enter a valid 10 digit mobile no:-");
    return;
    }

    if (!r.success) {
      toast.error(r.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    const lines = [
      `New Moving Inquiry — Bhati Packers & Movers`,
      ``,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Preferred Contact: ${data.contact}`,
      `Pickup: ${data.pickup}`,
      `Destination: ${data.destination}`,
      `Moving Date: ${data.date}`,
      `House Size: ${data.houseSize.toUpperCase()}`,
      `Service: ${data.service}`,
      `Notes: ${data.notes || "-"}`,
    ];
    const body = lines.join("\n");

    // WhatsApp API (click-to-chat) — sends inquiry to business WhatsApp
    const waUrl = `https://wa.me/917023568588?text=${encodeURIComponent(body)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Gmail / email inquiry — opens user's mail client addressed to business inbox
    const mailUrl = `mailto:bhatipackersmovers@gmail.com?subject=${encodeURIComponent(
      `Moving Inquiry from ${data.name}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailUrl;

    setDone(true);
    toast.success("Inquiry sent via WhatsApp & Email. Our team will call you shortly.");
  };

  return (
    <section id="quote" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Book a Move"
          title="Request your free quote"
          subtitle="Tell us a bit about your move. We'll call you within 15 minutes with the exact price."
        />

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          {done ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Request received!</h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Our relocation expert will call you at <span className="font-semibold text-foreground">{data.phone}</span> shortly with a customised quote.
              </p>
              <Button className="mt-6 gradient-primary text-primary-foreground" onClick={() => { setDone(false); setData(initial); setStep(0); }}>
                Book another move
              </Button>
            </div>
          ) : (
            <>
              <Stepper step={step} />
              <div className="mt-8 min-h-[280px]">
                {step === 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name"><Input value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" /></Field>
                    <Field label="Phone"><Input value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 9876543210" pattern="[6-9]{1}[0-9]{9}" maxLength={10} required/></Field>
                    <Field label="Email"><Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" /></Field>
                    <Field label="Preferred Contact">
                      <Select value={data.contact} onValueChange={(v) => set("contact", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="call">Phone Call</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                )}
                {step === 1 && (
                  <div className="grid gap-4">
                    <Field label="Pickup Address"><Input value={data.pickup} onChange={(e) => set("pickup", e.target.value)} placeholder="Flat / street / city" /></Field>
                    <Field label="Destination Address"><Input value={data.destination} onChange={(e) => set("destination", e.target.value)} placeholder="Flat / street / city" /></Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Moving Date"><Input type="date" value={data.date} onChange={(e) => set("date", e.target.value)} /></Field>
                      <Field label="House Size">
                        <Select value={data.houseSize} onValueChange={(v) => set("houseSize", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1bhk">1 BHK</SelectItem>
                            <SelectItem value="2bhk">2 BHK</SelectItem>
                            <SelectItem value="3bhk">3 BHK</SelectItem>
                            <SelectItem value="4bhk">4+ BHK / Villa</SelectItem>
                            <SelectItem value="office">Office</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="grid gap-4">
                    <Field label="Service Type">
                      <Select value={data.service} onValueChange={(v) => set("service", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House Shifting</SelectItem>
                          <SelectItem value="office">Office Relocation</SelectItem>
                          <SelectItem value="vehicle">Vehicle Transport</SelectItem>
                          <SelectItem value="storage">Storage / Warehouse</SelectItem>
                          <SelectItem value="packing">Packing Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Additional Notes">
                      <Textarea value={data.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Fragile items, parking, lift, special requests…" rows={4} />
                    </Field>
                  </div>
                )}
              </div>
              

              <div className="mt-8 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                {step < 2 ? (
                  <Button className="gradient-primary text-primary-foreground" onClick={() => setStep((s) => Math.min(2, s + 1))}>
                    Next <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="gradient-accent text-accent-foreground shadow-accent" onClick={submit}>
                    Submit Request <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Contact", "Move Details", "Service"];
  return (
    <div className="flex items-center gap-2">
      {labels.map((l, i) => (
        <div key={l} className="flex flex-1 items-center gap-2">
          <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition ${i <= step ? "gradient-primary text-primary-foreground shadow-elegant" : "bg-secondary text-muted-foreground"}`}>
            {i + 1}
          </div>
          <span className={`hidden text-sm font-semibold sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{l}</span>
          {i < labels.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
        </div>
      ))}
    </div>
  );
}
