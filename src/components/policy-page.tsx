import { EditorialImageStrip, PageHero } from "@/components/sections";
import { getImageSet } from "@/lib/utils";

export function PolicyPage({
  eyebrow,
  title,
  text,
  body,
  image,
  imageSeed
}: {
  eyebrow: string;
  title: string;
  text: string;
  body: string;
  image: string;
  imageSeed: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} text={text} image={image} />
      <section className="luxury-container py-24">
        <article className="glass-panel mx-auto max-w-4xl rounded-[2rem] p-8 md:p-12">
          <h1 className="font-serif text-5xl text-ivory">{title}</h1>
          <div className="mt-8 grid gap-6 text-base leading-8 text-ivory/70">
            <p>{body}</p>
            <p>
              These terms are provided for customer clarity and should be reviewed by the site owner
              before accepting payments or confirming customer orders.
            </p>
            <p>
              Contact ONLY COLLECTION at onlycollection21@gmail.com or (514) 709-8704 for questions
              about inquiries, delivery details, privacy, or support.
            </p>
          </div>
        </article>
      </section>
      <EditorialImageStrip images={getImageSet(imageSeed)} title={`${title} Editorial Set`} />
    </>
  );
}
