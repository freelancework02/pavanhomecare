import crypto from "crypto";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "phc_default_secure_secret_pavan_2026";
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Creates a signed admin session token
 * @param {string} username
 * @returns {string}
 */
export function createAdminToken(username = "admin") {
  const payload = {
    u: username,
    iat: Date.now(),
    exp: Date.now() + TOKEN_TTL_MS
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${signature}`;
}

/**
 * Verifies if an admin session token is valid and not expired
 * @param {string} token
 * @returns {{ valid: boolean, username?: string, error?: string }}
 */
export function verifyAdminToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return { valid: false, error: "Missing or malformed authorization token" };
  }

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) {
    return { valid: false, error: "Invalid token structure" };
  }

  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadB64)
    .digest("base64url");

  // Constant-time comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature);
  const expBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
    return { valid: false, error: "Invalid token signature" };
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8"));
    if (payload.exp && Date.now() > payload.exp) {
      return { valid: false, error: "Session expired. Please log in again." };
    }
    return { valid: true, username: payload.u };
  } catch (err) {
    return { valid: false, error: "Corrupted token payload" };
  }
}

/**
 * Validates request authorization header
 * @param {Request} request
 * @returns {{ authorized: boolean, username?: string, error?: string }}
 */
export function authenticateAdminRequest(request) {
  const authHeader = request.headers.get("authorization") || request.headers.get("x-admin-token") || "";
  let token = "";
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  } else {
    token = authHeader.trim();
  }

  const result = verifyAdminToken(token);
  if (!result.valid) {
    return { authorized: false, error: result.error || "Unauthorized access." };
  }
  return { authorized: true, username: result.username };
}

/**
 * Computes a secure one-way hash for passwords
 * @param {string} password
 * @returns {string}
 */
export function hashPassword(password) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(password).digest("hex");
}

/**
 * Verifies a password against a stored hash or plaintext password
 * @param {string} inputPassword
 * @param {string} storedHashOrPlain
 * @returns {boolean}
 */
export function verifyPassword(inputPassword, storedHashOrPlain) {
  if (!inputPassword || !storedHashOrPlain) return false;
  const computed = hashPassword(inputPassword);
  if (computed === storedHashOrPlain) return true;
  // Fallback for legacy plaintext password check (e.g. from environment variable)
  if (inputPassword === storedHashOrPlain) return true;
  return false;
}
