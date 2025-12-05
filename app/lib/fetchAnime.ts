// lib/fetchAnime.ts

export async function fetchAnimeSearch(query: string) {
  if (!query) return [];

  const res = await fetch(`/api/anime/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch anime search results");
  }
  const json = await res.json();
  return json.data || [];
}
