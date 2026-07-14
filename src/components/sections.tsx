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
    <section className="relative min-h-[62svh] overflow-hidden pt-20 sm:min-h-[68svh] sm:pt-24 md:min-h-[70vh] md:pt-32">
      <Image src={image} alt="" fill priority className="image-mask object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-obsidian" />
      <div className="luxury-container relative z-10 flex min-h-[50svh] items-end pb-9 sm:min-h-[56svh] sm:pb-10 md:min-h-[60vh] md:pb-16">
        <Reveal className="max-w-3xl">
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-champagne sm:text-[10px] md:text-xs md:tracking-[0.35em]">{eyebrow}</p>
          <h1 className="mt-4 font-serif text-[2rem] leading-[0.95] text-ivory min-[380px]:text-4xl sm:text-5xl md:mt-5 md:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-ivory/72 md:mt-6 md:text-lg md:leading-8">{text}</p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-champagne/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition hover:bg-champagne hover:text-black md:mt-8 md:px-6 md:text-sm md:tracking-[0.22em]"
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
    <Reveal className={cn("mb-7 md:mb-10", centered && "mx-auto max-w-3xl text-center")}>
      <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-champagne sm:text-[10px] md:text-xs md:tracking-[0.34em]">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-[1.65rem] leading-tight text-ivory min-[380px]:text-3xl sm:text-4xl md:text-6xl">{title}</h2>
      {text && <p className="mt-4 text-sm leading-7 text-ivory/68 md:mt-5 md:text-base md:leading-8">{text}</p>}
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
    <section className="luxury-container py-14 sm:py-20">
      <SectionHeading
        eyebrow="Imagery"
        title={title}
        text="Each page includes rich editorial imagery so the experience feels visual, premium, and complete across desktop and mobile."
        centered
      />
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-5">
        {images.slice(0, 5).map((image, index) => (
          <Reveal key={image} delay={index * 0.04}>
            <div className={cn("relative overflow-hidden rounded-[1rem] border border-champagne/14 sm:rounded-[1.4rem]", index % 2 === 0 ? "aspect-[3/4]" : "aspect-square md:mt-10")}>
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
