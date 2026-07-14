import Link from "next/link";

export default function NotFound() {
  return (
    <section className="luxury-container grid min-h-screen place-items-center py-32 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-champagne">404</p>
        <h1 className="mt-4 font-serif text-6xl text-ivory">This page could not be found.</h1>
        <p className="mx-auto mt-5 max-w-xl text-ivory/65">
          The collection is still here. Return to the shop or explore the brand.
        </p>
        <Link href="/shop" className="mt-8 inline-flex rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black">
          Return to Shop
        </Link>
      </div>
    </section>
  );
}
