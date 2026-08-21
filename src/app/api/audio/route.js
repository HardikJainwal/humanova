import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const urlParam = searchParams.get("url");

  let driveId = id;
  if (!driveId && urlParam) {
    const match = urlParam.match(/\/d\/([a-zA-Z0-9_-]+)/) || urlParam.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      driveId = match[1];
    }
  }

  if (!driveId) {
    return NextResponse.json({ error: "Missing audio ID or Google Drive URL" }, { status: 400 });
  }

  const targetUrl = `https://drive.usercontent.google.com/download?id=${driveId}&export=download`;

  try {
    const rangeHeader = request.headers.get("range");
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };
    if (rangeHeader) {
      headers["Range"] = rangeHeader;
    }

    const driveRes = await fetch(targetUrl, {
      headers,
      redirect: "follow",
    });

    const activeRes = (!driveRes.ok && driveRes.status !== 206)
      ? await fetch(`https://docs.google.com/uc?export=download&id=${driveId}`, { headers, redirect: "follow" })
      : driveRes;

    if (!activeRes.ok && activeRes.status !== 206) {
      return NextResponse.json(
        { error: "Failed to fetch audio stream from Drive" },
        { status: activeRes.status }
      );
    }

    const responseHeaders = new Headers();
    const contentType = activeRes.headers.get("content-type");
    responseHeaders.set("Content-Type", contentType && !contentType.includes("html") ? contentType : "audio/mp4");
    
    const contentLength = activeRes.headers.get("content-length");
    if (contentLength) responseHeaders.set("Content-Length", contentLength);
    
    const acceptRanges = activeRes.headers.get("accept-ranges");
    responseHeaders.set("Accept-Ranges", acceptRanges || "bytes");

    const contentRange = activeRes.headers.get("content-range");
    if (contentRange) responseHeaders.set("Content-Range", contentRange);

    responseHeaders.set("Cache-Control", "public, max-age=86400, immutable");

    return new Response(activeRes.body, {
      status: activeRes.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Audio proxy error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
