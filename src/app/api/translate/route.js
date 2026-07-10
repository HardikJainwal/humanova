/**
 * POST /api/translate
 * Server-side proxy for Google Translate free endpoint.
 * Used only for transliterating user names (e.g., "Rahul" → "ராகுல்").
 *
 * Body: { text: string, targetLang: string }
 * Returns: { translated: string }
 */

const cache = new Map();

export async function POST(request) {
  try {
    const { text, targetLang } = await request.json();

    if (!text || !targetLang || targetLang === "en") {
      return Response.json({ translated: text });
    }

    const cacheKey = `${targetLang}:${text}`;
    if (cache.has(cacheKey)) {
      return Response.json({ translated: cache.get(cacheKey) });
    }

    const url = new URL("https://translate.googleapis.com/translate_a/single");
    url.searchParams.set("client", "gtx");
    url.searchParams.set("sl", "en");
    url.searchParams.set("tl", targetLang);
    url.searchParams.set("dt", "t");
    url.searchParams.set("q", text);

    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!res.ok) {
      // Fallback — return original text
      return Response.json({ translated: text });
    }

    const data = await res.json();
    // Response shape: [[["translated","original",...],...],...]
    const translated = data?.[0]?.[0]?.[0] ?? text;

    // Cache it (max 500 entries to avoid memory leak)
    if (cache.size > 500) cache.clear();
    cache.set(cacheKey, translated);

    return Response.json({ translated });
  } catch {
    return Response.json({ translated: "" }, { status: 500 });
  }
}
