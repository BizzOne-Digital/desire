"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Product } from "@/lib/content";
import { slugify } from "@/lib/utils";

const fieldClass = "rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3 text-sm text-ivory";

export function AdminProductManager({
  initialProducts,
  databaseEnabled
}: {
  initialProducts: Product[];
  databaseEnabled: boolean;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );

  function duplicate(product: Product) {
    setEditing({
      ...product,
      id: "",
      title: `${product.title} Copy`,
      slug: `${product.slug}-copy`,
      sku: `${product.sku}-COPY`
    });
  }

  async function remove(product: Product) {
    if (!databaseEnabled) {
      toast.error("Connect MongoDB to persist deletes.");
      return;
    }
    const response = await fetch(`/api/admin/products?id=${product.id}`, { method: "DELETE" });
    if (!response.ok) {
      toast.error("Product could not be deleted.");
      return;
    }
    setProducts((current) => current.filter((item) => item.id !== product.id));
    toast.success("Product deleted.");
  }

  return (
    <div className={editing ? "grid gap-8 lg:grid-cols-[1fr_430px]" : "grid gap-8"}>
      <section className="glass-panel rounded-[1.8rem] p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            className={fieldClass}
            placeholder="Search products..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            onClick={() => setEditing(emptyProduct)}
            className="rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black"
          >
            Add Product
          </button>
        </div>
        <div className="overflow-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.22em] text-champagne">
              <tr>
                <th className="py-3">Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-ivory/70">
              {filtered.map((product) => (
                <tr key={product.id || product.slug}>
                  <td className="py-4 text-ivory">{product.title}</td>
                  <td>{product.category}</td>
                  <td>${product.salePrice ?? product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.featured ? "Featured" : "Active"}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="text-champagne" onClick={() => setEditing(product)}>Edit</button>
                      <button className="text-champagne" onClick={() => duplicate(product)}>Duplicate</button>
                      <button className="text-red-300" onClick={() => remove(product)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {editing && (
        <ProductForm
          key={editing.id || "new-product"}
          product={editing}
          databaseEnabled={databaseEnabled}
          onCancel={() => setEditing(null)}
          onChangeTitle={(title) => setEditing((current) => ({ ...(current ?? emptyProduct), title, slug: slugify(title) }))}
          onSaved={(saved) => {
            setProducts((current) => {
              const exists = current.some((item) => item.id === saved.id);
              return exists ? current.map((item) => (item.id === saved.id ? saved : item)) : [saved, ...current];
            });
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function ProductForm({
  product,
  databaseEnabled,
  onSaved,
  onCancel,
  onChangeTitle
}: {
  product: Product;
  databaseEnabled: boolean;
  onSaved: (product: Product) => void;
  onCancel: () => void;
  onChangeTitle: (title: string) => void;
}) {
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const salePriceValue = form.get("salePrice") ? Number(form.get("salePrice")) : undefined;
    const payload = {
      title: String(form.get("title")),
      slug: String(form.get("slug")),
      description: String(form.get("description")),
      price: Number(form.get("price")),
      salePrice: salePriceValue,
      sku: String(form.get("sku")),
      stock: Number(form.get("stock")),
      status: "ACTIVE",
      tags: String(form.get("tags")).split(",").map((tag) => tag.trim()).filter(Boolean),
      featured: form.get("featured") === "on",
      isNew: form.get("isNew") === "on",
      bestSeller: form.get("bestSeller") === "on",
      seoTitle: String(form.get("seoTitle")),
      seoDescription: String(form.get("seoDescription")),
      images: String(form.get("images")).split("\n").map((url) => url.trim()).filter(Boolean).map((url) => ({ url, alt: String(form.get("title")) }))
    };

    if (!databaseEnabled) {
      toast.error("Connect MongoDB to persist product changes. The form is ready.");
      return;
    }

    const response = await fetch(product.id ? `/api/admin/products?id=${product.id}` : "/api/admin/products", {
      method: product.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Product could not be saved.");
      return;
    }
    toast.success("Product saved.");
    onSaved({
      ...product,
      ...payload,
      id: data.product.id,
      category: product.category || "Collection",
      images: payload.images.map((image) => image.url),
      variants: product.variants,
      details: product.details,
      popularity: product.popularity
    });
  }

  return (
    <form onSubmit={submit} className="glass-panel grid h-fit gap-4 rounded-[1.8rem] p-6">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-serif text-4xl text-ivory">{product.id ? "Edit Product" : "Add Product"}</h2>
        <button type="button" onClick={onCancel} className="text-sm text-ivory/55 transition hover:text-champagne">
          Cancel
        </button>
      </div>
      <input name="title" className={fieldClass} placeholder="Title" value={product.title} onChange={(event) => onChangeTitle(event.target.value)} />
      <input name="slug" className={fieldClass} placeholder="Slug" value={product.slug} onChange={() => undefined} readOnly />
      <textarea name="description" className={`${fieldClass} min-h-28`} placeholder="Description" defaultValue={product.description} />
      <div className="grid grid-cols-2 gap-3">
        <input name="price" type="number" step="0.01" className={fieldClass} placeholder="Price" defaultValue={product.price} />
        <input name="salePrice" type="number" step="0.01" className={fieldClass} placeholder="Sale price" defaultValue={product.salePrice} />
        <input name="sku" className={fieldClass} placeholder="SKU" defaultValue={product.sku} />
        <input name="stock" type="number" className={fieldClass} placeholder="Stock" defaultValue={product.stock} />
      </div>
      <input name="tags" className={fieldClass} placeholder="Tags comma separated" defaultValue={product.tags.join(", ")} />
      <textarea name="images" className={`${fieldClass} min-h-28`} placeholder="One image URL per line" defaultValue={product.images.join("\n")} />
      <input name="seoTitle" className={fieldClass} placeholder="SEO title" />
      <textarea name="seoDescription" className={fieldClass} placeholder="SEO description" />
      <div className="grid gap-2 text-sm text-ivory/70">
        <label><input name="featured" type="checkbox" defaultChecked={product.featured} /> Featured</label>
        <label><input name="isNew" type="checkbox" defaultChecked={product.isNew} /> New</label>
        <label><input name="bestSeller" type="checkbox" defaultChecked={product.bestSeller} /> Best seller</label>
      </div>
      <button className="rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black">
        Save Product
      </button>
    </form>
  );
}

const emptyProduct: Product = {
  id: "",
  title: "",
  slug: "",
  category: "Collection",
  description: "",
  price: 0,
  sku: "",
  stock: 0,
  tags: [],
  featured: false,
  images: [],
  variants: [],
  details: [],
  popularity: 0
};
