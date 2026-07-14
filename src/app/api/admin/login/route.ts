import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth";
import { hasDatabase, prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validators";

const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string) {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || record.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  record.count += 1;
  return record.count > 6;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const parsed = loginSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid login details." }, { status: 400 });
  }

  const { email, password } = parsed.data;
  let valid = false;
  let role = "OWNER";

  if (hasDatabase) {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    valid = Boolean(admin && (await bcrypt.compare(password, admin.passwordHash)));
    role = admin?.role ?? role;
  } else if (process.env.ADMIN_PASSWORD_HASH) {
    valid = email === process.env.ADMIN_EMAIL && (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH));
  } else if (process.env.NODE_ENV !== "production") {
    valid = email === "admin@onlycollection.local" && password === "ChangeMe123!";
  }

  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  await setAdminSession(email, role);
  return NextResponse.json({ ok: true });
}
