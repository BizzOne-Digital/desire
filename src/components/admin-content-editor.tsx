"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminImageField } from "@/components/admin-image-field";
import type { Catalog } from "@/lib/catalogs";
import type { GalleryItem, Service } from "@/lib/content";
import { contentDefaults, contentPages, contentSections, type ContentField } from "@/lib/site-content";
import type { UploadFolder } from "@/lib/uploads-shared";
import { cn, slugify } from "@/lib/utils";

const fieldClass = "w-full rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3 text-sm text-ivory";
const buttonClass =
  "rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black disabled:opacity-50";
const ghostButton =
  "rounded-full border border-champagne/30 px-4 py-2 text-xs font-semibold text-champagne transition hover:bg-champagne hover:text-black disabled:opacity-40";

const LIST_TABS = ["Services", "Gallery", "Catalogs"] as const;

async function saveContent(key: string, value: unknown) {
  const response = await fetch("/api/admin/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, value })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Could not save changes.");
  return data;
}

export function AdminContentEditor({
  databaseEnabled,
  storedFields,
  services,
  gallery,
  catalogs
}: {
  databaseEnabled: boolean;
  storedFields: Record<string, string>;
  services: Service[];
  gallery: GalleryItem[];
  catalogs: Catalog[];
}) {
  const tabs = [...contentPages, ...LIST_TABS];
  const [tab, setTab] = useState<string>(tabs[0]);

  return (
    <div className="grid gap-6">
      {!databaseEnabled && (
        <p className="rounded-2xl border border-red-300/30 bg-red-300/10 p-4 text-sm text-red-200">
          DATABASE_URL is not configured, so changes cannot be saved. Add your MongoDB Atlas connection string to the
          environment and redeploy.
        </p>
      )}
      <div className="flex gap-2 overflow-auto rounded-full border border-champagne/12 bg-black/35 p-2 no-scrollbar">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2 text-sm transition",
              tab === item ? "bg-champagne text-black" : "text-ivory/65 hover:bg-champagne/20"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {contentPages.includes(tab) && <PageFieldsEditor key={tab} page={tab} storedFields={storedFields} />}
      {tab === "Services" && <ServicesEditor initial={services} />}
      {tab === "Gallery" && <GalleryEditor initial={gallery} />}
      {tab === "Catalogs" && <CatalogsEditor initial={catalogs} />}
    </div>
  );
}

/* ------------------------------------------------------------------ page fields */

// Field values live outside the tab component so edits survive switching tabs before saving.
const fieldStore: { values?: Record<string, string> } = {};

function PageFieldsEditor({ page, storedFields }: { page: string; storedFields: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(
    () => fieldStore.values ?? { ...contentDefaults, ...storedFields }
  );
  const [saving, setSaving] = useState(false);
  const sections = useMemo(() => contentSections.filter((section) => section.page === page), [page]);

  function update(key: string, value: string) {
    setValues((current) => {
      const next = { ...current, [key]: value };
      fieldStore.values = next;
      return next;
    });
  }

  async function save() {
    setSaving(true);
    try {
      await saveContent("fields", values);
      // Blank fields fall back to the default text, so show that after saving.
      const normalized = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value.trim() ? value : contentDefaults[key] ?? ""])
      );
      fieldStore.values = normalized;
      setValues(normalized);
      toast.success(`${page} content saved. The live site is updated.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6">
      {sections.map((section) => (
        <section key={section.title} className="glass-panel grid gap-4 rounded-[1.8rem] p-6">
          <h2 className="font-serif text-3xl text-ivory">{section.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {section.fields.map((field) => (
              <FieldInput key={field.key} field={field} value={values[field.key] ?? ""} onChange={update} />
            ))}
          </div>
        </section>
      ))}
      <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-full border border-champagne/20 bg-black/80 px-6 py-3 backdrop-blur">
        <p className="text-xs text-ivory/60">Leave a text field empty to restore its default wording.</p>
        <button onClick={save} disabled={saving} className={buttonClass}>
          {saving ? "Saving..." : `Save ${page}`}
        </button>
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange
}: {
  field: ContentField;
  value: string;
  onChange: (key: string, value: string) => void;
}) {
  if (field.type === "image") {
    return (
      <AdminImageField
        className="md:col-span-2"
        label={field.label}
        value={value}
        folder="pages"
        onChange={(url) => onChange(field.key, url)}
      />
    );
  }

  return (
    <label className={cn("grid gap-2", field.type === "textarea" && "md:col-span-2")}>
      <span className="text-xs uppercase tracking-[0.18em] text-champagne/80">{field.label}</span>
      {field.type === "textarea" ? (
        <textarea
          className={cn(fieldClass, "min-h-24")}
          value={value}
          onChange={(event) => onChange(field.key, event.target.value)}
        />
      ) : (
        <input className={fieldClass} value={value} onChange={(event) => onChange(field.key, event.target.value)} />
      )}
    </label>
  );
}

/* ------------------------------------------------------------------ list editors */

type ListField<T> = {
  name: keyof T & string;
  label: string;
  kind: "text" | "textarea" | "image" | "lines" | "tags" | "select" | "checkbox";
  options?: string[];
  folder?: UploadFolder;
  wide?: boolean;
};

function ListEditor<T extends Record<string, unknown>>({
  storageKey,
  noun,
  initial,
  fields,
  blank,
  itemTitle,
  normalize
}: {
  storageKey: string;
  noun: string;
  initial: T[];
  fields: ListField<T>[];
  blank: () => T;
  itemTitle: (item: T) => string;
  normalize?: (item: T) => T;
}) {
  const [items, setItems] = useState<T[]>(initial);
  const [saving, setSaving] = useState(false);

  function patch(index: number, change: Partial<T>) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...change } : item)));
  }

  function move(index: number, direction: -1 | 1) {
    setItems((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function save() {
    setSaving(true);
    try {
      const prepared = normalize ? items.map(normalize) : items;
      await saveContent(storageKey, prepared);
      setItems(prepared);
      toast.success(`${noun} saved. The live site is updated.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-5">
      {items.map((item, index) => (
        <section key={index} className="glass-panel grid gap-4 rounded-[1.8rem] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-2xl text-ivory">
              {index + 1}. {itemTitle(item) || `New ${noun}`}
            </h2>
            <div className="flex gap-2">
              <button type="button" className={ghostButton} disabled={index === 0} onClick={() => move(index, -1)}>
                Up
              </button>
              <button
                type="button"
                className={ghostButton}
                disabled={index === items.length - 1}
                onClick={() => move(index, 1)}
              >
                Down
              </button>
              <button
                type="button"
                className="rounded-full border border-red-300/40 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-300/10"
                onClick={() => {
                  if (window.confirm(`Delete this ${noun.toLowerCase()}?`)) {
                    setItems((current) => current.filter((_, i) => i !== index));
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <ListFieldInput key={field.name} field={field} item={item} onChange={(change) => patch(index, change)} />
            ))}
          </div>
        </section>
      ))}
      {items.length === 0 && <p className="text-sm text-ivory/60">No items yet.</p>}
      <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-full border border-champagne/20 bg-black/80 px-6 py-3 backdrop-blur">
        <button type="button" className={ghostButton} onClick={() => setItems((current) => [...current, blank()])}>
          + Add {noun}
        </button>
        <button onClick={save} disabled={saving} className={buttonClass}>
          {saving ? "Saving..." : `Save ${noun}s`}
        </button>
      </div>
    </div>
  );
}

function ListFieldInput<T extends Record<string, unknown>>({
  field,
  item,
  onChange
}: {
  field: ListField<T>;
  item: T;
  onChange: (change: Partial<T>) => void;
}) {
  const raw = item[field.name];
  const set = (value: unknown) => onChange({ [field.name]: value } as Partial<T>);

  if (field.kind === "image") {
    return (
      <AdminImageField
        className="md:col-span-2"
        label={field.label}
        value={String(raw ?? "")}
        folder={field.folder ?? "misc"}
        onChange={set}
      />
    );
  }

  if (field.kind === "checkbox") {
    return (
      <label className="flex items-center gap-3 text-sm text-ivory/75">
        <input type="checkbox" checked={Boolean(raw)} onChange={(event) => set(event.target.checked)} />
        {field.label}
      </label>
    );
  }

  const wide = field.wide || field.kind === "textarea" || field.kind === "lines";
  const common = { className: cn(fieldClass, field.kind !== "text" && "min-h-24") };

  return (
    <label className={cn("grid gap-2", wide && "md:col-span-2")}>
      <span className="text-xs uppercase tracking-[0.18em] text-champagne/80">{field.label}</span>
      {field.kind === "select" ? (
        <select className={fieldClass} value={String(raw ?? "")} onChange={(event) => set(event.target.value)}>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.kind === "lines" || field.kind === "tags" ? (
        <textarea
          {...common}
          className={cn(fieldClass, field.kind === "tags" ? "min-h-0" : "min-h-24")}
          rows={field.kind === "tags" ? 1 : undefined}
          placeholder={field.kind === "tags" ? "comma, separated, tags" : "One per line"}
          value={Array.isArray(raw) ? (raw as string[]).join(field.kind === "tags" ? ", " : "\n") : ""}
          onChange={(event) =>
            set(
              event.target.value
                .split(field.kind === "tags" ? "," : "\n")
                .map((part) => (field.kind === "tags" ? part.trim() : part))
            )
          }
        />
      ) : field.kind === "textarea" ? (
        <textarea {...common} value={String(raw ?? "")} onChange={(event) => set(event.target.value)} />
      ) : (
        <input className={fieldClass} value={String(raw ?? "")} onChange={(event) => set(event.target.value)} />
      )}
    </label>
  );
}

// Drops blank lines/tags only when saving so typing a new line in the editor is not swallowed.
const clean = (values: string[]) => values.map((value) => value.trim()).filter(Boolean);

function ServicesEditor({ initial }: { initial: Service[] }) {
  return (
    <ListEditor<Service>
      storageKey="services"
      noun="Service"
      initial={initial}
      blank={() => ({ title: "", slug: "", description: "", imageUrl: "", features: [] })}
      itemTitle={(item) => item.title}
      normalize={(item) => ({
        ...item,
        slug: slugify(item.slug || item.title),
        features: clean(item.features)
      })}
      fields={[
        { name: "title", label: "Title", kind: "text" },
        { name: "slug", label: "Slug (auto from title if empty)", kind: "text" },
        { name: "description", label: "Description", kind: "textarea" },
        { name: "features", label: "Bullet points", kind: "lines" },
        { name: "imageUrl", label: "Image", kind: "image", folder: "pages" }
      ]}
    />
  );
}

function GalleryEditor({ initial }: { initial: GalleryItem[] }) {
  return (
    <ListEditor<GalleryItem>
      storageKey="gallery"
      noun="Gallery item"
      initial={initial}
      blank={() => ({ title: "", description: "", category: "Editorial", imageUrl: "" })}
      itemTitle={(item) => item.title}
      fields={[
        { name: "title", label: "Title", kind: "text" },
        { name: "category", label: "Category (used for the gallery filter)", kind: "text" },
        { name: "description", label: "Description", kind: "textarea" },
        { name: "imageUrl", label: "Image", kind: "image", folder: "gallery" }
      ]}
    />
  );
}

function CatalogsEditor({ initial }: { initial: Catalog[] }) {
  return (
    <ListEditor<Catalog>
      storageKey="catalogs"
      noun="Catalog"
      initial={initial}
      blank={() => ({
        id: `cat-${Date.now()}`,
        name: "",
        slug: "",
        description: "",
        yupooUrl: "",
        imageUrl: "",
        category: "footwear",
        featured: false,
        requiresPassword: false,
        password: "",
        tags: []
      })}
      itemTitle={(item) => item.name}
      normalize={(item) => ({
        ...item,
        slug: slugify(item.slug || item.name),
        tags: clean(item.tags),
        password: item.requiresPassword ? item.password : undefined
      })}
      fields={[
        { name: "name", label: "Name", kind: "text" },
        { name: "slug", label: "Slug (auto from name if empty)", kind: "text" },
        { name: "description", label: "Description", kind: "textarea" },
        { name: "yupooUrl", label: "Catalog link (opens in a new tab)", kind: "text", wide: true },
        {
          name: "category",
          label: "Category",
          kind: "select",
          options: ["footwear", "accessories", "apparel", "watches", "bags"]
        },
        { name: "tags", label: "Tags", kind: "tags" },
        { name: "featured", label: "Featured on the homepage", kind: "checkbox" },
        { name: "requiresPassword", label: "Requires an access code", kind: "checkbox" },
        { name: "password", label: "Access code (shown to visitors)", kind: "text" },
        { name: "imageUrl", label: "Card image", kind: "image", folder: "products" }
      ]}
    />
  );
}
