import Image, { type ImageProps } from "next/image";

export const PLACEHOLDER_IMAGE = "/placeholder.svg";

// Old builds saved uploads to public/uploads, which does not exist on serverless hosts.
// Those URLs now fall back to a placeholder instead of rendering a broken image.
export function resolveImageSrc(src: ImageProps["src"]) {
  if (typeof src === "string" && (!src.trim() || src.startsWith("/uploads/"))) {
    return PLACEHOLDER_IMAGE;
  }
  return src;
}

export default function SafeImage({ src, alt, ...props }: ImageProps) {
  const resolved = resolveImageSrc(src);
  return <Image src={resolved} alt={alt} {...props} unoptimized={props.unoptimized || resolved === PLACEHOLDER_IMAGE} />;
}
