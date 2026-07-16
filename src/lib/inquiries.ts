import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";
import type { productInquirySchema } from "@/lib/validators";
import type { z } from "zod";

export type ProductInquiryPayload = z.infer<typeof productInquirySchema>;

export type InquiryResult =
  | { ok: true; reference: string; delivery: "stored" }
  | { ok: false; message: string };

export interface InquirySink {
  submit(payload: ProductInquiryPayload): Promise<InquiryResult>;
}

class MongoInquirySink implements InquirySink {
  async submit(payload: ProductInquiryPayload): Promise<InquiryResult> {
    const db = await getMongoDb();
    const result = await db.collection("ProductInquiry").insertOne({
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      catalogId: payload.catalogId,
      productLink: payload.productLink,
      productCode: payload.productCode ?? "",
      requestedSize: payload.requestedSize ?? "",
      requestedColor: payload.requestedColor ?? "",
      quantity: payload.quantity,
      deliveryCountry: payload.deliveryCountry,
      notes: payload.notes ?? "",
      status: "NEW",
      createdAt: new Date(),
    });

    return {
      ok: true,
      reference: result.insertedId.toString(),
      delivery: "stored",
    };
  }
}

class UnconfiguredInquirySink implements InquirySink {
  async submit(): Promise<InquiryResult> {
    return {
      ok: false,
      message:
        "Inquiry delivery is not configured. Add DATABASE_URL for MongoDB storage or connect an email/form provider before accepting inquiries.",
    };
  }
}

export function getInquirySink(): InquirySink {
  // Configure DATABASE_URL in production to store inquiries in MongoDB.
  // A future email provider can implement InquirySink without changing the form or API contract.
  return hasDatabase ? new MongoInquirySink() : new UnconfiguredInquirySink();
}
