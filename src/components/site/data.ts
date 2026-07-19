import {
  Home, Building2, MapPin, Route, Package, PackageOpen, Sofa, Warehouse,
  Users, Navigation, IndianRupee, ShieldCheck, Zap, DoorOpen, Headphones,
  BadgeCheck, PackageCheck, UserCheck, ClipboardList,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceItem = { icon: LucideIcon; title: string; desc: string };

export const services: ServiceItem[] = [
  { icon: Home, title: "House Shifting", desc: "End-to-end household relocation with professional packing and safe transport." },
  { icon: Building2, title: "Office Relocation", desc: "Move workstations, IT equipment and files with minimum downtime." },
  { icon: MapPin, title: "Local Shifting", desc: "Same-city moves handled quickly with the right size vehicle." },
  { icon: Route, title: "Intercity Moving", desc: "Cross-state moves with GPS-tracked trucks and secure packing." },
  { icon: Package, title: "Packing Services", desc: "Multi-layer packing using bubble wrap, corrugated sheets and cartons." },
  { icon: PackageOpen, title: "Loading & Unloading", desc: "Trained crew, hydraulic tools and lift-friendly handling." },
  { icon: Sofa, title: "Furniture Shifting", desc: "Dismantle, wrap, transport and reassemble large furniture safely." },
  { icon: Warehouse, title: "Warehouse & Storage", desc: "Short & long-term warehousing with 24/7 CCTV monitoring." },
];

export type WhyItem = { icon: LucideIcon; title: string };
export const whyItems: WhyItem[] = [
  { icon: Users, title: "Professional Team" },
  { icon: Navigation, title: "GPS Tracking" },
  { icon: IndianRupee, title: "Affordable Pricing" },
  { icon: Package, title: "High-Quality Packing" },
  { icon: ShieldCheck, title: "Fully Insured" },
  { icon: Zap, title: "Fast Delivery" },
  { icon: DoorOpen, title: "Door-to-Door Service" },
  { icon: Headphones, title: "24/7 Support" },
  { icon: BadgeCheck, title: "No Hidden Charges" },
  { icon: UserCheck, title: "Verified Staff" },
  { icon: PackageCheck, title: "Damage-Free Delivery" },
  { icon: ClipboardList, title: "Transparent Process" },
];
