import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default async function Page() {
  const c = await getContent();

  return (
    <PolicyPage
      eyebrow="Terms"
      title="Terms and Conditions"
      text={c.t("terms.hero.text")}
      body={c.t("terms.body")}
      image={c.t("terms.hero.image")}
      stripImages={c.strip("terms")}
      stripTitle={c.t("terms.strip.title")}
    />
  );
}
