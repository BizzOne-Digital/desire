import { AdminShell } from "@/components/admin-shell";
import { hasDatabase, prisma } from "@/lib/db";
import { formatMoney } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const orders = hasDatabase
    ? await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" }, take: 50 })
    : [];

  return (
    <AdminShell title="Order Management">
      <section className="glass-panel overflow-hidden rounded-[1.8rem] p-6">
        <div className="mb-5 grid gap-3 md:grid-cols-3">
          <input className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3" placeholder="Search orders..." />
          <select className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3"><option>Status</option></select>
          <select className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3"><option>Payment</option></select>
        </div>
        {orders.length ? (
          <div className="overflow-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.22em] text-champagne">
                <tr><th className="py-3">Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Payment</th><th>Shipping</th><th>Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-ivory/68">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 text-ivory">{order.orderNumber}</td>
                    <td>{order.email}</td>
                    <td>{formatMoney(Number(order.total))}</td>
                    <td>{order.status}</td>
                    <td>{order.paymentStatus}</td>
                    <td>{order.shippingStatus}</td>
                    <td><button className="text-champagne">Print Summary</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-champagne/15 p-10 text-center text-ivory/65">
            Orders will appear after checkout submissions are completed and MongoDB is connected.
          </div>
        )}
      </section>
    </AdminShell>
  );
}
