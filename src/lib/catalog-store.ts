import { catalogs, type Catalog, type CatalogCategory } from "@/lib/catalogs";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";

type CatalogDocument = Omit<Catalog, "id"> & {
  _id?: { toString(): string };
  key?: string;
  sortOrder?: number;
  disabled?: boolean;
};

function serializeCatalog(
  document: CatalogDocument,
): Catalog & { key?: string; sortOrder?: number } {
  return {
    id:
      document._id?.toString() ??
      document.key ??
      document.name.toLowerCase().replace(/\s+/g, "-"),
    key: document.key,
    name: document.name,
    description: document.description,
    url: document.url,
    accessCode: document.accessCode,
    requiresPassword: document.requiresPassword,
    category: document.category as CatalogCategory,
    image: document.image,
    featured: document.featured,
    sortOrder: document.sortOrder,
  };
}

export async function getCatalogs(): Promise<
  Array<Catalog & { key?: string; sortOrder?: number }>
> {
  if (!hasDatabase) {
    return catalogs;
  }

  try {
    const db = await getMongoDb();
    const rows = await db
      .collection<CatalogDocument>("Catalog")
      .find()
      .sort({ sortOrder: 1, name: 1 })
      .toArray();

    if (!rows.length) {
      return catalogs;
    }

    const overrides = new Map(
      rows.filter((row) => row.key).map((row) => [row.key, row]),
    );
    const disabled = new Set(
      rows.filter((row) => row.disabled && row.key).map((row) => row.key),
    );
    const customRows = rows.filter(
      (row) => !row.key || !catalogs.some((catalog) => catalog.id === row.key),
    );

    return [
      ...catalogs
        .filter((catalog) => !disabled.has(catalog.id))
        .map((catalog, index) => {
          const override = overrides.get(catalog.id);
          return override
            ? {
                ...catalog,
                ...serializeCatalog(override),
                id: catalog.id,
                sortOrder: override.sortOrder ?? index,
              }
            : { ...catalog, sortOrder: index };
        }),
      ...customRows.filter((row) => !row.disabled).map(serializeCatalog),
    ].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  } catch {
    return catalogs;
  }
}
