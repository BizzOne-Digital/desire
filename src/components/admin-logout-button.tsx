"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="rounded-full border border-champagne/35 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ivory hover:bg-champagne/10"
    >
      Logout
    </button>
  );
}
