import { useState } from "react";
import { Link } from "@tanstack/react-router";
import "@/components/ui/Gallery.css";

type Category =
  | "packing"
  | "loading"
  | "warehouse"
  | "office"
  | "furniture"
  | "vehicle";

interface GalleryItem {
  id: string;
  category: Category;
  image: string;
  alt: string;
  title: string;
  caption: string;
  icon: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "packing-1", category: "packing", image: "", alt: "Crew packing household items", title: "Kitchen Packing", caption: "Multi-layer packing with bubble wrap and corrugated sheets", icon: "📦" },
  { id: "packing-2", category: "packing", image: "", alt: "Fragile items being wrapped", title: "Fragile Item Wrapping", caption: "Fragile items wrapped and boxed with extra care", icon: "📦" },
  { id: "loading-1", category: "loading", image: "", alt: "Crew loading truck with hydraulic lift", title: "Truck Loading", caption: "Trained crew loading with hydraulic tools", icon: "🚚" },
  { id: "warehouse-1", category: "warehouse", image: "", alt: "Warehouse storage facility with CCTV", title: "Warehouse Storage", caption: "Secure, CCTV-monitored warehouse storage", icon: "🏬" },
  { id: "office-1", category: "office", image: "", alt: "Office desks and equipment being relocated", title: "Office Relocation", caption: "Office relocation handled with minimal downtime", icon: "🏢" },
  { id: "furniture-1", category: "furniture", image: "", alt: "Furniture wrapped for transport", title: "Furniture Handling", caption: "Furniture dismantled, wrapped and reassembled safely", icon: "🛋️" },
  { id: "vehicle-1", category: "vehicle", image: "", alt: "Vehicle being loaded for transport", title: "Vehicle Transport", caption: "Safe, insured vehicle transport across cities", icon: "🚗" },
  { id: "loading-2", category: "loading", image: "", alt: "Truck ready for GPS-tracked transit", title: "GPS-Tracked Transit", caption: "GPS-tracked, insured transit from door to door", icon: "📍" },
];

const FILTERS: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Packing", value: "packing" },
  { label: "Loading", value: "loading" },
  { label: "Warehouse", value: "warehouse" },
  { label: "Office Move", value: "office" },
  { label: "Furniture", value: "furniture" },
  { label: "Vehicle Transport", value: "vehicle" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const visibleItems =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <Link className="brand" to="/">
          Bhati<span>Packers &amp; Movers</span>
        </Link>
        <nav>
          <Link to="/">← Back to site</Link>
          <Link to="/#quote">Get Free Quote</Link>
        </nav>
      </header>

      <section className="gallery-hero">
        <div className="eyebrow">Our Work</div>
        <h1>A glimpse of every move we handle</h1>
        <p>From compact studio moves to full office relocations — real jobs, real care, every single time.</p>
      </section>

      <div className="filters">
        {FILTERS.map((f) => (
          <button key={f.value} className={`filter-btn ${activeFilter === f.value ? "active" : ""}`} onClick={() => setActiveFilter(f.value)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {visibleItems.map((item) => (
          <div className="card" key={item.id} onClick={() => setSelected(item)}>
            <div className="thumb">
              {item.image ? (
                <img src={item.image} alt={item.alt} loading="lazy" />
              ) : (
                <>
                  <span className="placeholder-icon">{item.icon}</span>
                  <span>Add photo for "{item.title}"</span>
                </>
              )}
            </div>
            <div className="caption">
              <span className="title">{item.title}</span>
              <span className="tag">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="cta-strip">
        <h2>Ready to plan your move?</h2>
        <p>Get a free quote — we'll call you back within 15 minutes.</p>
        <div className="cta-buttons">
          <Link className="btn btn-amber" to="/#quote">Get Free Quote</Link>
          <a className="btn btn-outline" href="https://wa.me/917023568588?text=Hi%20Bhati%20Packers%20%26%20Movers%2C%20I%20need%20a%20quote.">Chat on WhatsApp</a>
        </div>
      </section>

      <footer className="gallery-footer">© 2026 Bhati Packers &amp; Movers. All rights reserved.</footer>

      {selected && (
        <div className="lightbox-overlay" onClick={() => setSelected(null)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setSelected(null)}>&times;</button>
            {selected.image ? <img src={selected.image} alt={selected.alt} /> : <p style={{ color: "#fff" }}>No photo added yet.</p>}
            <p className="lb-caption">{selected.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}