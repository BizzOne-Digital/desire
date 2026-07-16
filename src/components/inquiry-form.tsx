"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { Catalog } from "@/lib/catalogs";
import { productInquirySchema } from "@/lib/validators";
import type { z } from "zod";

type InquiryValues = z.infer<typeof productInquirySchema>;

const inputClass =
  "w-full rounded-2xl border border-champagne/18 bg-white/[0.04] px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 transition focus:border-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne";

export function InquiryForm({ catalogs }: { catalogs: Catalog[] }) {
  const params = useSearchParams();
  const selectedCatalog = params.get("catalog") ?? "";
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InquiryValues>({
    resolver: zodResolver(productInquirySchema),
    defaultValues: {
      catalogId: catalogs.some((catalog) => catalog.id === selectedCatalog)
        ? selectedCatalog
        : "",
      quantity: 1,
      consent: false,
      company: "",
    },
  });

  const values = watch();
  const whatsappHref = useMemo(() => {
    if (!whatsappNumber) return "";
    const catalogName =
      catalogs.find((catalog) => catalog.id === values.catalogId)?.name ??
      values.catalogId;
    const text = [
      "Product inquiry",
      `Name: ${values.fullName ?? ""}`,
      `Catalog: ${catalogName}`,
      `Product link: ${values.productLink ?? ""}`,
      `Product code/album: ${values.productCode ?? ""}`,
      `Size: ${values.requestedSize ?? ""}`,
      `Color: ${values.requestedColor ?? ""}`,
      `Quantity: ${values.quantity ?? ""}`,
      `Delivery country: ${values.deliveryCountry ?? ""}`,
      `Notes: ${values.notes ?? ""}`,
    ].join("\n");
    return `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
  }, [catalogs, values, whatsappNumber]);

  async function onSubmit(payload: InquiryValues) {
    setLoading(true);
    setReference("");
    const response = await fetch("/api/product-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      toast.error(data.error || "Inquiry could not be submitted.");
      return;
    }

    setReference(data.reference);
    toast.success("Inquiry submitted for confirmation.");
    reset({
      catalogId: payload.catalogId,
      quantity: 1,
      consent: false,
      company: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel grid gap-5 rounded-[2rem] p-6 md:p-8"
    >
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("company")}
        aria-hidden="true"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message}>
          <input
            className={inputClass}
            autoComplete="name"
            {...register("fullName")}
          />
        </Field>
        <Field label="Email address" error={errors.email?.message}>
          <input
            className={inputClass}
            type="email"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone or WhatsApp number" error={errors.phone?.message}>
          <input
            className={inputClass}
            autoComplete="tel"
            {...register("phone")}
          />
        </Field>
        <Field label="Catalog/category" error={errors.catalogId?.message}>
          <select className={inputClass} {...register("catalogId")}>
            <option value="">Select a catalog</option>
            {catalogs.map((catalog) => (
              <option key={catalog.id} value={catalog.id}>
                {catalog.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Product link" error={errors.productLink?.message}>
        <input
          className={inputClass}
          placeholder="https://..."
          {...register("productLink")}
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-3">
        <Field
          label="Product code or album name"
          error={errors.productCode?.message}
        >
          <input className={inputClass} {...register("productCode")} />
        </Field>
        <Field label="Requested size" error={errors.requestedSize?.message}>
          <input className={inputClass} {...register("requestedSize")} />
        </Field>
        <Field label="Requested color" error={errors.requestedColor?.message}>
          <input className={inputClass} {...register("requestedColor")} />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Quantity" error={errors.quantity?.message}>
          <input
            className={inputClass}
            type="number"
            min="1"
            {...register("quantity")}
          />
        </Field>
        <Field label="Delivery country" error={errors.deliveryCountry?.message}>
          <input
            className={inputClass}
            autoComplete="country-name"
            {...register("deliveryCountry")}
          />
        </Field>
      </div>

      <Field label="Additional notes" error={errors.notes?.message}>
        <textarea
          className={`${inputClass} min-h-32 resize-y`}
          {...register("notes")}
        />
      </Field>

      <label className="flex gap-3 text-sm leading-6 text-ivory/72">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-champagne"
          {...register("consent")}
        />
        <span>
          I understand that availability and price are subject to confirmation
          before payment.
          {errors.consent && (
            <span className="mt-1 block text-xs text-red-300">
              {errors.consent.message}
            </span>
          )}
        </span>
      </label>

      {reference && (
        <p className="rounded-2xl border border-emerald-300/25 bg-emerald-950/20 p-4 text-sm text-emerald-100">
          Inquiry received. Reference: {reference}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gold-gradient px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Product Inquiry"}
        </button>
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="rounded-full border border-champagne/35 px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-ivory hover:bg-champagne/10"
          >
            Send via WhatsApp
          </a>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm text-ivory/72">
      <span>{label}</span>
      {children}
      {error && <span className="text-xs text-red-300">{error}</span>}
    </label>
  );
}
