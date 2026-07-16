import type { Metadata } from "next";
import { UnavailableCheckoutNotice } from "@/components/unavailable-checkout-notice";

export const metadata: Metadata = {
  title: "Checkout Unavailable",
  description:
    "Direct checkout is unavailable. Submit a product inquiry for pricing and availability.",
};

export default function CheckoutPage() {
  return <UnavailableCheckoutNotice />;
}
