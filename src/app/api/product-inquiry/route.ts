import { NextResponse } from "next/server";
import { getCatalogs } from "@/lib/catalog-store";
import { getInquirySink } from "@/lib/inquiries";
import { productInquirySchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = productInquirySchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields." },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json(
      { error: "Unable to accept this inquiry." },
      { status: 400 },
    );
  }

  const catalogs = await getCatalogs();
  if (!catalogs.some((catalog) => catalog.id === parsed.data.catalogId)) {
    return NextResponse.json(
      { error: "Selected catalog is not available." },
      { status: 400 },
    );
  }

  const sink = getInquirySink();
  const result = await sink.submit(parsed.data);

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    reference: result.reference,
    message:
      "Inquiry stored. We will confirm price and availability before any order is created.",
  });
}
