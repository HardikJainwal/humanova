/**
 * Humanova API Client
 * Base URLs pulled from .env.local — never hardcode in components.
 *
 * createotp  → NEXT_PUBLIC_API_BASE_URL    (port 3000)
 * verifyotp  → NEXT_PUBLIC_VERIFY_API_BASE_URL if set, else same base (port 5000 in curl)
 */

const BASE_URL        = process.env.NEXT_PUBLIC_API_BASE_URL        ?? "";
const VERIFY_BASE_URL = process.env.NEXT_PUBLIC_VERIFY_API_BASE_URL ?? BASE_URL;

/**
 * Core fetch wrapper.
 * @param {string} baseUrl
 * @param {string} path       - e.g. "/student/createotp"
 * @param {RequestInit} opts  - fetch options
 * @param {string} [token]    - Bearer token
 */
async function request(baseUrl, path, opts = {}, token = null) {
  if (!baseUrl) {
    throw new Error("API base URL not set. Check .env.local → NEXT_PUBLIC_API_BASE_URL");
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...opts.headers,
  };

  const res = await fetch(`${baseUrl}${path}`, {
    ...opts,
    headers,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      data?.message || data?.error || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status  = res.status;
    err.data    = data;
    throw err;
  }

  return data;
}

/* ─────────────────────────────────────────────────────────── */
/*  AUTH ENDPOINTS                                             */
/* ─────────────────────────────────────────────────────────── */

/**
 * Step 1 — Send OTP to email.
 * POST /student/createotp  (port 3000)
 */
export async function createOtp(email, token) {
  return request(
    BASE_URL,
    "/student/createotp",
    {
      method: "POST",
      body: JSON.stringify({ email }),
    },
    token
  );
}

/**
 * Step 2 — Verify OTP.
 * POST /student/verifyotp  (port 5000 per curl — uses VERIFY_BASE_URL)
 */
export async function verifyOtp(email, otp, token) {
  return request(
    VERIFY_BASE_URL,
    "/student/verifyotp",
    {
      method: "POST",
      body: JSON.stringify({ email, otp: Number(otp) }),
    },
    token
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  USER / STUDENT ENDPOINTS                                   */
/* ─────────────────────────────────────────────────────────── */

/**
 * Fetch authenticated student/employee details.
 * GET /student/details
 */
export async function getStudentDetails(token) {
  return request(
    BASE_URL,
    "/student/details",
    { method: "GET" },
    token
  );
}

