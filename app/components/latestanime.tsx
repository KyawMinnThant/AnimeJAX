"use client";

import React from "react";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

type Anime = {
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
  type: string;
  episodes: number | null;
};

interface LatestanimeProps {
  animeList: Anime[];
}

const Latestanimecard: React.FC<LatestanimeProps> = ({ animeList }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {animeList && animeList.length === 0 && (
        <p className="text-white font-mono">No latest anime available.</p>
      )}

      {animeList?.map((anime) => {
        const title = anime.title_english || anime.title || "Unknown Title";
        const imageUrl =
          anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

        return (
          <Link
            key={anime.mal_id}
            href={`/anime/${anime.mal_id}`}
            className="relative w-48 cursor-pointer group"
          >
            {/* Image */}
            <div className="relative w-48 h-64 rounded-lg overflow-hidden shadow-lg">
              <img
                src={imageUrl}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Overlay with play icon */}
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-lg">
                <FaPlay className="text-white text-4xl" />
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-purple-500 text-white text-xs flex justify-between px-2 py-1 rounded-b-lg select-none">
                <span>{anime.type}</span>
                <span>
                  {anime.episodes !== null
                    ? `Ep ${anime.episodes}`
                    : "Episodes ?"}
                </span>
              </div>
            </div>

            {/* Title below card */}
            <div className="mt-2 text-center text-white text-sm font-semibold  max-w-[192px]">
              {title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Latestanimecard;
