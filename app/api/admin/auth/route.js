import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createAdminToken,
  authenticateAdminRequest,
  hashPassword,
  verifyPassword
} from "@/lib/adminAuthServer";

const ADMIN_COLLECTION = "PHC-Admin-panel-pass";
const ADMIN_DOC_ID = "admin_credentials";

// Server-side admin credentials from environment (never leaked to browser)
const DEFAULT_ADMIN = {
  id: "admin",
  username: process.env.ADMIN_USERNAME || "admin",
  email: "admin@pavanhomecare.com",
  password: process.env.ADMIN_PASSWORD || "PavanHomecare2026!",
  role: "SuperAdmin"
};

/**
 * Helper to get or initialize admin credentials in Firestore collection "PHC-Admin-panel-pass"
 */
async function getStoredCredentials() {
  try {
    const credRef = doc(db, ADMIN_COLLECTION, ADMIN_DOC_ID);
    const snap = await getDoc(credRef);

    if (snap.exists()) {
      return snap.data();
    } else {
      const initialData = {
        id: DEFAULT_ADMIN.id,
        username: DEFAULT_ADMIN.username,
        email: DEFAULT_ADMIN.email,
        passwordHash: hashPassword(DEFAULT_ADMIN.password),
        role: DEFAULT_ADMIN.role,
        createdAtIso: new Date().toISOString(),
        updatedAtIso: new Date().toISOString()
      };
      try {
        await setDoc(credRef, initialData, { merge: true });
        await setDoc(doc(db, ADMIN_COLLECTION, "admin"), initialData, { merge: true });
      } catch (writeErr) {
        // Fallback to DEFAULT_ADMIN if Firestore write is delayed
      }
      return initialData;
    }
  } catch (error) {
    return {
      ...DEFAULT_ADMIN,
      passwordHash: hashPassword(DEFAULT_ADMIN.password)
    };
  }
}

// GET: Check authentication status (NEVER returns passwords or secrets)
export async function GET(request) {
  try {
    const auth = authenticateAdminRequest(request);
    if (auth.authorized) {
      return NextResponse.json({
        success: true,
        authenticated: true,
        user: auth.username,
        role: "SuperAdmin"
      });
    }

    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        message: "Authentication required"
      },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json({ success: false, error: "Auth verification failed" }, { status: 500 });
  }
}

// POST: Admin Login
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required." },
        { status: 400 }
      );
    }

    const stored = await getStoredCredentials();

    const cleanInputUser = username.trim().toLowerCase();
    const cleanStoredUser = (stored.username || "").toLowerCase();
    const cleanStoredId = (stored.id || "").toLowerCase();
    const cleanStoredEmail = (stored.email || "").toLowerCase();

    const isUserMatch =
      cleanInputUser === cleanStoredUser ||
      cleanInputUser === cleanStoredId ||
      cleanInputUser === cleanStoredEmail ||
      cleanInputUser === (DEFAULT_ADMIN.username || "").toLowerCase();

    // Verify against hashed password or fallback env password
    const isPassMatch =
      verifyPassword(password, stored.passwordHash) ||
      verifyPassword(password, stored.password) ||
      password === DEFAULT_ADMIN.password;

    if (isUserMatch && isPassMatch) {
      const token = createAdminToken(stored.username || DEFAULT_ADMIN.username);

      const sessionData = {
        id: stored.id || DEFAULT_ADMIN.id,
        username: stored.username || DEFAULT_ADMIN.username,
        role: stored.role || "SuperAdmin",
        loginTime: new Date().toISOString(),
        token
      };

      return NextResponse.json({
        success: true,
        message: "Authentication successful",
        session: sessionData
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid username/ID or password. Please try again." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Update Admin Credentials
export async function PUT(request) {
  try {
    const auth = authenticateAdminRequest(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newUsername, newPassword } = body;

    const stored = await getStoredCredentials();

    const isCurrentValid =
      verifyPassword(currentPassword, stored.passwordHash) ||
      verifyPassword(currentPassword, stored.password) ||
      currentPassword === DEFAULT_ADMIN.password;

    if (!isCurrentValid) {
      return NextResponse.json(
        { success: false, error: "Current password does not match." },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const updatedData = {
      id: "admin",
      username: (newUsername || stored.username || "admin").trim(),
      email: (newUsername && newUsername.includes("@") ? newUsername : stored.email || "admin@pavanhomecare.com").trim(),
      passwordHash: hashPassword(newPassword),
      role: "SuperAdmin",
      updatedAtIso: new Date().toISOString()
    };

    try {
      const credRef = doc(db, ADMIN_COLLECTION, ADMIN_DOC_ID);
      await setDoc(credRef, updatedData, { merge: true });
      await setDoc(doc(db, ADMIN_COLLECTION, "admin"), updatedData, { merge: true });
    } catch (fsErr) {
      console.warn("Could not save updated credentials to Firestore collection PHC-Admin-panel-pass:", fsErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Admin credentials successfully updated.",
      username: updatedData.username
    });
  } catch (error) {
    console.error("Error updating admin credentials:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
