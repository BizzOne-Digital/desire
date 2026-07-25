import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, emailTemplates } from "@/lib/email";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  catalogName: z.string().min(2),
  productDetails: z.string().min(10),
  quantity: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = inquirySchema.parse(body);

    console.log("Product Inquiry Received:", data);

    // Prepare product details for email
    const productDetailsText = `
${data.productDetails}
${data.quantity ? `\nQuantity: ${data.quantity}` : ""}
${data.size ? `\nSize: ${data.size}` : ""}
${data.color ? `\nColor: ${data.color}` : ""}
    `.trim();

    // Send email notification
    const emailTemplate = emailTemplates.productInquiry({
      name: data.name,
      email: data.email,
      phone: data.phone,
      catalogName: data.catalogName,
      productDetails: productDetailsText,
      additionalInfo: data.additionalNotes,
    });
    
    const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;
    
    if (notificationEmail) {
      await sendEmail({
        to: notificationEmail,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });
    }

    return NextResponse.json(
      { message: "Inquiry submitted successfully! We'll respond within 24 hours." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 },
    );
  }
}
