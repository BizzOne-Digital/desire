"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { toast } from "sonner";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  catalogName: z.string().min(2, "Please specify which catalog"),
  productDetails: z
    .string()
    .min(10, "Please provide detailed product information"),
  quantity: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export function ProductInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          "Inquiry submitted successfully! We'll get back to you soon.",
        );
        reset();
      } else {
        toast.error("Failed to submit inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);
      toast.error("An error occurred. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel rounded-[1.6rem] p-6 sm:rounded-[2rem] sm:p-8 md:p-10"
    >
      <div className="grid gap-6 sm:gap-7">
        {/* Contact Information */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-champagne"
            >
              Your Name *
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="w-full rounded-lg border border-champagne/20 bg-white/[0.03] px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-champagne"
            >
              Email Address *
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="w-full rounded-lg border border-champagne/20 bg-white/[0.03] px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-champagne"
          >
            Phone Number (Optional)
          </label>
          <input
            {...register("phone")}
            type="tel"
            id="phone"
            className="w-full rounded-lg border border-champagne/20 bg-white/[0.03] px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Product Information */}
        <div className="border-t border-champagne/10 pt-6">
          <h3 className="mb-5 font-serif text-2xl text-ivory">
            Product Details
          </h3>

          <div className="grid gap-5">
            <div>
              <label
                htmlFor="catalogName"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-champagne"
              >
                Catalog Name *
              </label>
              <input
                {...register("catalogName")}
                type="text"
                id="catalogName"
                className="w-full rounded-lg border border-champagne/20 bg-white/[0.03] px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30"
                placeholder="e.g., Sneakers Collection, Luxury Bags"
              />
              {errors.catalogName && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.catalogName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="productDetails"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-champagne"
              >
                Product Details *
              </label>
              <textarea
                {...register("productDetails")}
                id="productDetails"
                rows={5}
                className="w-full rounded-lg border border-champagne/20 bg-white/[0.03] px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30"
                placeholder="Include product code, model number, or detailed description. Screenshots or catalog links are helpful too."
              />
              {errors.productDetails && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.productDetails.message}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-champagne"
                >
                  Quantity
                </label>
                <input
                  {...register("quantity")}
                  type="text"
                  id="quantity"
                  className="w-full rounded-lg border border-champagne/20 bg-white/[0.03] px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30"
                  placeholder="1"
                />
              </div>

              <div>
                <label
                  htmlFor="size"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-champagne"
                >
                  Size
                </label>
                <input
                  {...register("size")}
                  type="text"
                  id="size"
                  className="w-full rounded-lg border border-champagne/20 bg-white/[0.03] px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30"
                  placeholder="e.g., 10, M, L"
                />
              </div>

              <div>
                <label
                  htmlFor="color"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-champagne"
                >
                  Color
                </label>
                <input
                  {...register("color")}
                  type="text"
                  id="color"
                  className="w-full rounded-lg border border-champagne/20 bg-white/[0.03] px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30"
                  placeholder="e.g., Black"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="additionalNotes"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-champagne"
              >
                Additional Notes
              </label>
              <textarea
                {...register("additionalNotes")}
                id="additionalNotes"
                rows={3}
                className="w-full rounded-lg border border-champagne/20 bg-white/[0.03] px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30"
                placeholder="Any other information or special requests"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold-gradient px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-black transition hover:-translate-y-0.5 hover:shadow-gold disabled:opacity-50 disabled:hover:translate-y-0 sm:text-sm"
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}{" "}
          <Send size={16} />
        </button>

        <p className="text-center text-xs text-ivory/60">
          * Required fields. We&apos;ll respond within 24 hours.
        </p>
      </div>
    </form>
  );
}
