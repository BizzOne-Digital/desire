import { AdminShell } from "@/components/admin-shell";
import { getCatalogs } from "@/lib/catalog-store";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";

export default async function AdminDashboardPage() {
  const catalogs = await getCatalogs();
  const inquiries = hasDatabase
    ? await (await getMongoDb()).collection("ProductInquiry").countDocuments()
    : 0;
  const protectedCatalogs = catalogs.filter(
    (catalog) => catalog.requiresPassword,
  ).length;
  const featuredCatalogs = catalogs.filter(
    (catalog) => catalog.featured,
  ).length;

  return (
    <AdminShell title="Overview">
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Catalogs" value={catalogs.length} />
        <Metric label="Product inquiries" value={inquiries} />
        <Metric label="Password catalogs" value={protectedCatalogs} />
        <Metric label="Featured catalogs" value={featuredCatalogs} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Inquiry Workflow">
          <p className="text-ivory/62">
            Customers browse external catalogs, copy the product link or code,
            then submit a product inquiry for confirmation.
          </p>
        </Panel>
        <Panel title="Basic Traffic Overview">
          <p className="text-ivory/62">
            Analytics-ready panel. Connect Plausible, Google Analytics, or
            another provider to populate live traffic.
          </p>
        </Panel>
        <Panel title="Catalog Management">
          <p className="text-ivory/62">
            Use Categories to add, edit, delete, or update external catalog
            links and access codes.
          </p>
        </Panel>
        <Panel title="Launch Checklist">
          <ul className="grid gap-2 text-sm text-ivory/68">
            <li>Configure MongoDB so catalog edits and inquiries persist.</li>
            <li>Upload final logo to public/logo.png or media library.</li>
            <li>Review external catalog links and public access codes.</li>
            <li>
              Confirm inquiry delivery process before accepting customer
              requests.
            </li>
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
    <section className="glass-panel rounded-[1.6rem] p-6">
      <h2 className="font-serif text-3xl text-ivory">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
