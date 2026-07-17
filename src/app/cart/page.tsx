import type { Metadata } from "next";
import { UnavailableCheckoutNotice } from "@/components/unavailable-checkout-notice";

export const metadata: Metadata = {
  title: "Cart Unavailable",
  description:
    "Direct checkout is unavailable. Please contact us for pricing and availability.",
};

export default function CartPage() {
  return (
    <UnavailableCheckoutNotice title="Direct cart checkout is unavailable." />
  );
}
