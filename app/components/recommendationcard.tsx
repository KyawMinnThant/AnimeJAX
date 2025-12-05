"use client";

import Link from "next/link";
import React from "react";
import { FaPlay, FaExternalLinkAlt, FaStar } from "react-icons/fa";

export type Recommendation = {
  entry: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    title: string;
    type?: string;
    episodes?: number | null;
    status?: string;
    score?: number | null;
  };
  votes: number;
};

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
}) => {
  const anime = recommendation.entry;

  const title = anime.title || "Unknown Title";
  const imageUrl =
    anime.images?.jpg?.large_image_url ||
    anime.images?.jpg?.image_url ||
    "/placeholder.jpg";

  return (
    <div
      className="
        w-full
        cursor-pointer 
        group 
        font-mono 
        relative
      "
    >
      {/* CARD IMAGE */}
      <Link
        href={`/anime/${anime.mal_id}`}
        className="relative block w-full h-56 sm:h-64 rounded-lg overflow-hidden shadow-lg"
        tabIndex={-1}
      >
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div
          className="
            absolute inset-0 bg-black/70 
            flex items-center justify-center 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 
            rounded-lg
          "
        >
          <FaPlay className="text-white text-4xl" />
        </div>

        {/* Score Badge */}
        {anime.score !== undefined && anime.score !== null && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1 select-none shadow-lg">
            <FaStar className="text-sm" />
            <span>{anime.score.toFixed(1)}</span>
          </div>
        )}
      </Link>

      {/* TITLE + EXTERNAL LINK */}
      <div className="mt-2 text-white font-semibold text-sm flex justify-between items-start">
        <span className="leading-tight">{title}</span>

        <a
          href={anime.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-purple-400 ml-2 shrink-0"
          title="View on MyAnimeList"
          onClick={(e) => e.stopPropagation()}
        >
          <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
};

export default RecommendationCard;
