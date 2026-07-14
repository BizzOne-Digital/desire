import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }
  if (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Upload a JPG, PNG, WEBP, or GIF under 5MB." }, { status: 400 });
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return NextResponse.json({
      error: "Cloudinary credentials are required for production uploads.",
      requiredEnv: ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"]
    }, { status: 501 });
  }

  return NextResponse.json({
    error: "Cloudinary upload adapter is ready for credentials. Add the keys and connect the upload SDK here."
  }, { status: 501 });
}
