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
} from "firebase/firestore";
import { authenticateAdminRequest } from "@/lib/adminAuthServer";

const PRIMARY_COLLECTION = "PHC-Contact-form-inquiries";
const CHATBOT_COLLECTION = "PHC-Chatbot-inquiries";

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
      console.error("Error fetching from primary inquiries collection:", err);
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

    const docRef = doc(db, collectionName, id);
    const updates = {
      updatedAtIso: new Date().toISOString()
    };
    if (status !== undefined) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;

    await updateDoc(docRef, updates);

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

    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);

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
