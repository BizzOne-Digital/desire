import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin-logout-button";

const adminLinks = [
  ["Overview", "/admin/dashboard"],
  ["Products", "/admin/dashboard/products"],
  ["Categories", "/admin/dashboard/categories"],
  ["Orders", "/admin/dashboard/orders"],
  ["Content", "/admin/dashboard/content"],
  ["Media", "/admin/dashboard/media"],
  ["Settings", "/admin/dashboard/settings"]
];

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="luxury-container py-32">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-champagne">Admin Dashboard</p>
          <h1 className="mt-3 font-serif text-5xl text-ivory md:text-7xl">{title}</h1>
        </div>
        <AdminLogoutButton />
      </div>
      <div className="mb-8 flex gap-3 overflow-auto rounded-full border border-champagne/12 bg-black/35 p-2 no-scrollbar">
        {adminLinks.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="shrink-0 rounded-full px-5 py-2 text-sm text-ivory/65 transition hover:bg-champagne hover:text-black"
          >
            {label}
          </Link>
        ))}
      </div>
      {children}
    </section>
  );
}
