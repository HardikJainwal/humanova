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

/**
 * Fetch detailed badge information for student.
 * GET /student/badges/details
 */
export async function getStudentBadgesDetails(token) {
  return request(
    BASE_URL,
    "/student/badges/details",
    { method: "GET" },
    token
  );
}

export async function getBookingStatus(status = "pending", token, userType = "serviceTaker", organizationId = "") {
  const query = new URLSearchParams();
  if (status) query.append("bookingStatus", status);
  if (userType) query.append("userType", userType);
  if (organizationId) query.append("organizationId", organizationId);

  const queryString = query.toString() ? `?${query.toString()}` : "";
  return request(
    BASE_URL,
    `/student/booking-status${queryString}`,
    { method: "GET" },
    token
  );
}



/* ─────────────────────────────────────────────────────────── */
/*  ATTENDANCE ENDPOINTS                                       */
/* ─────────────────────────────────────────────────────────── */

/**
 * Clock-in / Check-in to attendance.
 * POST /attendance/check-in
 */
export async function checkIn(payload, token) {
  return request(
    BASE_URL,
    "/attendance/check-in",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );
}

/**
 * Clock-out / Check-out from attendance.
 * POST /attendance/check-out
 */
export async function checkOut(payload, token) {
  return request(
    BASE_URL,
    "/attendance/check-out",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );
}

/**
 * Fetch attendance history.
 * GET /attendance/history
 */
export async function getAttendanceHistory(token) {
  return request(
    BASE_URL,
    "/attendance/history",
    { method: "GET" },
    token
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  COMMUNITY ENDPOINTS                                        */
/* ─────────────────────────────────────────────────────────── */

/**
 * Fetch all community groups.
 * GET /communityGroup
 */
export async function getAllCommunityGroups(token) {
  return request(BASE_URL, "/communityGroup", { method: "GET" }, token);
}

/**
 * Join a community group.
 * POST /communityGroup/:groupCode/join
 */
export async function joinCommunityGroup(groupCode, token) {
  return request(
    BASE_URL,
    `/communityGroup/${groupCode}/join`,
    {
      method: "POST",
      body: JSON.stringify({ role: "student" }),
    },
    token
  );
}

/**
 * Leave a community group.
 * DELETE /communityGroup/:groupCode/leave
 */
export async function leaveCommunityGroup(groupCode, token) {
  return request(
    BASE_URL,
    `/communityGroup/${groupCode}/leave`,
    {
      method: "DELETE",
      body: JSON.stringify({ role: "student" }),
    },
    token
  );
}

/**
 * Fetch community feed posts.
 * GET /school/communityPost/feed
 */
export async function getCommunityFeed(token) {
  return request(BASE_URL, "/school/communityPost/feed", { method: "GET" }, token);
}

/**
 * React to a post (add reaction).
 * POST /student/community/react
 */
export async function addPostReaction(postId, reaction, token) {
  return request(
    BASE_URL,
    "/student/community/react",
    {
      method: "POST",
      body: JSON.stringify({ postId, reaction }),
    },
    token
  );
}

/**
 * Vote in a poll.
 * POST /school/poll/vote
 */
export async function votePoll(postId, optionIndex, token) {
  return request(
    BASE_URL,
    "/school/poll/vote",
    {
      method: "POST",
      body: JSON.stringify({ postId, optionIndex: String(optionIndex) }),
    },
    token
  );
}

/**
 * Fetch trending posts.
 * GET /trending
 */
export async function getTrendingPosts(token) {
  return request(BASE_URL, "/trending", { method: "GET" }, token);
}

/**
 * Get comments for a post.
 * GET /comment/:postId
 */
export async function getComments(postId, token) {
  return request(BASE_URL, `/comment/${postId}`, { method: "GET" }, token);
}

/**
 * Add a comment.
 * POST /comment
 */
export async function addComment(postId, content, token) {
  return request(
    BASE_URL,
    "/comment",
    {
      method: "POST",
      body: JSON.stringify({ postId, content }),
    },
    token
  );
}

/**
 * Edit a comment.
 * PUT /comment/:commentId
 */
export async function editComment(commentId, content, token) {
  return request(
    BASE_URL,
    `/comment/${commentId}`,
    {
      method: "PUT",
      body: JSON.stringify({ content }),
    },
    token
  );
}

/**
 * Delete a comment.
 * DELETE /comment/:commentId
 */
export async function deleteComment(commentId, token) {
  return request(
    BASE_URL,
    `/comment/${commentId}`,
    {
      method: "DELETE",
      body: JSON.stringify({}),
    },
    token
  );
}

/**
 * Toggle bookmark on a post.
 * POST /community-bookmark/toggle/:postId
 */
export async function toggleBookmark(postId, token) {
  return request(
    BASE_URL,
    `/community-bookmark/toggle/${postId}`,
    {
      method: "POST",
      body: JSON.stringify({}),
    },
    token
  );
}

/**
 * Fetch bookmarked posts for current user.
 * GET /community-bookmark/my-bookmarks
 */
export async function getMyBookmarks(token) {
  return request(
    BASE_URL,
    "/community-bookmark/my-bookmarks",
    { method: "GET" },
    token
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  RESOURCE / DISCOVERY ENDPOINTS                              */
/* ─────────────────────────────────────────────────────────── */

/**
 * Fetch discovery resources (articles, audios, youtube, videos).
 * GET /superAdmin/resource?type={type}&limit={limit}&schoolId={schoolId}
 * If isGlobal is true or schoolId is not provided, schoolId param is omitted.
 */
export async function getResources({ type = "", limit = 100, schoolId = null, isGlobal = false } = {}, token) {
  const query = new URLSearchParams();
  if (type && type !== "all") query.append("type", type);
  if (limit) query.append("limit", String(limit));
  if (!isGlobal && schoolId) query.append("schoolId", schoolId);

  const queryString = query.toString() ? `?${query.toString()}` : "";
  return request(
    BASE_URL,
    `/superAdmin/resource${queryString}`,
    { method: "GET" },
    token
  );
}





