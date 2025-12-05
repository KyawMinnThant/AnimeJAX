"use client";

import React from "react";

type Episode = {
  mal_id: number;
  filler: boolean;
  recap: boolean;
};

type EpisodesProps = {
  episodes: Episode[];
};

const Episodes: React.FC<EpisodesProps> = ({ episodes }) => {
  return (
    <div
      className="
        w-full
        max-w-[800px]
        font-mono
        mt-8 mx-auto
        px-4
        sm:px-6
        lg:px-0
      "
    >
      {/* Show single cube if no episodes */}
      {episodes?.length === 0 ? (
        <div
          className="
            bg-gray-800 w-12 h-12
            flex items-center justify-center rounded-lg
            text-white font-bold text-lg cursor-default select-none
            mb-6 mx-auto
          "
          title="No episodes available"
        >
          1
        </div>
      ) : (
        <div>
          {/* Legend */}
          <div
            className="
              flex flex-wrap items-center gap-4 sm:gap-6 mb-6
              select-none font-semibold text-sm text-white
            "
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg bg-yellow-600"></div>
              <span>Filler</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg bg-blue-600"></div>
              <span>Recap</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg bg-gray-800 border border-gray-600"></div>
              <span>Regular</span>
            </div>
          </div>

          {/* Episodes */}
          <div
            className="
              grid
              grid-cols-6
              sm:grid-cols-8
              md:grid-cols-10
              lg:grid-cols-12
              gap-3 sm:gap-4
            "
          >
            {episodes?.length > 0 &&
              episodes.map((episode) => {
                let bgColor = "bg-gray-800"; // default
                if (episode.filler) bgColor = "bg-yellow-600";
                else if (episode.recap) bgColor = "bg-blue-600";

                return (
                  <div
                    key={episode.mal_id}
                    className={`
                      ${bgColor}
                      flex items-center justify-center
                      rounded-lg text-white font-bold
                      cursor-pointer select-none
                      hover:brightness-110
                      transition
                      w-10 h-10
                      sm:w-12 sm:h-12
                    `}
                    title={
                      episode.filler
                        ? "Filler Episode"
                        : episode.recap
                        ? "Recap Episode"
                        : "Regular Episode"
                    }
                  >
                    {episode.mal_id}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Episodes;
