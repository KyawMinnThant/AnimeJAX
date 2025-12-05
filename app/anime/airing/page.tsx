"use client";
import React, { useEffect } from "react";

import useSWR from "swr";
import Animecard from "@/app/components/animecard";
import AnimeLanding from "@/app/components/animelanding";
import Link from "next/link";
import { usePaginationStore } from "@/app/store/usePaginationStore";
import Pagination from "@/app/components/pagination";
import Loading from "@/app/components/loading";

const Airing = () => {
  const { setLastPage, page } = usePaginationStore();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    `https://api.jikan.moe/v4/anime?status=airing&page=${page}`,
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
        imgUrl="https://i.redd.it/something-that-has-confused-me-to-this-day-is-how-come-v0-20883eocpg981.jpg?width=1000&format=pjpg&auto=webp&s=e9b2580d3af2a6be480f49e9795f6eaee545ea18"
        textanime="Top Airing"
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

export default Airing;
