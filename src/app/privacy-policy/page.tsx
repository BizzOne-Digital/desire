import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default async function Page() {
  const c = await getContent();

  return (
    <PolicyPage
      eyebrow="Privacy"
      title="Privacy Policy"
      text={c.t("privacy.hero.text")}
      body={c.t("privacy.body")}
      image={c.t("privacy.hero.image")}
      stripImages={c.strip("privacy")}
      stripTitle={c.t("privacy.strip.title")}
    />
  );
}
