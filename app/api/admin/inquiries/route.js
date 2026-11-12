import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore/lite";
import fs from "fs";
import path from "path";
import { authenticateAdminRequest } from "@/lib/adminAuthServer";

const PRIMARY_COLLECTION = "PHC-Contact-form-inquiries";
const CHATBOT_COLLECTION = "PHC-Chatbot-inquiries";
const DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_INQUIRIES_FILE = path.join(DATA_DIR, "inquiriesData.json");

function getLocalInquiries() {
  try {
    if (fs.existsSync(LOCAL_INQUIRIES_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_INQUIRIES_FILE, "utf-8") || "[]");
    }
  } catch (err) {
    console.warn("Could not read local inquiries:", err.message);
  }
  return [];
}

function updateLocalInquiry(id, updates) {
  try {
    const list = getLocalInquiries();
    const updated = list.map((item) => (item.id === id ? { ...item, ...updates } : item));
    fs.writeFileSync(LOCAL_INQUIRIES_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not update local inquiry:", err.message);
  }
}

function deleteLocalInquiry(id) {
  try {
    const list = getLocalInquiries();
    const filtered = list.filter((item) => item.id !== id);
    fs.writeFileSync(LOCAL_INQUIRIES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not delete local inquiry:", err.message);
  }
}

// GET: Fetch all inquiries (Admin authentication required)
export async function GET(request) {
  const auth = authenticateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Valid admin session required." },
      { status: 401 }
    );
  }

  try {
    const inquiries = [];

    // 1. Fetch from primary inquiries collection
    try {
      const colRef = collection(db, PRIMARY_COLLECTION);
      let snap;
      try {
        const q = query(colRef, orderBy("submittedAt", "desc"));
        snap = await getDocs(q);
      } catch (e) {
        snap = await getDocs(colRef);
      }

      snap.forEach((d) => {
        const data = d.data();
        inquiries.push({
          id: d.id,
          collection: PRIMARY_COLLECTION,
          ...data,
          submittedAt: data.submittedAt?.toDate
            ? data.submittedAt.toDate().toISOString()
            : data.createdAtIso || new Date().toISOString()
        });
      });
    } catch (err) {
      console.warn("Firestore primary inquiries read warning:", err.message);
    }

    // 2. Also check secondary chatbot inquiries collection if any exist
    try {
      const chatColRef = collection(db, CHATBOT_COLLECTION);
      const chatSnap = await getDocs(chatColRef);
      chatSnap.forEach((d) => {
        const data = d.data();
        if (!inquiries.some((item) => item.id === d.id)) {
          inquiries.push({
            id: d.id,
            collection: CHATBOT_COLLECTION,
            source: "chatbot",
            ...data,
            submittedAt: data.submittedAt?.toDate
              ? data.submittedAt.toDate().toISOString()
              : data.createdAtIso || new Date().toISOString()
          });
        }
      });
    } catch (chatErr) {
      // Secondary collection may not exist yet, ignore
    }

    // 3. Merge with local backup file (strictly de-duplicate by ID, email, and phone)
    const localRecords = getLocalInquiries();
    localRecords.forEach((localItem) => {
      const isDuplicate = inquiries.some(
        (item) =>
          item.id === localItem.id ||
          (item.email &&
            localItem.email &&
            item.email.toLowerCase().trim() === localItem.email.toLowerCase().trim() &&
            item.phone &&
            localItem.phone &&
            item.phone.replace(/\D/g, "") === localItem.phone.replace(/\D/g, ""))
      );
      if (!isDuplicate) {
        inquiries.push(localItem);
      }
    });

    // Sort descending by date
    inquiries.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error) {
    console.error("Admin inquiries fetch error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Update status or notes of an inquiry
export async function PATCH(request) {
  const auth = authenticateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Valid admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, collectionName = PRIMARY_COLLECTION, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Inquiry ID is required" }, { status: 400 });
    }

    const updates = {
      updatedAtIso: new Date().toISOString()
    };
    if (status !== undefined) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;

    // Update in Firestore
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updates);
    } catch (fsErr) {
      console.warn("Firestore update warning:", fsErr.message);
    }

    // Update in local file
    updateLocalInquiry(id, updates);

    return NextResponse.json({
      success: true,
      message: "Inquiry updated successfully",
      id,
      updates
    });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an inquiry
export async function DELETE(request) {
  const auth = authenticateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Valid admin session required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const collectionName = searchParams.get("collection") || PRIMARY_COLLECTION;

    if (!id) {
      return NextResponse.json({ success: false, error: "Inquiry ID is required" }, { status: 400 });
    }

    // Delete in Firestore
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (fsErr) {
      console.warn("Firestore delete warning:", fsErr.message);
    }

    // Delete in local file
    deleteLocalInquiry(id);

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
      id
    });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
