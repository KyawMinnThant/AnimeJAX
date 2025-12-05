"use client";
import { motion } from "framer-motion";

import Link from "next/link";
import React from "react";
import { FaPlay, FaExternalLinkAlt, FaStar } from "react-icons/fa";

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

const Animecard: React.FC<AnimecardProps> = ({ anime }) => {
  const title = anime.title_english || anime.title || "Unknown Title";

  const imageUrl =
    anime.images?.jpg?.large_image_url ||
    anime.images?.jpg?.image_url ||
    "/placeholder.jpg";

  const bottomLabel = (() => {
    if (anime.episodes !== undefined && anime.episodes !== null) {
      return anime.type
        ? `${anime.type} • Ep ${anime.episodes}`
        : `Ep ${anime.episodes}`;
    }

    if (anime.status && anime.status.toLowerCase().includes("airing")) {
      return anime.type
        ? `${anime.type} • Currently Airing`
        : "Currently Airing";
    }

    return anime.type || "Unknown";
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        font-mono cursor-pointer group relative

        /* Mobile: 100% */
        w-[42%]

        /* Tablet: 48% */
        sm:w-[50%]

        /* Medium screens: 30% */
        md:w-[31%]

        /* Large screens: same as your old layout */
        lg:w-[23%] 
        xl:w-[18%]
      "
    >
      <Link
        href={`/anime/${anime.mal_id}`}
        className="
          relative block w-full 

          /* Mobile height */
          h-52  

          /* Larger screens */
          sm:h-64
          rounded-lg overflow-hidden shadow-lg
        "
        tabIndex={-1}
      >
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Hover Overlay */}
        <div
          className="
          absolute inset-0 bg-black/70 flex items-center justify-center 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 
          rounded-lg
        "
        >
          <FaPlay className="text-white text-4xl" />
        </div>

        {/* Score Badge */}
        {anime.score !== undefined && anime.score !== null && (
          <div
            className="
            absolute top-2 right-2 bg-yellow-400 text-black text-xs 
            font-semibold px-2 py-0.5 rounded flex items-center gap-1 
            shadow-lg select-none
          "
          >
            <FaStar className="text-sm" />
            <span>{anime.score.toFixed(1)}</span>
          </div>
        )}

        {/* Bottom Label */}
        <div
          className="
          absolute bottom-0 left-0 right-0 bg-purple-500 text-white 
          text-xs px-2 py-1 rounded-b-lg select-none
        "
        >
          {bottomLabel}
        </div>
      </Link>

      {/* Title */}
      <div
        className="
        mt-2 text-white font-semibold text-sm 
        flex justify-between items-center
      "
      >
        <span className="truncate max-w-[85%]">{title}</span>

        <a
          href={anime.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-purple-400 ml-2"
          title="View on MAL"
          onClick={(e) => e.stopPropagation()}
        >
          <FaExternalLinkAlt />
        </a>
      </div>
    </motion.div>
  );
};

export default Animecard;
