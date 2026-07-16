import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Direct checkout is currently unavailable. Please submit a product inquiry for pricing and availability.",
    },
    { status: 410 },
  );
}
