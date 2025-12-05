"use client";

import React from "react";

type AnimeData = {
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
  title_english: string;
  title_japanese: string;
  synopsis: string;
  score: number;
  status: string;
  aired: {
    from: string;
    to: string | null;
  };
};

type AnimeDetailProps = {
  anime: AnimeData;
};

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mt-6 p-4 border border-purple-600 rounded-lg bg-gray-900 text-gray-300 max-w-md mx-auto lg:max-w-full lg:mx-0">
      {children}
    </div>
  );
};

const AnimeDetail: React.FC<AnimeDetailProps> = ({ anime }) => {
  return (
    <div className="mt-16 px-4 font-mono text-white max-w-md mx-auto lg:max-w-[90vw] lg:mx-0">
      {/* Container: flex on lg+, stacked on smaller */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Poster */}
        <div className="w-full lg:ml-[60px] lg:w-1/2 rounded-lg overflow-hidden shadow-lg border border-gray-700 h-[55vh] lg:h-[70vh] flex-shrink-0">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Info Section */}
        <div className="lg:w-1/2 flex flex-col">
          {/* Titles */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 leading-snug">
            {anime.title}
          </h1>
          <h2 className="text-lg text-gray-400 italic mb-4">
            {anime.title_japanese}
          </h2>

          {/* Synopsis */}
          <div className="flex-1 overflow-y-auto max-h-[40vh] sm:max-h-[50vh] pr-1 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800 mb-4">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {anime.synopsis || "No synopsis available."}
            </p>
          </div>

          {/* Info Frame */}
          <Frame>
            <div className="flex flex-col gap-2 text-sm sm:text-base">
              <div>
                <strong>Score:</strong> {anime.score ?? "N/A"}
              </div>
              <div>
                <strong>Status:</strong> {anime.status}
              </div>
              <div>
                <strong>Aired:</strong>{" "}
                {new Date(anime.aired.from).toLocaleDateString()} –{" "}
                {anime.aired.to
                  ? new Date(anime.aired.to).toLocaleDateString()
                  : "Present"}
              </div>
              <div>
                <strong>MAL Link:</strong>{" "}
                <a
                  href={anime.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 underline hover:text-purple-600"
                >
                  View on MAL
                </a>
              </div>
            </div>
          </Frame>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
