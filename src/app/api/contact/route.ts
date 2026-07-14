import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the highlighted fields." }, { status: 400 });
  }

  if (hasDatabase) {
    const db = await getMongoDb();
    await db.collection("ContactSubmission").insertOne({
      ...parsed.data,
      status: "UNREAD",
      createdAt: new Date()
    });
  }

  return NextResponse.json({
    ok: true,
    message: hasDatabase
      ? "Message stored."
      : "Message accepted. Configure DATABASE_URL to persist submissions."
  });
}
