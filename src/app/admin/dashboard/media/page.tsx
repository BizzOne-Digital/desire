import { AdminMediaLibrary } from "@/components/admin-media-library";
import { AdminShell } from "@/components/admin-shell";
import { hasDatabase } from "@/lib/db";

export default function AdminMediaPage() {
  return (
    <AdminShell title="Media Library">
      <AdminMediaLibrary databaseEnabled={hasDatabase} />
    </AdminShell>
  );
}
