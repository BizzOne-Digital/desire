import { AdminShell } from "@/components/admin-shell";
import { siteConfig } from "@/lib/content";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Admin Settings">
      <div className="grid gap-6 lg:grid-cols-2">
        <SettingsPanel title="Business Details">
          <input defaultValue={siteConfig.businessName} placeholder="Business name" />
          <input defaultValue={siteConfig.email} placeholder="Notification email" />
          <input defaultValue={siteConfig.phone} placeholder="Phone" />
          <input placeholder="Address (hidden until entered)" />
          <input placeholder="Business hours (hidden until entered)" />
        </SettingsPanel>
        <SettingsPanel title="Brand Settings">
          <input defaultValue="/logo.png" placeholder="Logo URL" />
          <input placeholder="Favicon URL" />
          <input defaultValue="#050505" placeholder="Black color" />
          <input defaultValue="#D7B56D" placeholder="Gold color" />
          <input defaultValue="CAD" placeholder="Currency" />
        </SettingsPanel>
        <SettingsPanel title="Commerce Settings">
          <input placeholder="Tax rate" />
          <input placeholder="Free shipping threshold" />
          <input placeholder="Flat shipping rate" />
          <input placeholder="Stripe publishable key" />
          <input placeholder="Payment mode" />
        </SettingsPanel>
        <SettingsPanel title="Security">
          <input type="password" placeholder="Current password" />
          <input type="password" placeholder="New password" />
          <input type="password" placeholder="Confirm password" />
          <p className="text-xs leading-6 text-ivory/48">
            Password changes should hash with bcrypt and update AdminUser. Session cookies are signed and HTTP-only.
          </p>
        </SettingsPanel>
        <SettingsPanel title="SEO Defaults">
          <input defaultValue="ONLY COLLECTION | Luxury Online Boutique" placeholder="Default SEO title" />
          <textarea defaultValue={siteConfig.description} placeholder="Default meta description" />
          <input placeholder="Canonical domain" defaultValue="http://localhost:3000" />
        </SettingsPanel>
        <SettingsPanel title="Social Links">
          <input placeholder="Instagram URL" />
          <input placeholder="Facebook URL" />
          <input placeholder="TikTok URL" />
          <input placeholder="Pinterest URL" />
          <p className="text-xs leading-6 text-ivory/48">
            Empty social links are hidden automatically in the public footer/header.
          </p>
        </SettingsPanel>
      </div>
    </AdminShell>
  );
}

function SettingsPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <form className="glass-panel grid gap-4 rounded-[1.8rem] p-6">
      <h2 className="font-serif text-4xl text-ivory">{title}</h2>
      <div className="grid gap-3 [&_input]:rounded-2xl [&_input]:border [&_input]:border-champagne/15 [&_input]:bg-black/35 [&_input]:px-4 [&_input]:py-3 [&_textarea]:min-h-28 [&_textarea]:rounded-2xl [&_textarea]:border [&_textarea]:border-champagne/15 [&_textarea]:bg-black/35 [&_textarea]:px-4 [&_textarea]:py-3">
        {children}
      </div>
      <button className="rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black">
        Save
      </button>
    </form>
  );
}
