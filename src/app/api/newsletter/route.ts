import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = newsletterSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (hasDatabase) {
    const db = await getMongoDb();
    await db.collection("NewsletterSubscriber").updateOne(
      { email: parsed.data.email },
      {
        $set: { name: parsed.data.name },
        $setOnInsert: { email: parsed.data.email, createdAt: new Date() }
      },
      { upsert: true }
    );
  }

  return NextResponse.json({ ok: true });
}
