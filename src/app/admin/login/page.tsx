import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false }
};

export default function AdminLoginPage() {
  return (
    <section className="grid min-h-screen place-items-center px-4 py-32">
      <AdminLoginForm />
    </section>
  );
}
