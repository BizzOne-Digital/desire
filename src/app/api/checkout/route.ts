import { NextResponse } from "next/server";
import Stripe from "stripe";
import { hasDatabase } from "@/lib/db";
import { getMongoDb, ObjectId } from "@/lib/mongodb";
import { checkoutSchema } from "@/lib/validators";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" })
  : null;

export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Checkout details are incomplete." }, { status: 400 });
  }

  const data = parsed.data;
  const subtotal = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 14;
  const total = subtotal + shipping;
  const orderNumber = `OC-${Date.now().toString().slice(-8)}`;

  if (stripe) {
    await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "cad",
      receipt_email: data.email,
      metadata: { orderNumber }
    });
  }

  if (hasDatabase) {
    const db = await getMongoDb();
    const now = new Date();
    await db.collection("Customer").updateOne(
      { email: data.email },
      {
        $set: { name: data.name, phone: data.phone, updatedAt: now },
        $setOnInsert: { email: data.email, createdAt: now }
      },
      { upsert: true }
    );
    const customer = await db.collection("Customer").findOne<{ _id: ObjectId }>({
      email: data.email
    });

    const order = await db.collection("Order").insertOne({
        orderNumber,
        customerId: customer?._id,
        email: data.email,
        phone: data.phone,
        shippingName: data.name,
        shippingLine1: data.line1,
        shippingLine2: data.line2,
        shippingCity: data.city,
        shippingRegion: data.region,
        shippingPostal: data.postal,
        shippingCountry: data.country,
        subtotal,
        shipping,
        total,
        paymentStatus: stripe ? "UNPAID" : "PAID",
        status: "CONFIRMED",
        shippingStatus: "NOT_SHIPPED",
        discount: 0,
        tax: 0,
        notes: data.notes,
        createdAt: now,
        updatedAt: now
    });

    await db.collection("OrderItem").insertMany(
      data.items.map((item) => ({
        orderId: order.insertedId,
        productId: ObjectId.isValid(item.id) ? new ObjectId(item.id) : undefined,
        title: item.title,
        imageUrl: item.image,
        quantity: item.quantity,
        price: item.price
      }))
    );
  }

  return NextResponse.json({ ok: true, orderNumber });
}
