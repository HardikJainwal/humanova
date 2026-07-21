/**
 * Humanova Leave Management API Service
 * Dedicated service for user leaves (port 3000 / NEXT_PUBLIC_API_BASE_URL)
 * and org/admin leaves (port 5000 / NEXT_PUBLIC_VERIFY_API_BASE_URL or fallback)
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const ORG_BASE_URL = process.env.NEXT_PUBLIC_VERIFY_API_BASE_URL ?? BASE_URL;

/**
 * Helper request wrapper
 */
async function request(baseUrl, path, opts = {}, token = null) {
  if (!baseUrl) {
    throw new Error("API base URL is not configured.");
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
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

/* ─────────────────────────────────────────────────────────── */
/*  USER LEAVE ENDPOINTS                                       */
/* ─────────────────────────────────────────────────────────── */

/**
 * Fetch current user's leave requests history.
 * GET /leave/my
 */
export async function getMyLeaves(token) {
  return request(BASE_URL, "/leave/my", { method: "GET" }, token);
}

/**
 * Apply for a new leave request.
 * POST /leave/apply
 * @param {Object} payload - { reason, type, fromDate, toDate }
 */
export async function applyLeave(payload, token) {
  return request(
    BASE_URL,
    "/leave/apply",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  ADMIN LEAVE ENDPOINTS                                      */
/* ─────────────────────────────────────────────────────────── */

/**
 * Fetch all leave requests in the system.
 * GET /leave/all
 */
export async function getAllLeaveRequests(token) {
  return request(BASE_URL, "/leave/all", { method: "GET" }, token);
}

/**
 * Update the status of a leave request.
 * PATCH /leave/:id/status
 * @param {string} id - Leave request ID
 * @param {Object} payload - { status, adminResponse }
 */
export async function updateLeaveRequestStatus(id, payload, token) {
  return request(
    BASE_URL,
    `/leave/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
    token
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  ORGANIZATION LEAVE / HOLIDAY ENDPOINTS                     */
/* ─────────────────────────────────────────────────────────── */

/**
 * Fetch all organization leaves / holidays.
 * GET /org-leave
 */
export async function getAllOrgLeaves(token) {
  return request(ORG_BASE_URL, "/org-leave", { method: "GET" }, token);
}

/**
 * Create a new organization holiday or policy leaf.
 * POST /org-leave
 * @param {Object} payload - { type, name, count, fromDate, toDate, year, timeZone, description }
 */
export async function createOrgLeave(payload, token) {
  return request(
    ORG_BASE_URL,
    "/org-leave",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );
}

/**
 * Fetch a single organization leave/holiday detail.
 * GET /org-leave/:id
 */
export async function getOrgLeaveById(id, token) {
  return request(ORG_BASE_URL, `/org-leave/${id}`, { method: "GET" }, token);
}

/**
 * Update an organization holiday / policy.
 * PATCH /org-leave/:id
 * @param {string} id - Holiday ID
 * @param {Object} payload - Fields to update
 */
export async function updateOrgLeave(id, payload, token) {
  return request(
    ORG_BASE_URL,
    `/org-leave/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
    token
  );
}

/**
 * Delete an organization holiday / policy.
 * DELETE /org-leave/:id
 */
export async function deleteOrgLeave(id, token) {
  return request(
    ORG_BASE_URL,
    `/org-leave/${id}`,
    {
      method: "DELETE",
    },
    token
  );
}
