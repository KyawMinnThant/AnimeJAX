"use client";

import Link from "next/link";
import React from "react";
import { FaPlay, FaExternalLinkAlt, FaStar, FaTrash } from "react-icons/fa";
import { deleteBookmarkByMalId } from "../lib/bookmarkActions";

// Import SERVER ACTION

export type Anime = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title_english?: string;
  title: string;
  type?: string;
  episodes?: number | null;
  status?: string;
  score?: number | null;
};

interface AnimecardProps {
  anime: Anime;
}

const Bookmarkcard: React.FC<AnimecardProps> = ({ anime }) => {
  const title = anime.title_english || anime.title || "Unknown Title";

  const imageUrl =
    anime.images?.jpg?.large_image_url ||
    anime.images?.jpg?.image_url ||
    "/placeholder.jpg";

  // Client → calls server action
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await deleteBookmarkByMalId(anime.mal_id);

    if (!res.success) {
      alert(res.message || "Delete failed");
      return;
    }

    alert("Deleted");
    window.location.reload();
  };

  const bottomLabel = (() => {
    if (anime.episodes != null) {
      return anime.type
        ? `${anime.type} • Ep ${anime.episodes}`
        : `Ep ${anime.episodes}`;
    }

    if (anime.status?.toLowerCase().includes("airing")) {
      return anime.type
        ? `${anime.type} • Currently Airing`
        : "Currently Airing";
    }

    return anime.type || "Unknown";
  })();

  return (
    <div
      className="
        font-mono cursor-pointer group relative
        w-[30%]
        sm:w-[48%]
        md:w-[31%]
        lg:w-[23%] 
        xl:w-[18%]
      "
    >
      <div className="relative block w-full h-52 sm:h-64 rounded-lg overflow-hidden shadow-lg">
        <Link href={`/anime/${anime.mal_id}`} tabIndex={-1}>
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>

        {/* Hover overlay */}
        <div
          className="
            absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100
            transition-opacity duration-300 flex items-center justify-center 
            rounded-lg
          "
        >
          <FaPlay className="text-white text-4xl" />

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="absolute top-3 right-3 text-red-400 hover:text-red-500 p-2 rounded-full bg-black/40"
          >
            <FaTrash className="text-lg" />
          </button>
        </div>

        {anime.score != null && (
          <div
            className="
              absolute top-2 left-2 bg-yellow-400 text-black text-xs 
              font-semibold px-2 py-0.5 rounded flex items-center gap-1 
              shadow-lg select-none
            "
          >
            <FaStar className="text-sm" />
            <span>{anime.score.toFixed(1)}</span>
          </div>
        )}

        <div
          className="
            absolute bottom-0 left-0 right-0 
            bg-purple-500 text-white text-xs px-2 py-1 rounded-b-lg select-none
          "
        >
          {bottomLabel}
        </div>
      </div>

      <div className="mt-2 text-white font-semibold text-sm flex justify-between items-center">
        <span className="truncate max-w-[85%]">{title}</span>
        <a
          href={anime.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-purple-400 ml-2"
        >
          <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
};

export default Bookmarkcard;
