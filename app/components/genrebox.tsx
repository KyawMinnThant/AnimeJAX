"use client";

import Link from "next/link";
import React from "react";
import useSWR from "swr";

type Genre = {
  mal_id: number;
  name: string;
  url: string;
  count: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Genrebox = () => {
  const { data, error, isLoading } = useSWR(
    "https://api.jikan.moe/v4/genres/anime",
    fetcher
  );

  if (isLoading) return <div className="text-white p-4">Loading genres...</div>;
  if (error)
    return <div className="text-red-500 p-4">Failed to load genres.</div>;

  const genres: Genre[] = data.data;

  return (
    <div
      className="
           
        max-w-screen-xl     /* full width container but capped on huge monitors */
        mx-auto             
        px-3               
        sm:px-4
        md:px-12
        py-6
        font-mono

        /* adjust positioning when Topanime sidebar exists */
        ml-0
        sm:ml-0
        lg:ml-[90px]         /* aligns with carousel layout spacing */
        xl:ml-[50px]
      "
    >
      <h2 className="text-xl font-bold text-white mb-4">Anime Genres</h2>

      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6
          gap-3
        "
      >
        {genres.map((genre) => (
          <Link
            href={`/anime/genre?genre=${genre.mal_id}`}
            key={genre.mal_id}
            className="
              bg-[#1a1a1a] 
              border border-gray-700 
              p-3 
              rounded-md 
              text-white 
              transition-all 
              hover:bg-purple-600 
              hover:border-purple-500
              hover:shadow-lg
            "
          >
            <h3 className="font-semibold truncate">{genre.name}</h3>
            <p className="text-sm text-gray-400">{genre.count} titles</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genrebox;
