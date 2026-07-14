import Image from "next/image";
import { AdminShell } from "@/components/admin-shell";
import { galleryItems, products } from "@/lib/content";

export default function AdminMediaPage() {
  const images = [
    ...products.flatMap((product) => product.images.slice(0, 1).map((url) => ({ url, title: product.title }))),
    ...galleryItems.map((item) => ({ url: item.imageUrl, title: item.title }))
  ].slice(0, 12);

  return (
    <AdminShell title="Media Library">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <article key={`${image.title}-${image.url}`} className="glass-panel overflow-hidden rounded-[1.5rem]">
              <div className="relative aspect-square">
                <Image src={image.url} alt={image.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="font-serif text-2xl text-ivory">{image.title}</h2>
                <input className="mt-3 w-full rounded-xl border border-champagne/15 bg-black/35 px-3 py-2 text-xs" placeholder="Alt text" defaultValue={image.title} />
              </div>
            </article>
          ))}
        </section>
        <form className="glass-panel grid h-fit gap-4 rounded-[1.8rem] p-6">
          <h2 className="font-serif text-4xl text-ivory">Upload Image</h2>
          <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3 text-sm" />
          <input className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3 text-sm" placeholder="Alt text" />
          <button className="rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black">
            Upload
          </button>
          <p className="text-xs leading-6 text-ivory/48">
            Upload validation is implemented at `/api/admin/media`. Add Cloudinary credentials to enable production uploads, reuse, previews, and deletion.
          </p>
        </form>
      </div>
    </AdminShell>
  );
}
