import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { policyContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for ONLY COLLECTION."
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy"
      title="Privacy Policy"
      text="How customer information is handled, protected, and used."
      body={policyContent.privacy}
      image="/pages/about-hero.png"
      imageSeed="privacy"
    />
  );
}
