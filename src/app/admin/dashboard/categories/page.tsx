import { AdminCategoryManager } from "@/components/admin-category-manager";
import { AdminShell } from "@/components/admin-shell";
import { getCatalogs } from "@/lib/catalog-store";
import { hasDatabase } from "@/lib/db";

export default async function AdminCategoriesPage() {
  const categories = await getCatalogs();

  return (
    <AdminShell title="Catalog Category Management">
      <AdminCategoryManager
        initialCategories={categories}
        databaseEnabled={hasDatabase}
      />
    </AdminShell>
  );
}
