"use client";

import React, { useState } from "react";

type Anime = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
      small_image_url: string;
    };
  };
  title_english?: string;
  title: string;
  score?: number;
};

interface TopanimeProps {
  topAnime: Anime[];
}

const Topanime: React.FC<TopanimeProps> = ({ topAnime }) => {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

  return (
    <div
      className="
        bg-[#141414]
        text-white
        rounded-xl
        p-4
        font-mono
        shadow-lg
        h-fit

        w-full               /* full width on mobile and medium */
        sm:w-full
        md:w-[95%]
        md:mx-auto

        lg:max-w-[250px]     /* sidebar size only on large screens */
        xl:max-w-[250px]

        mt-10
        lg:mt-0
      "
    >
      {/* Header */}
      <h2 className="text-xl font-bold mb-4">Top Anime</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("weekly")}
          className={`
            flex-1 py-2 rounded-lg text-sm transition-all duration-200 
            ${
              activeTab === "weekly"
                ? "bg-purple-600"
                : "bg-gray-800 hover:bg-gray-700"
            }
          `}
        >
          Weekly
        </button>

        <button
          onClick={() => setActiveTab("monthly")}
          className={`
            flex-1 py-2 rounded-lg text-sm transition-all duration-200 
            ${
              activeTab === "monthly"
                ? "bg-purple-600"
                : "bg-gray-800 hover:bg-gray-700"
            }
          `}
        >
          Monthly
        </button>
      </div>

      {/* Anime List */}
      <div className="flex flex-col gap-4">
        {topAnime.slice(0, 10).map((anime, index) => {
          const title = anime.title_english || anime.title;
          const score = anime.score || "N/A";
          const image = anime.images?.jpg?.image_url;

          return (
            <a
              key={anime.mal_id}
              href={anime.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-3
                p-2 rounded-lg
                cursor-pointer
                transition-all
                hover:bg-gray-900
              "
            >
              {/* Rank */}
              <div className="text-lg font-bold text-purple-400 w-6 text-center">
                {index + 1}
              </div>

              {/* Thumbnail */}
              <img
                src={image}
                alt={title}
                className="
                  w-12 h-16 
                  rounded-md 
                  object-cover
                  flex-shrink-0
                "
              />

              {/* Title + Score */}
              <div className="flex flex-col w-full">
                <span className="text-sm font-semibold leading-tight">
                  {title}
                </span>
                <span className="text-xs text-gray-400">Score: {score}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Topanime;
