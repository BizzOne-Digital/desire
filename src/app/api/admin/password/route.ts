import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(10).max(200)
});

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json({ error: "Configure DATABASE_URL to change the password." }, { status: 503 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "New password must be at least 10 characters." }, { status: 400 });
  }

  const db = await getMongoDb();
  const admin = await db.collection("AdminUser").findOne({ email: session.email });
  if (!admin || !(await bcrypt.compare(parsed.data.currentPassword, admin.passwordHash))) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  }

  await db
    .collection("AdminUser")
    .updateOne(
      { _id: admin._id },
      { $set: { passwordHash: await bcrypt.hash(parsed.data.newPassword, 12), updatedAt: new Date() } }
    );
  return NextResponse.json({ ok: true });
}
