import { useMemo, useState } from "react";
import { SectionHeader } from "./services";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Calculator, ArrowRight } from "lucide-react";

export function CostCalculator() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [houseType, setHouseType] = useState("apartment");
  const [bhk, setBhk] = useState("2");
  const [floor, setFloor] = useState("2");
  const [lift, setLift] = useState(true);
  const [packing, setPacking] = useState(true);
  const [storage, setStorage] = useState(false);
  const [insurance, setInsurance] = useState(true);
  const [vehicle, setVehicle] = useState("14ft");
  const [date, setDate] = useState("");

  const price = useMemo(() => {
    const bhkBase: Record<string, number> = { "1": 6000, "2": 10000, "3": 15000, "4": 22000 };
    const vehicleMult: Record<string, number> = { "tempo": 0.9, "14ft": 1.1, "17ft": 1.35, "20ft": 1.6 };
    let p = bhkBase[bhk] * vehicleMult[vehicle];
    if (houseType === "villa") p *= 1.25;
    if (!lift) p += Number(floor) * 400;
    if (packing) p += 2500;
    if (storage) p += 3000;
    if (insurance) p += Math.round(p * 0.03);
    return Math.round(p / 100) * 100;
  }, [bhk, houseType, floor, lift, packing, storage, insurance, vehicle]);

  return (
    <section id="pricing" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Instant Cost Calculator"
          title="Estimate your moving cost in real time"
          subtitle="Transparent pricing. No hidden fees. Adjust the sliders and see it update instantly."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Pickup City">
                <Input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="e.g. Jaipur" />
              </Field>
              <Field label="Destination City">
                <Input value={drop} onChange={(e) => setDrop(e.target.value)} placeholder="e.g. Bengaluru" />
              </Field>
              <Field label="House Type">
                <Select value={houseType} onValueChange={setHouseType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="independent">Independent House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="BHK Size">
                <Select value={bhk} onValueChange={setBhk}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 BHK</SelectItem>
                    <SelectItem value="2">2 BHK</SelectItem>
                    <SelectItem value="3">3 BHK</SelectItem>
                    <SelectItem value="4">4+ BHK</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Floor Number">
                <Input type="number" min={0} value={floor} onChange={(e) => setFloor(e.target.value)} />
              </Field>
              <Field label="Vehicle Type">
                <Select value={vehicle} onValueChange={setVehicle}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tempo">Mini Tempo</SelectItem>
                    <SelectItem value="14ft">14 ft Truck</SelectItem>
                    <SelectItem value="17ft">17 ft Truck</SelectItem>
                    <SelectItem value="20ft">20 ft Container</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Preferred Date">
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </Field>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Toggle label="Lift Available" checked={lift} onChange={setLift} />
              <Toggle label="Packing Needed" checked={packing} onChange={setPacking} />
              <Toggle label="Storage Needed" checked={storage} onChange={setStorage} />
              <Toggle label="Insurance" checked={insurance} onChange={setInsurance} />
            </div>
          </div>

          <div className="glass sticky top-24 self-start rounded-3xl p-6 shadow-elegant">
            <div className="flex items-center gap-2 text-primary">
              <Calculator className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-widest">Estimated Cost</span>
            </div>
            <p className="mt-2 font-display text-4xl font-bold text-gradient">
              ₹{price.toLocaleString("en-IN")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Inclusive of packing, transport & basic insurance.</p>
            <Button asChild className="mt-5 w-full gradient-accent text-accent-foreground shadow-accent hover:opacity-95">
              <a href="#quote">Book at this price <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li>✓ Multi-layer premium packing</li>
              <li>✓ Trained loading & unloading crew</li>
              <li>✓ GPS tracked transport</li>
              <li>✓ Doorstep pickup & delivery</li>
            </ul>
          </div>
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

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-3">
      <span className="text-sm font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
