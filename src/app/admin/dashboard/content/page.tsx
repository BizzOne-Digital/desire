import { AdminShell } from "@/components/admin-shell";
import { galleryItems, pricingPlans, services, siteConfig, testimonials } from "@/lib/content";

const sections = [
  "Business name",
  "Logo and favicon",
  "Hero headline and text",
  "CTA labels",
  "About content",
  "Services",
  "Pricing",
  "Testimonials",
  "Gallery",
  "Contact details",
  "Footer content",
  "Policies",
  "Brand colors",
  "Homepage sections"
];

export default function AdminContentPage() {
  return (
    <AdminShell title="Website Content">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="glass-panel rounded-[1.8rem] p-6">
          <h2 className="font-serif text-4xl text-ivory">Editable Areas</h2>
          <div className="mt-5 grid gap-3">
            {sections.map((section) => (
              <div key={section} className="rounded-2xl border border-champagne/12 p-4 text-sm text-ivory/70">
                {section}
              </div>
            ))}
          </div>
        </section>
        <form className="glass-panel grid gap-4 rounded-[1.8rem] p-6">
          <h2 className="font-serif text-4xl text-ivory">Homepage Editor</h2>
          <input className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3" defaultValue={siteConfig.businessName} />
          <input className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3" defaultValue="Designed to Make You Feel Extraordinary." />
          <textarea className="min-h-24 rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3" defaultValue="Discover a refined collection created for confidence, comfort, and timeless expression." />
          <input className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3" defaultValue="Shop Collection" />
          <input className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3" defaultValue="Explore Brand" />
          <textarea className="min-h-24 rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3" defaultValue="Helping people feel good through thoughtfully selected products and an elevated shopping experience." />
          <button className="rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black">
            Save Content
          </button>
          <p className="text-xs leading-6 text-ivory/48">
            This page maps to the SiteSettings and PageContent models. Connect the form to `/api/admin/settings` or page content routes to persist content edits.
          </p>
        </form>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Panel title="Services" value={`${services.length} editable services`} />
        <Panel title="Pricing" value={`${pricingPlans.length} editable pricing cards`} />
        <Panel title="Testimonials" value={`${testimonials.length} editable testimonials`} />
        <Panel title="Gallery" value={`${galleryItems.length} editable gallery items`} />
      </div>
    </AdminShell>
  );
}

function Panel({ title, value }: { title: string; value: string }) {
  return (
    <div className="glass-panel rounded-[1.6rem] p-6">
      <h3 className="font-serif text-3xl text-ivory">{title}</h3>
      <p className="mt-3 text-sm text-ivory/62">{value}</p>
    </div>
  );
}
