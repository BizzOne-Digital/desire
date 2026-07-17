"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import type { Category } from "@/lib/content";
import { slugify } from "@/lib/utils";

type EditableCategory = Category & {
  sortOrder?: number;
};

const fieldClass =
  "rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3 text-sm text-ivory";

export function AdminCategoryManager({
  initialCategories,
  databaseEnabled,
}: {
  initialCategories: EditableCategory[];
  databaseEnabled: boolean;
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [editing, setEditing] = useState<EditableCategory | null>(null);

  async function remove(category: EditableCategory) {
    if (!category.id || !databaseEnabled) {
      toast.error("Connect MongoDB to persist category deletes.");
      return;
    }

    const response = await fetch(`/api/admin/categories?id=${category.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      toast.error("Category could not be deleted.");
      return;
    }

    setCategories((current) =>
      current.filter((item) => item.id !== category.id),
    );
    if (editing?.id === category.id) {
      setEditing(null);
    }
    toast.success("Category deleted.");
  }

  return (
    <div className={editing ? "grid gap-6 lg:grid-cols-[1fr_420px]" : "grid gap-6"}>
      <section>
        <div className="mb-5 flex justify-end">
          <button
            onClick={() => setEditing(emptyCategory)}
            className="rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black"
          >
            Add Category
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.id || category.slug}
              className="glass-panel overflow-hidden rounded-[1.8rem]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="font-serif text-3xl text-ivory">{category.name}</h2>
                <p className="mt-2 text-sm leading-6 text-ivory/62">
                  {category.description}
                </p>
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
              ...(current ?? emptyCategory),
              name,
              slug: slugify(name),
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
  category: EditableCategory;
  databaseEnabled: boolean;
  onCancel: () => void;
  onChangeName: (name: string) => void;
  onSaved: (category: EditableCategory) => void;
}) {
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name")),
      slug: String(form.get("slug")),
      description: String(form.get("description")),
      imageUrl: String(form.get("imageUrl")),
      sortOrder: Number(form.get("sortOrder") || 0),
    };

    if (!databaseEnabled) {
      toast.error("Connect MongoDB to persist category changes.");
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
      toast.error(data.error || "Category could not be saved.");
      return;
    }

    toast.success("Category saved.");
    onSaved({ id: data.category.id, ...payload });
  }

  return (
    <form onSubmit={submit} className="glass-panel grid h-fit gap-4 rounded-[1.8rem] p-6">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-serif text-4xl text-ivory">
          {category.id ? "Edit Category" : "Add Category"}
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
        name="slug"
        className={fieldClass}
        placeholder="Slug"
        value={category.slug}
        readOnly
      />
      <textarea
        name="description"
        className={`${fieldClass} min-h-28`}
        placeholder="Description"
        defaultValue={category.description}
      />
      <input
        name="imageUrl"
        className={fieldClass}
        placeholder="Image URL or media item"
        defaultValue={category.imageUrl}
      />
      <input
        name="sortOrder"
        className={fieldClass}
        placeholder="Sort order"
        type="number"
        defaultValue={category.sortOrder ?? 0}
      />
      <button className="rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black">
        Save Category
      </button>
    </form>
  );
}

const emptyCategory: EditableCategory = {
  id: "",
  name: "",
  slug: "",
  description: "",
  imageUrl: "/pages/shop-hero.png",
  sortOrder: 0,
};
