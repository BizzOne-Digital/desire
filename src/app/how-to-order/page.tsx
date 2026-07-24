import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, FileText, Mail, CheckCircle } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "How to Order",
  description:
    "Learn how to browse our catalogs and place an inquiry for authentic athletic merchandise from Sport Only.",
};

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Browse Our Catalogs",
    description:
      "Explore our curated Yupoo catalogs featuring sneakers, bags, watches, accessories, and more. Some catalogs require access codes - we provide them for your convenience.",
    details: [
      "Visit our Shop Catalogs page",
      "Click on any catalog to open it in a new window",
      "Use provided access codes for password-protected catalogs",
      "Browse products and note items you're interested in",
    ],
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Note Product Details",
    description:
      "When you find products you like, save the important details. You'll need this information when contacting us.",
    details: [
      "Product name or description",
      "Yupoo album link or product code",
      "Size, color, or variant preferences",
      "Quantity needed",
    ],
  },
  {
    number: "03",
    icon: Mail,
    title: "Contact Us",
    description:
      "Reach out to us with your product inquiry. We'll provide current pricing, availability, and shipping information.",
    details: [
      `Email us at ${siteConfig.email}`,
      `Call or text ${siteConfig.phone}`,
      "Use our Product Inquiry form",
      "Include all product details from Step 2",
    ],
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Complete Your Order",
    description:
      "We'll work with you to confirm details, arrange payment, and coordinate delivery of your authentic athletic merchandise.",
    details: [
      "Receive pricing and availability confirmation",
      "Discuss shipping options and timeline",
      "Complete payment through agreed method",
      "Track your order until delivery",
    ],
  },
];

export default function HowToOrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Ordering Process"
        title="How to Order from Sport Only"
        text="Our catalog-based ordering process ensures you get authentic athletic merchandise with personalized service. Browse, inquire, and order with confidence."
        image="/pages/services-hero.png"
        cta={{ label: "Browse Catalogs", href: "/shop" }}
      />

      <section className="luxury-container py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="Simple Process"
          title="Four easy steps to get your authentic gear"
          text="Our streamlined ordering process connects you directly with premium athletic merchandise."
          centered
        />

        <div className="mt-12 grid gap-8 lg:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delay={index * 0.1}>
                <div className="glass-panel group rounded-[1.7rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/40 hover:shadow-gold sm:rounded-[2rem] sm:p-8 lg:p-10">
                  <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
                    <div className="flex flex-col items-start gap-4 lg:items-center lg:text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-champagne/30 bg-champagne/5 sm:h-20 sm:w-20">
                        <Icon className="h-8 w-8 text-champagne sm:h-10 sm:w-10" />
                      </div>
                      <span className="font-serif text-6xl text-champagne/20 sm:text-7xl lg:text-8xl">
                        {step.number}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif text-3xl text-ivory sm:text-4xl">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-ivory/70 sm:text-lg">
                        {step.description}
                      </p>
                      <ul className="mt-6 grid gap-3 sm:gap-4">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-ivory/60"
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-gradient" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="luxury-container pb-16 sm:pb-20 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div className="glass-panel rounded-[1.7rem] p-6 sm:rounded-[2rem] sm:p-8 lg:p-10">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.28em] text-champagne sm:text-xs">
                Important Information
              </h2>
              <h3 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
                Before You Order
              </h3>
              <div className="mt-6 grid gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-ivory">
                    External Catalogs
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-ivory/70">
                    Our catalogs are hosted on Yupoo, an external platform. We don&apos;t control inventory or pricing directly - we act as your connection to verified suppliers.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ivory">
                    Pricing & Availability
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-ivory/70">
                    Prices and stock levels change frequently. Contact us for current pricing, availability, and shipping costs before placing your order.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ivory">
                    Delivery Timeline
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-ivory/70">
                    Most orders ship within 3-7 business days, with delivery taking 10-21 days depending on your location and selected shipping method.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-panel rounded-[1.7rem] p-6 sm:rounded-[2rem] sm:p-8 lg:p-10">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.28em] text-champagne sm:text-xs">
                Need Help?
              </h2>
              <h3 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
                We&apos;re Here to Assist
              </h3>
              <p className="mt-4 text-base leading-7 text-ivory/70">
                Have questions about a product, catalog, or the ordering process? Our team is ready to help.
              </p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-lg border border-champagne/20 bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-champagne">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1 block text-sm font-medium text-ivory hover:text-champagne"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div className="rounded-lg border border-champagne/20 bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-champagne">
                    Phone
                  </p>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="mt-1 block text-sm font-medium text-ivory hover:text-champagne"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black hover:shadow-gold"
                >
                  Contact Us <ArrowRight size={14} />
                </Link>
                <Link
                  href="/product-inquiry"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-champagne/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-champagne hover:bg-champagne/10"
                >
                  Submit Inquiry <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="luxury-container pb-16 sm:pb-20 md:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.7rem] sm:rounded-[2.5rem]">
            <div className="absolute inset-0">
              <Image
                src="/pages/contact-hero.png"
                alt="Contact Sport Only"
                fill
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative z-10 px-6 py-12 text-center sm:px-10 sm:py-16 md:px-16 md:py-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-champagne sm:text-xs">
                Ready to Start?
              </p>
              <h2 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl md:text-6xl">
                Browse Our Catalogs
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ivory/70 sm:text-base">
                Explore authentic athletic merchandise from verified suppliers. Find your perfect gear and reach out to place your order.
              </p>
              <Link
                href="/shop"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-black hover:shadow-gold sm:text-sm"
              >
                View Catalogs <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
