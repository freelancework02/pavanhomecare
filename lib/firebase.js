import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCeS7M2tPptsH4YKBT90cvw-MdxCcp14b4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "blessed-hearts.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "blessed-hearts",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "blessed-hearts.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "608426710589",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:608426710589:web:00be31b41dadac9ce1bc54",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XNJ2LVPWLG"
};

// Initialize Firebase (singleton pattern safe for Next.js SSR / HMR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Safe Analytics initialization (runs only in browser environment)
let analytics = null;
if (typeof window !== "undefined") {
  import("firebase/analytics")
    .then(({ getAnalytics, isSupported }) => {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      });
    })
    .catch((err) => {
      console.warn("Firebase Analytics could not be initialized:", err?.message);
    });
}

// Collection name: "PHC-Contact-form-inquiries"
export const INQUIRIES_COLLECTION =
  process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_NAME || "PHC-Contact-form-inquiries";

/**
 * Submits a contact inquiry to Firebase Firestore
 * @param {Object} inquiryData
 * @returns {Promise<{success: boolean, id?: string, error?: string}>}
 */
export async function submitContactInquiry(inquiryData) {
  // 1. Direct write to Firestore
  try {
    const colRef = collection(db, INQUIRIES_COLLECTION);
    const docRef = await addDoc(colRef, {
      ...inquiryData,
      status: "New",
      submittedAt: serverTimestamp(),
      createdAtIso: new Date().toISOString()
    });

    // Asynchronously save local JSON backup without re-writing to Firestore
    if (typeof window !== "undefined") {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inquiryData, id: docRef.id, skipFirestore: true })
      }).catch(() => {});
    }

    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn(`Direct write to Firestore note:`, error?.message);

    // 2. Server API fallback if client Firebase is blocked (e.g. adblocker)
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inquiryData)
        });
        const data = await res.json();
        if (data.success) {
          return { success: true, id: data.id };
        }
      } catch (apiErr) {
        console.error("Server API fallback note:", apiErr);
      }
    }

    return {
      success: false,
      error: error?.message || "Failed to submit inquiry. Please try again."
    };
  }
}

export { app, db, analytics };
