import { NextResponse } from "next/server";
import { z } from "zod";

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

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM or notification system

    console.log("Product Inquiry Received:", data);

    // For now, we'll just return success
    // You can integrate with email services like SendGrid, Resend, etc.
    return NextResponse.json(
      { message: "Inquiry submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 },
    );
  }
}
