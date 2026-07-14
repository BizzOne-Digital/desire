import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { GalleryItem } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  cta
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="relative min-h-[70vh] overflow-hidden pt-32">
      <Image src={image} alt="" fill priority className="image-mask object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-obsidian" />
      <div className="luxury-container relative z-10 flex min-h-[60vh] items-end pb-16">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-champagne">{eyebrow}</p>
          <h1 className="mt-5 font-serif text-5xl leading-[0.95] text-ivory md:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">{text}</p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-champagne/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-ivory transition hover:bg-champagne hover:text-black"
            >
              {cta.label}
              <ArrowRight size={16} />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false
}: {
  eyebrow: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <Reveal className={cn("mb-10", centered && "mx-auto max-w-3xl text-center")}>
      <p className="text-xs font-bold uppercase tracking-[0.34em] text-champagne">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl leading-tight text-ivory md:text-6xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-ivory/68">{text}</p>}
    </Reveal>
  );
}

export function EditorialImageStrip({
  images,
  title = "Visual Texture"
}: {
  images: string[];
  title?: string;
}) {
  return (
    <section className="luxury-container py-20">
      <SectionHeading
        eyebrow="Imagery"
        title={title}
        text="Each page includes rich editorial imagery so the experience feels visual, premium, and complete across desktop and mobile."
        centered
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {images.slice(0, 5).map((image, index) => (
          <Reveal key={image} delay={index * 0.04}>
            <div className={cn("relative overflow-hidden rounded-[1.4rem] border border-champagne/14", index % 2 === 0 ? "aspect-[3/4]" : "aspect-square md:mt-10")}>
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                fill
                sizes="(min-width: 768px) 20vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {items.map((item, index) => (
        <Reveal key={item.title} delay={(index % 3) * 0.05} className="mb-5 break-inside-avoid">
          <article className="group overflow-hidden rounded-[1.7rem] border border-champagne/14 bg-white/[0.035]">
            <div className={cn("relative overflow-hidden", index % 2 === 0 ? "aspect-[4/5]" : "aspect-[5/4]")}>
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
              <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs uppercase tracking-[0.18em] text-champagne backdrop-blur">
                {item.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-2xl text-ivory">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ivory/62">{item.description}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
