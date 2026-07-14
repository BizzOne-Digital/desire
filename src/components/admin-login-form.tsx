"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password")
      })
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      toast.error(data.error || "Unable to sign in.");
      return;
    }

    router.push(searchParams.get("next") || "/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel mx-auto grid max-w-md gap-5 rounded-[2rem] p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-champagne">Admin Login</p>
        <h1 className="mt-3 font-serif text-5xl text-ivory">Manage ONLY COLLECTION</h1>
      </div>
      <label className="grid gap-2 text-sm text-ivory/70">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3"
        />
      </label>
      <label className="grid gap-2 text-sm text-ivory/70">
        Password
        <input
          name="password"
          type="password"
          required
          className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3"
          autoComplete="current-password"
        />
      </label>
      <button disabled={loading} className="rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black disabled:opacity-50">
        {loading ? "Signing In..." : "Sign In"}
      </button>
      <p className="text-xs leading-6 text-ivory/45">
        Enter the admin credentials provided for this store. Forgot password structure is ready
        for a reset-token email provider.
      </p>
    </form>
  );
}
