import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { policyContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for ONLY COLLECTION."
};

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Terms"
      title="Terms and Conditions"
      text="Clear expectations for using the website and purchasing products."
      body={policyContent.terms}
      image="/pages/about-hero.png"
      imageSeed="terms"
    />
  );
}
