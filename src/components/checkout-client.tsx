"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCart } from "@/components/cart-provider";
import { checkoutSchema } from "@/lib/validators";
import { formatMoney } from "@/lib/utils";

type CheckoutValues = {
  name: string;
  email: string;
  phone?: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postal: string;
  country: string;
  notes?: string;
};

const fieldClass =
  "w-full rounded-2xl border border-champagne/16 bg-black/35 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35";

export function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 14;
  const total = subtotal + shipping;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema.omit({ items: true })) });

  async function onSubmit(values: CheckoutValues) {
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, items })
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      toast.error(data.error || "Checkout could not be completed.");
      return;
    }

    clearCart();
    router.push(`/order-confirmation?order=${data.orderNumber}`);
  }

  return (
    <section className="luxury-container grid gap-8 py-20 lg:grid-cols-[1fr_390px]">
      <form onSubmit={handleSubmit(onSubmit)} className="glass-panel grid gap-6 rounded-[2rem] p-6 md:p-8">
        <div>
          <h2 className="font-serif text-4xl text-ivory">Customer Information</h2>
          <p className="mt-2 text-sm text-ivory/58">No raw card information is stored. Payment is structured for Stripe integration.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full name" error={errors.name?.message}><input className={fieldClass} {...register("name")} /></Field>
          <Field label="Email" error={errors.email?.message}><input type="email" className={fieldClass} {...register("email")} /></Field>
          <Field label="Phone" error={errors.phone?.message}><input className={fieldClass} {...register("phone")} /></Field>
          <Field label="Country" error={errors.country?.message}><input className={fieldClass} defaultValue="Canada" {...register("country")} /></Field>
        </div>
        <h2 className="font-serif text-4xl text-ivory">Shipping Address</h2>
        <Field label="Address line 1" error={errors.line1?.message}><input className={fieldClass} {...register("line1")} /></Field>
        <Field label="Address line 2" error={errors.line2?.message}><input className={fieldClass} {...register("line2")} /></Field>
        <div className="grid gap-5 md:grid-cols-3">
          <Field label="City" error={errors.city?.message}><input className={fieldClass} {...register("city")} /></Field>
          <Field label="Province / Region" error={errors.region?.message}><input className={fieldClass} {...register("region")} /></Field>
          <Field label="Postal code" error={errors.postal?.message}><input className={fieldClass} {...register("postal")} /></Field>
        </div>
        <Field label="Order notes" error={errors.notes?.message}><textarea className={`${fieldClass} min-h-28`} {...register("notes")} /></Field>
        <div className="rounded-[1.5rem] border border-champagne/15 p-5">
          <h3 className="font-serif text-3xl text-ivory">Payment</h3>
          <p className="mt-2 text-sm leading-7 text-ivory/62">
            Mock payment is enabled for development. Add Stripe keys to activate a real PaymentIntent route without storing raw card details.
          </p>
        </div>
        <button disabled={loading || !items.length} className="rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black disabled:opacity-45">
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
      <aside className="glass-panel h-fit rounded-[2rem] p-6">
        <h2 className="font-serif text-4xl text-ivory">Order Summary</h2>
        <div className="mt-6 grid gap-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.variant}`} className="flex justify-between gap-4 text-sm text-ivory/68">
              <span>{item.title} × {item.quantity}</span>
              <span>{formatMoney(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm text-ivory/68">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{shipping ? formatMoney(shipping) : "Free"}</span></div>
          <div className="flex justify-between text-base font-bold text-ivory"><span>Total</span><span>{formatMoney(total)}</span></div>
        </div>
      </aside>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm text-ivory/70">
      {label}
      {children}
      {error && <span className="text-xs text-red-300">{error}</span>}
    </label>
  );
}
