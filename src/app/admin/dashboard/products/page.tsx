import { AdminProductManager } from "@/components/admin-product-manager";
import { AdminShell } from "@/components/admin-shell";
import { hasDatabase } from "@/lib/db";
import { getProducts } from "@/lib/store";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <AdminShell title="Product Management">
      <AdminProductManager initialProducts={products} databaseEnabled={hasDatabase} />
    </AdminShell>
  );
}
