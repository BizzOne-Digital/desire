import { AdminContentEditor } from "@/components/admin-content-editor";
import { AdminShell } from "@/components/admin-shell";
import { readListForAdmin, readStoredContent } from "@/lib/content-store";
import { hasDatabase } from "@/lib/db";
import type { Catalog } from "@/lib/catalogs";
import type { GalleryItem, Service } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const [stored, services, gallery, catalogs] = await Promise.all([
    readStoredContent(),
    readListForAdmin("services"),
    readListForAdmin("gallery"),
    readListForAdmin("catalogs")
  ]);

  return (
    <AdminShell title="Website Content">
      <p className="mb-6 max-w-3xl text-sm leading-7 text-ivory/60">
        Edit the text and images of every page, plus the Services, Gallery and Catalogs lists. Pick a tab, make your
        changes, and press Save. The live site updates immediately.
      </p>
      <AdminContentEditor
        databaseEnabled={hasDatabase}
        storedFields={stored.fields}
        services={services as Service[]}
        gallery={gallery as GalleryItem[]}
        catalogs={catalogs as Catalog[]}
      />
    </AdminShell>
  );
}
