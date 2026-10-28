"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AdminImageField } from "@/components/admin-image-field";

const fieldClass = "w-full rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3 text-sm text-ivory";
const buttonClass =
  "rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black disabled:opacity-50";

export type SettingsValues = {
  businessName: string;
  email: string;
  phone: string;
  address: string;
  businessHours: string;
  logoUrl: string;
  description: string;
  socialLinks: { instagram: string; facebook: string; tiktok: string; pinterest: string };
};

export function AdminSettingsForm({
  initial,
  databaseEnabled
}: {
  initial: SettingsValues;
  databaseEnabled: boolean;
}) {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof SettingsValues>(key: K, value: SettingsValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!databaseEnabled) {
      toast.error("Connect MongoDB (DATABASE_URL) to save settings.");
      return;
    }
    setSaving(true);
    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const data = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) {
      toast.error(data.error || "Settings could not be saved.");
      return;
    }
    setValues((current) => ({ ...current, logoUrl: data.settings.logoUrl }));
    toast.success("Settings saved. The live site is updated.");
  }

  return (
    <form onSubmit={save} className="glass-panel grid gap-6 rounded-[1.8rem] p-6">
      <h2 className="font-serif text-4xl text-ivory">Business Details</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Business name">
          <input className={fieldClass} value={values.businessName} onChange={(e) => set("businessName", e.target.value)} />
        </Field>
        <Field label="Contact email">
          <input className={fieldClass} type="email" value={values.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label="Phone">
          <input className={fieldClass} value={values.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label="Business hours (hidden until entered)">
          <input
            className={fieldClass}
            value={values.businessHours}
            onChange={(e) => set("businessHours", e.target.value)}
          />
        </Field>
        <Field label="Address (hidden until entered)" wide>
          <input className={fieldClass} value={values.address} onChange={(e) => set("address", e.target.value)} />
        </Field>
        <Field label="Short site description" wide>
          <textarea
            className={`${fieldClass} min-h-24`}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>
        <AdminImageField
          className="md:col-span-2"
          label="Logo (header, footer, favicon)"
          value={values.logoUrl}
          folder="misc"
          onChange={(url) => set("logoUrl", url)}
        />
      </div>

      <h2 className="font-serif text-4xl text-ivory">Social Links</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {(["instagram", "facebook", "tiktok", "pinterest"] as const).map((network) => (
          <Field key={network} label={`${network[0].toUpperCase()}${network.slice(1)} URL`}>
            <input
              className={fieldClass}
              value={values.socialLinks[network]}
              onChange={(e) => set("socialLinks", { ...values.socialLinks, [network]: e.target.value })}
            />
          </Field>
        ))}
      </div>

      <div>
        <button disabled={saving} className={buttonClass}>
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}

export function AdminPasswordForm() {
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("newPassword") !== data.get("confirmPassword")) {
      toast.error("New passwords do not match.");
      return;
    }
    setSaving(true);
    const response = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: data.get("currentPassword"),
        newPassword: data.get("newPassword")
      })
    });
    const result = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) {
      toast.error(result.error || "Password could not be changed.");
      return;
    }
    form.reset();
    toast.success("Password changed.");
  }

  return (
    <form onSubmit={submit} className="glass-panel grid gap-4 rounded-[1.8rem] p-6">
      <h2 className="font-serif text-4xl text-ivory">Change Password</h2>
      <input className={fieldClass} name="currentPassword" type="password" placeholder="Current password" required />
      <input
        className={fieldClass}
        name="newPassword"
        type="password"
        placeholder="New password (min. 10 characters)"
        minLength={10}
        required
      />
      <input className={fieldClass} name="confirmPassword" type="password" placeholder="Confirm new password" required />
      <div>
        <button disabled={saving} className={buttonClass}>
          {saving ? "Saving..." : "Change Password"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={`grid gap-2 ${wide ? "md:col-span-2" : ""}`}>
      <span className="text-xs uppercase tracking-[0.18em] text-champagne/80">{label}</span>
      {children}
    </label>
  );
}
