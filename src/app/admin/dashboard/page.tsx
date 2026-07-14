import { AdminShell } from "@/components/admin-shell";
import { products, testimonials } from "@/lib/content";
import { hasDatabase, prisma } from "@/lib/db";
import { formatMoney } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const stats = hasDatabase
    ? {
        products: await prisma.product.count(),
        orders: await prisma.order.count(),
        sales: Number((await prisma.order.aggregate({ _sum: { total: true } }))._sum.total ?? 0),
        lowStock: await prisma.product.count({ where: { stock: { lte: 5 } } })
      }
    : {
        products: products.length,
        orders: 0,
        sales: 0,
        lowStock: products.filter((product) => product.stock <= 5).length
      };

  return (
    <AdminShell title="Overview">
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Total products" value={stats.products} />
        <Metric label="Total orders" value={stats.orders} />
        <Metric label="Total sales" value={formatMoney(stats.sales)} />
        <Metric label="Low stock products" value={stats.lowStock} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Recent Orders">
          <p className="text-ivory/62">
            Orders appear here once checkout submissions are stored in MongoDB.
          </p>
        </Panel>
        <Panel title="Basic Traffic Overview">
          <p className="text-ivory/62">
            Analytics-ready panel. Connect Plausible, Google Analytics, or another provider to populate live traffic.
          </p>
        </Panel>
        <Panel title="Testimonials">
          <div className="grid gap-3">
            {testimonials.slice(0, 3).map((item) => (
              <p key={item.name} className="text-sm text-ivory/68">“{item.review}” — {item.name}</p>
            ))}
          </div>
        </Panel>
        <Panel title="Launch Checklist">
          <ul className="grid gap-2 text-sm text-ivory/68">
            <li>Configure MongoDB and run seed data.</li>
            <li>Upload final logo to public/logo.png or media library.</li>
            <li>Add Stripe and Cloudinary credentials.</li>
            <li>Review policy copy before launch.</li>
          </ul>
        </Panel>
      </div>
    </AdminShell>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass-panel rounded-[1.6rem] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-champagne">{label}</p>
      <p className="mt-4 font-serif text-5xl text-ivory">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass-panel rounded-[1.6rem] p-6">
      <h2 className="font-serif text-3xl text-ivory">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
