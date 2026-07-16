import Link from "next/link";

const steps = [
  [
    "Browse a catalog",
    "Choose the category that best matches what you are looking for.",
  ],
  [
    "Open the product album",
    "Catalogs open in a new tab so you can keep this website available.",
  ],
  [
    "Copy the reference",
    "Copy the product URL, product number, album name, or save a screenshot.",
  ],
  [
    "Submit an inquiry",
    "Send your requested size, color, quantity, delivery country, and product reference.",
  ],
  [
    "Confirm details",
    "We confirm price, availability, delivery time, and payment instructions before an order is created.",
  ],
];

export function OrderSteps() {
  return (
    <section className="luxury-container py-16">
      <div className="grid gap-5 md:grid-cols-5">
        {steps.map(([title, text], index) => (
          <article
            key={title}
            className="rounded-[1.6rem] border border-champagne/15 bg-white/[0.035] p-6"
          >
            <span className="font-serif text-5xl gold-text">0{index + 1}</span>
            <h2 className="mt-5 font-serif text-2xl text-ivory">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-ivory/65">{text}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 rounded-[2rem] border border-champagne/20 bg-champagne/10 p-6 text-center">
        <p className="mx-auto max-w-3xl text-sm leading-7 text-ivory/78">
          Submitting an inquiry does not create an order. Price and availability
          must be confirmed before payment.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="rounded-full bg-gold-gradient px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black"
          >
            Browse Catalogs
          </Link>
          <Link
            href="/product-inquiry"
            className="rounded-full border border-champagne/35 px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ivory hover:bg-champagne/10"
          >
            Submit Product Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
