import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product-detail-client";
import { EditorialImageStrip, JsonLd } from "@/components/sections";
import { getProduct, getProducts } from "@/lib/store";
import { absoluteUrl } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.images[0] }]
    },
    alternates: {
      canonical: absoluteUrl(`/products/${product.slug}`)
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([getProduct(slug), getProducts()]);

  if (!product) {
    notFound();
  }

  const related = allProducts.filter(
    (item) => item.slug !== product.slug && item.category === product.category
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description,
          image: product.images,
          sku: product.sku,
          offers: {
            "@type": "Offer",
            priceCurrency: "CAD",
            price: product.salePrice ?? product.price,
            availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: absoluteUrl(`/products/${product.slug}`)
          }
        }}
      />
      <ProductDetailClient product={product} related={related.length ? related : allProducts.filter((item) => item.slug !== product.slug)} />
      <EditorialImageStrip images={product.images} title={`${product.title} Visual Details`} />
    </>
  );
}
