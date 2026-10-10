// src/lib/api.js
// সব API call একজায়গায় + fallback URLs

const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// ============================
// Fallback সহ fetch
// ============================
async function smartFetch(path) {
  for (const base of BASE_URLS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`${base}${path}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) continue;
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) return data;
      if (data && !Array.isArray(data)) return data;
      // empty array → next URL try
    } catch (err) {
      console.warn(`Failed: ${base}${path}`);
      continue;
    }
  }
  return null;
}

// ============================
// 1. সব পণ্য
// ============================
export async function getAllProducts() {
  const data = await smartFetch("/products");
  return Array.isArray(data) ? data : [];
}

// ============================
// 2. সব ক্যাটাগরি
// ============================
export async function getAllCategories() {
  const data = await smartFetch("/categories");
  return Array.isArray(data) ? data : [];
}

// ============================
// 3. ক্যাটাগরির পণ্য (all products থেকে filter — API filter ভরসা না)
// ============================
export async function getProductsByCategory(slug) {
  const all = await getAllProducts();
  return all.filter((p) => p.category === slug);
}

// ============================
// 4. Single product (slug দিয়ে)
// ============================
export async function getProductBySlug(slug) {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) || null;
}

// ============================
// 5. Single category (slug দিয়ে)
// ============================
export async function getCategoryBySlug(slug) {
  const all = await getAllCategories();
  return all.find((c) => c.slug === slug) || null;
}

// ============================
// 6. Top Risers
// ============================
export async function getTopRisers(limit = 6) {
  const all = await getAllProducts();
  return all
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

// ============================
// 7. Top Fallers
// ============================
export async function getTopFallers(limit = 6) {
  const all = await getAllProducts();
  return all
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, limit);
}