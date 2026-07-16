"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import type { Catalog, CatalogCategory } from "@/lib/catalogs";
import { slugify } from "@/lib/utils";

type EditableCatalog = Catalog & {
  key?: string;
  sortOrder?: number;
};

const fieldClass =
  "rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3 text-sm text-ivory";

export function AdminCategoryManager({
  initialCategories,
  databaseEnabled,
}: {
  initialCategories: EditableCatalog[];
  databaseEnabled: boolean;
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [editing, setEditing] = useState<EditableCatalog | null>(null);

  async function remove(category: EditableCatalog) {
    if (!category.id || !databaseEnabled) {
      toast.error("Connect MongoDB to persist catalog deletes.");
      return;
    }

    const response = await fetch(`/api/admin/categories?id=${category.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      toast.error("Catalog could not be deleted.");
      return;
    }

    setCategories((current) =>
      current.filter((item) => item.id !== category.id),
    );
    if (editing?.id === category.id) {
      setEditing(null);
    }
    toast.success("Catalog deleted.");
  }

  return (
    <div
      className={editing ? "grid gap-6 lg:grid-cols-[1fr_420px]" : "grid gap-6"}
    >
      <section>
        <div className="mb-5 flex justify-end">
          <button
            onClick={() => setEditing(emptyCatalog)}
            className="rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black"
          >
            Add Category
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.id}
              className="glass-panel overflow-hidden rounded-[1.8rem]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={category.image || "/pages/shop-hero.png"}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="font-serif text-3xl text-ivory">
                  {category.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ivory/62">
                  {category.description}
                </p>
                <p className="mt-3 break-all text-xs text-champagne/75">
                  {category.url}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-champagne/25 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ivory/60">
                    {category.category}
                  </span>
                  {category.requiresPassword && (
                    <span className="rounded-full bg-champagne px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-black">
                      Code: {category.accessCode}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex gap-3">
                  <button
                    className="text-sm text-champagne"
                    onClick={() => setEditing(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-300"
                    onClick={() => remove(category)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {editing && (
        <CategoryForm
          key={editing.id || "new-category"}
          category={editing}
          databaseEnabled={databaseEnabled}
          onCancel={() => setEditing(null)}
          onChangeName={(name) =>
            setEditing((current) => ({
              ...(current ?? emptyCatalog),
              name,
              key: slugify(name),
            }))
          }
          onSaved={(saved) => {
            setCategories((current) => {
              const exists = current.some((item) => item.id === saved.id);
              return exists
                ? current.map((item) => (item.id === saved.id ? saved : item))
                : [...current, saved];
            });
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function CategoryForm({
  category,
  databaseEnabled,
  onCancel,
  onChangeName,
  onSaved,
}: {
  category: EditableCatalog;
  databaseEnabled: boolean;
  onCancel: () => void;
  onChangeName: (name: string) => void;
  onSaved: (category: EditableCatalog) => void;
}) {
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name")),
      key: String(form.get("key")),
      description: String(form.get("description")),
      url: String(form.get("url")),
      category: String(form.get("category")) as CatalogCategory,
      image: String(form.get("image")),
      accessCode: String(form.get("accessCode")),
      requiresPassword: form.get("requiresPassword") === "on",
      featured: form.get("featured") === "on",
      sortOrder: Number(form.get("sortOrder") || 0),
    };

    if (!databaseEnabled) {
      toast.error("Connect MongoDB to persist catalog category changes.");
      return;
    }

    const response = await fetch(
      category.id
        ? `/api/admin/categories?id=${category.id}`
        : "/api/admin/categories",
      {
        method: category.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Catalog could not be saved.");
      return;
    }

    toast.success("Catalog saved.");
    onSaved({ id: data.catalog.id, ...payload });
  }

  return (
    <form
      onSubmit={submit}
      className="glass-panel grid h-fit gap-4 rounded-[1.8rem] p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-serif text-4xl text-ivory">
          {category.id ? "Edit Catalog" : "Add Category"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-ivory/55 transition hover:text-champagne"
        >
          Cancel
        </button>
      </div>
      <input
        name="name"
        className={fieldClass}
        placeholder="Category name"
        value={category.name}
        onChange={(event) => onChangeName(event.target.value)}
      />
      <input
        name="key"
        className={fieldClass}
        placeholder="Catalog key"
        defaultValue={category.key ?? category.id}
      />
      <select
        name="category"
        className={fieldClass}
        defaultValue={category.category}
      >
        <option value="Shoes">Shoes</option>
        <option value="Bags">Bags</option>
        <option value="Clothing">Clothing</option>
        <option value="Accessories">Accessories</option>
      </select>
      <textarea
        name="description"
        className={`${fieldClass} min-h-28`}
        placeholder="Description"
        defaultValue={category.description}
      />
      <input
        name="url"
        className={fieldClass}
        placeholder="Catalog link (https://...)"
        defaultValue={category.url}
      />
      <input
        name="image"
        className={fieldClass}
        placeholder="Image URL or media item"
        defaultValue={category.image}
      />
      <input
        name="accessCode"
        className={fieldClass}
        placeholder="Access code (optional)"
        defaultValue={category.accessCode}
      />
      <input
        name="sortOrder"
        className={fieldClass}
        placeholder="Sort order"
        type="number"
        defaultValue={category.sortOrder ?? 0}
      />
      <div className="grid gap-2 text-sm text-ivory/70">
        <label>
          <input
            name="requiresPassword"
            type="checkbox"
            defaultChecked={category.requiresPassword}
          />{" "}
          Password required
        </label>
        <label>
          <input
            name="featured"
            type="checkbox"
            defaultChecked={category.featured}
          />{" "}
          Feature on homepage
        </label>
      </div>
      <button className="rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black">
        Save Catalog
      </button>
    </form>
  );
}

const emptyCatalog: EditableCatalog = {
  id: "",
  key: "",
  name: "",
  description: "",
  url: "",
  category: "Accessories",
  image: "/pages/shop-hero.png",
  sortOrder: 0,
};
