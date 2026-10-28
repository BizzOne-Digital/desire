import { EditorialImageStrip, PageHero } from "@/components/sections";
import { getContent } from "@/lib/content-store";
import { getSiteSettings } from "@/lib/store";

export async function PolicyPage({
  eyebrow,
  title,
  text,
  body,
  image,
  stripImages,
  stripTitle
}: {
  eyebrow: string;
  title: string;
  text: string;
  body: string;
  image: string;
  stripImages: string[];
  stripTitle: string;
}) {
  const [settings, c] = await Promise.all([getSiteSettings(), getContent()]);

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} text={text} image={image} />
      <section className="luxury-container py-24">
        <article className="glass-panel mx-auto max-w-4xl rounded-[2rem] p-8 md:p-12">
          <h1 className="font-serif text-5xl text-ivory">{title}</h1>
          <div className="mt-8 grid gap-6 text-base leading-8 text-ivory/70">
            {body
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            <p>
              These terms are provided for customer clarity and should be reviewed by the site owner
              before accepting payments or confirming customer orders.
            </p>
            <p>
              Contact {settings.businessName} at {settings.email} or {settings.phone} for questions
              about inquiries, delivery details, privacy, or support.
            </p>
          </div>
        </article>
      </section>
      <EditorialImageStrip
        images={stripImages}
        title={stripTitle}
        eyebrow={c.t("strip.eyebrow")}
        text={c.t("strip.text")}
      />
    </>
  );
}
