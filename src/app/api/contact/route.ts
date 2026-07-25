import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";
import { contactSchema } from "@/lib/validators";
import { sendEmail, emailTemplates } from "@/lib/email";

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the highlighted fields." }, { status: 400 });
  }

  // Save to database if available
  if (hasDatabase) {
    const db = await getMongoDb();
    await db.collection("ContactSubmission").insertOne({
      ...parsed.data,
      status: "UNREAD",
      createdAt: new Date()
    });
  }

  // Send email notification
  const emailTemplate = emailTemplates.contactForm(parsed.data);
  const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;
  
  if (notificationEmail) {
    await sendEmail({
      to: notificationEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Message sent successfully! We'll get back to you soon."
  });
}
