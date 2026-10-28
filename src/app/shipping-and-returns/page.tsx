import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Shipping and Returns",
};

export default async function Page() {
  const c = await getContent();

  return (
    <PolicyPage
      eyebrow="Shipping"
      title="Shipping and Returns"
      text={c.t("shipping.hero.text")}
      body={c.t("shipping.body")}
      image={c.t("shipping.hero.image")}
      stripImages={c.strip("shipping")}
      stripTitle={c.t("shipping.strip.title")}
    />
  );
}
