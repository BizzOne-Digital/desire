import { AdminShell } from "@/components/admin-shell";
import { categories, galleryItems, services } from "@/lib/content";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";

export default async function AdminDashboardPage() {
  const contactCount = hasDatabase
    ? await (await getMongoDb()).collection("ContactMessage").countDocuments()
    : 0;

  return (
    <AdminShell title="Overview">
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Categories" value={categories.length} />
        <Metric label="Services" value={services.length} />
        <Metric label="Gallery items" value={galleryItems.length} />
        <Metric label="Contact messages" value={contactCount} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Website Focus">
          <p className="text-ivory/62">
            Manage categories, media, and content while keeping the public site
            focused on the ONLY COLLECTION brand experience.
          </p>
        </Panel>
        <Panel title="Basic Traffic Overview">
          <p className="text-ivory/62">
            Analytics-ready panel. Connect Plausible, Google Analytics, or
            another provider to populate live traffic.
          </p>
        </Panel>
        <Panel title="Content">
          <p className="text-ivory/62">
            Use Categories for collection cards and Content for homepage copy
            guidance.
          </p>
        </Panel>
        <Panel title="Launch Checklist">
          <ul className="grid gap-2 text-sm text-ivory/68">
            <li>Configure MongoDB so category and contact data persist.</li>
            <li>Upload final logo to public/logo.png or media library.</li>
            <li>Review policy copy before launch.</li>
            <li>Confirm contact details and support responses.</li>
          </ul>
        </Panel>
      </div>
    </AdminShell>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass-panel rounded-[1.6rem] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-champagne">
        {label}
      </p>
      <p className="mt-4 font-serif text-5xl text-ivory">{value}</p>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel rounded-[1.6rem] p-6">
      <h2 className="font-serif text-3xl text-ivory">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
