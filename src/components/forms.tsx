"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, newsletterSchema } from "@/lib/validators";
import { MagneticButton } from "@/components/motion";

type NewsletterValues = {
  name?: string;
  email: string;
};

type ContactValues = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

const inputClass =
  "w-full rounded-2xl border border-champagne/18 bg-white/[0.04] px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 transition focus:border-champagne";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(values: NewsletterValues) {
    setLoading(true);
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    setLoading(false);

    if (!response.ok) {
      toast.error("Please try subscribing again.");
      return;
    }

    toast.success("You are on the list.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={compact ? "grid gap-3" : "mx-auto grid max-w-2xl gap-4 sm:grid-cols-[1fr_1fr_auto]"}>
      {!compact && (
        <input aria-label="Name" className={inputClass} placeholder="Name" {...register("name")} />
      )}
      <div>
        <input aria-label="Email" className={inputClass} placeholder="Email address" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
      </div>
      <MagneticButton type="submit" disabled={loading} className={compact ? "w-full" : ""}>
        {loading ? "Joining..." : "Subscribe"}
      </MagneticButton>
      {!compact && (
        <p className="sm:col-span-3 text-center text-xs text-ivory/45">
          By subscribing, you agree to receive brand updates. You can unsubscribe anytime.
        </p>
      )}
    </form>
  );
}

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactValues) {
    setLoading(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    setLoading(false);

    if (!response.ok) {
      toast.error("Your message could not be sent. Please try again.");
      return;
    }

    toast.success("Message received. We will be in touch soon.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-panel grid gap-5 rounded-[2rem] p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input className={inputClass} {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input className={inputClass} type="email" {...register("email")} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}>
          <input className={inputClass} {...register("phone")} />
        </Field>
        <Field label="Subject" error={errors.subject?.message}>
          <input className={inputClass} {...register("subject")} />
        </Field>
      </div>
      <Field label="Message" error={errors.message?.message}>
        <textarea className={`${inputClass} min-h-36 resize-y`} {...register("message")} />
      </Field>
      <MagneticButton type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit Message"}
      </MagneticButton>
    </form>
  );
}

function Field({
  label,
  error,
  children
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
