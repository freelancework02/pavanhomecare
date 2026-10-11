import { NextResponse } from "next/server";
import { submitContactInquiry, INQUIRIES_COLLECTION } from "@/lib/firebase";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_INQUIRIES_FILE = path.join(DATA_DIR, "inquiriesData.json");

function saveLocalInquiry(record) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    let records = [];
    if (fs.existsSync(LOCAL_INQUIRIES_FILE)) {
      records = JSON.parse(fs.readFileSync(LOCAL_INQUIRIES_FILE, "utf-8") || "[]");
    }
    records = [record, ...records.filter((r) => r.id !== record.id)].slice(0, 500);
    fs.writeFileSync(LOCAL_INQUIRIES_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not save local inquiry backup:", err.message);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.firstName || (!data.phone && !data.email)) {
       return NextResponse.json(
        { success: false, error: "First name and either phone or email are required." },
        { status: 400 }
      );
    }

    const inquiryId = data.id || `inq_${Date.now()}`;
    const inquiryRecord = {
      id: inquiryId,
      collection: INQUIRIES_COLLECTION,
      ...data,
      status: "New",
      submittedAt: new Date().toISOString(),
      createdAtIso: new Date().toISOString()
    };
    saveLocalInquiry(inquiryRecord);

    if (data.skipFirestore) {
      return NextResponse.json({
        success: true,
        id: inquiryId,
        message: "Inquiry saved to local database",
        collection: INQUIRIES_COLLECTION
      });
    }

    const result = await submitContactInquiry({
      ...data,
      submittedVia: "api_route"
    });

    return NextResponse.json(
      {
        success: true,
        id: result.id || inquiryId,
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
