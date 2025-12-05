"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

type Anime = {
  mal_id: number;
  title: string;
  images: {
    jpg: { image_url: string };
  };
};

interface Props {
  onSelect: (anime: Anime) => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SearchBarDropdown = ({ onSelect }: Props) => {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Jikan SWR request
  const { data, isLoading } = useSWR(
    debounced ? `https://api.jikan.moe/v4/anime?q=${debounced}&limit=8` : null,
    fetcher
  );

  const results: Anime[] = data?.data || [];

  return (
    <div className="relative w-full max-w-md">
      {/* Input */}
      <input
        type="text"
        placeholder="Search anime..."
        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-black text-white"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!e.target.value) setOpen(false);
          else setOpen(true);
        }}
      />

      {/* Dropdown */}
      {open && debounced && (
        <div className="absolute mt-2 w-full bg-[#0f0f0f] border border-gray-700 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
          {/* Loading */}
          {isLoading && (
            <p className="p-3 text-gray-400 text-sm">Searching...</p>
          )}

          {/* Results */}
          {!isLoading &&
            results.map((anime) => (
              <Link
                href={`/anime/${anime?.mal_id}`}
                key={anime.mal_id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  onSelect(anime);
                  setQuery(anime.title);
                  setOpen(false);
                }}
              >
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-10 h-14 rounded object-cover"
                />
                <p className="text-white">{anime.title}</p>
              </Link>
            ))}

          {/* No results */}
          {!results && (
            <p className="p-3 text-gray-400 text-sm">No anime found.</p>
          )}
          {!isLoading && results.length === 0 && (
            <p className="p-3 text-gray-400 text-sm">No anime found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarDropdown;
