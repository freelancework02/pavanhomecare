import { NextResponse } from "next/server";
import { submitContactInquiry, INQUIRIES_COLLECTION } from "@/lib/firebase";

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.firstName || (!data.phone && !data.email)) {
      return NextResponse.json(
        { success: false, error: "First name and either phone or email are required." },
        { status: 400 }
      );
    }

    const result = await submitContactInquiry({
      ...data,
      submittedVia: "api_route"
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          collection: INQUIRIES_COLLECTION
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: result.id,
        message: "Inquiry saved successfully",
        collection: INQUIRIES_COLLECTION
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
