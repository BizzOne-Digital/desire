import { AdminPasswordForm, AdminSettingsForm } from "@/components/admin-settings-form";
import { AdminShell } from "@/components/admin-shell";
import { hasDatabase } from "@/lib/db";
import { getSiteSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  const social = settings.socialLinks ?? { instagram: "", facebook: "", tiktok: "", pinterest: "" };

  return (
    <AdminShell title="Admin Settings">
      <div className="grid gap-6">
        <AdminSettingsForm
          databaseEnabled={hasDatabase}
          initial={{
            businessName: settings.businessName ?? "",
            email: settings.email ?? "",
            phone: settings.phone ?? "",
            address: settings.address ?? "",
            businessHours: settings.businessHours ?? "",
            logoUrl: settings.logoUrl ?? "",
            description: settings.description ?? "",
            socialLinks: {
              instagram: social.instagram ?? "",
              facebook: social.facebook ?? "",
              tiktok: social.tiktok ?? "",
              pinterest: social.pinterest ?? ""
            }
          }}
        />
        <AdminPasswordForm />
      </div>
    </AdminShell>
  );
}
