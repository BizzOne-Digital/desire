import { AdminCategoryManager } from "@/components/admin-category-manager";
import { AdminShell } from "@/components/admin-shell";
import { hasDatabase } from "@/lib/db";
import { getCategories } from "@/lib/store";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <AdminShell title="Category Management">
      <AdminCategoryManager initialCategories={categories} databaseEnabled={hasDatabase} />
    </AdminShell>
  );
}
