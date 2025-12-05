"use client";
import React, { useEffect } from "react";

import useSWR from "swr";
import Animecard from "@/app/components/animecard";
import AnimeLanding from "@/app/components/animelanding";
import Link from "next/link";
import { usePaginationStore } from "@/app/store/usePaginationStore";
import Pagination from "@/app/components/pagination";
import Loading from "@/app/components/loading";

const Movie = () => {
  const { setLastPage, page } = usePaginationStore();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    `https://api.jikan.moe/v4/anime?type=movie&page=${page}`,
    fetcher
  );

  useEffect(() => {
    setLastPage(data?.pagination?.last_visible_page);
  }, [data]);
  const topanimeList = data?.data || [];
  return (
    <div>
      {isLoading && <Loading />}
      <Link
        href="/anime"
        className="
    inline-block
    text-purple-400 border border-purple-500 px-4 py-1.5 
    rounded-md hover:bg-purple-600 hover:text-white transition font-semibold

    mt-[80px] ml-6         /* default: small screens */
    sm:mt-16 sm:ml-10  /* ≥640px */
    md:mt-20 md:ml-[50px]  /* ≥768px */
    lg:mt-24 lg:ml-[70px]  /* ≥1024px */
  "
      >
        ← Back to Anime
      </Link>
      <AnimeLanding
        imgUrl="https://static0.srcdn.com/wordpress/wp-content/uploads/2022/11/One-Piece-Film-Red-Shanks.jpg"
        textanime="Movie"
      />

      <div
        className="
          flex 
          flex-wrap 
          gap-4 
          mt-8 
          mb-12 
          justify-center
          overflow-x-hidden
          overflow-y-hidden

        "
      >
        {topanimeList.map((anime: any) => (
          <Animecard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      {/* <Animecard /> */}

      <Pagination />
    </div>
  );
};

export default Movie;
