/**
 * Humanova Corporate Tambola — Pure utility functions
 * No backend, 100% frontend. localStorage for persistence.
 */

// ── Signals ────────────────────────────────────────────────
export const SIGNALS = [
  [1,  "Employee Wellbeing"],
  [2,  "AI Readiness"],
  [3,  "Open & Honest Communication"],
  [4,  "Workforce Productivity"],
  [5,  "Psychological Safety"],
  [6,  "Leadership Accountability"],
  [7,  "Change Adaptability"],
  [8,  "Mental Health Support"],
  [9,  "Employee Engagement"],
  [10, "Purpose and Meaning"],
  [11, "Learning Mindset"],
  [12, "People Analytics"],
  [13, "Diversity, Equity & Inclusion"],
  [14, "Coaching and Mentoring"],
  [15, "Recognize and Celebrate"],
  [16, "Trust and Respect"],
  [17, "Sustainable Workforce"],
  [18, "Digital Transformation"],
  [19, "Future of Work"],
  [20, "Burnout Prevention"],
  [21, "Upskilling & Reskilling"],
  [22, "Culture of Belonging"],
  [23, "High Performance Culture"],
  [24, "Innovation Mindset"],
  [25, "Ethics and Integrity"],
];

export const FREE_SPACE = [0, "FREE SPACE\nOur People,\nOur Strength"];

export const ADMIN_PIN = "HUMANOVA2026";

// ── Seeded random (deterministic per ticket number) ─────────
export function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  return function () {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(arr, seed) {
  const a = arr.slice();
  const rnd = seededRandom(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Ticket grid (5×5, FREE at center [2][2]) ────────────────
export function makeTicket(ticketNo) {
  const nonFree = SIGNALS.filter((x) => x[0] !== 0);
  const items = shuffle(nonFree, Number(ticketNo) * 1009 + 73);
  const grid = [];
  let idx = 0;
  for (let r = 0; r < 5; r++) {
    const row = [];
    for (let c = 0; c < 5; c++) {
      if (r === 2 && c === 2) row.push(FREE_SPACE);
      else row.push(items[idx++]);
    }
    grid.push(row);
  }
  return grid;
}

// ── localStorage keys ────────────────────────────────────────
export const GAME_KEY = "humanova_tambola_game_v2";
export function marksKey(ticketNo) { return `humanova_tambola_marks_${ticketNo}`; }

export function getGame() {
  if (typeof window === "undefined") return defaultGame();
  try {
    return JSON.parse(localStorage.getItem(GAME_KEY) || "null") || defaultGame();
  } catch {
    return defaultGame();
  }
}

export function saveGame(g) {
  if (typeof window === "undefined") return;
  localStorage.setItem(GAME_KEY, JSON.stringify(g));
}

function defaultGame() {
  return {
    called: [],
    remaining: SIGNALS.map((s) => s[0]),
  };
}

// ── Pattern verification ─────────────────────────────────────
export const PATTERNS = [
  { id: "top",      label: "Top Row",      cells: [[0,0],[0,1],[0,2],[0,3],[0,4]] },
  { id: "middle",   label: "Middle Row",   cells: [[2,0],[2,1],[2,2],[2,3],[2,4]] },
  { id: "bottom",   label: "Bottom Row",   cells: [[4,0],[4,1],[4,2],[4,3],[4,4]] },
  { id: "left",     label: "Left Column",  cells: [[0,0],[1,0],[2,0],[3,0],[4,0]] },
  { id: "diagonal", label: "Diagonal",     cells: [[0,0],[1,1],[2,2],[3,3],[4,4]] },
  { id: "full",     label: "Full House",   cells: Array.from({length:5},(_,r)=>Array.from({length:5},(_,c)=>[r,c])).flat() },
];

export function verifyClaim(ticketNo, patternId, calledSet) {
  const grid = makeTicket(ticketNo);
  const pattern = PATTERNS.find((p) => p.id === patternId);
  if (!pattern) return { valid: false, missing: [] };

  const missing = pattern.cells.filter(([r, c]) => {
    const n = grid[r][c][0];
    return n !== 0 && !calledSet.has(n); // 0 = FREE always valid
  }).map(([r, c]) => grid[r][c]);

  return { valid: missing.length === 0, missing };
}
