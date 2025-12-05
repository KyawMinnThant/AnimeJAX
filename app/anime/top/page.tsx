"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import Animecard from "@/app/components/animecard";
import AnimeLanding from "@/app/components/animelanding";
import { usePaginationStore } from "@/app/store/usePaginationStore";
import Pagination from "@/app/components/pagination";
import Link from "next/link";
import Loading from "@/app/components/loading";

const TopAnime = () => {
  const { setLastPage, page } = usePaginationStore();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(`/api/anime?page=${page}`, fetcher);

  const topanimeList = data?.data || [];

  useEffect(() => {
    setLastPage(data?.pagination?.last_visible_page);
  }, [data]);

  return (
    <div className="  px-4 sm:px-6 lg:px-2 ">
      {isLoading && <Loading />}

      <Link
        href="/anime"
        className="
    inline-block
    text-purple-400 border border-purple-500 px-4 py-1.5 
    rounded-md hover:bg-purple-600 hover:text-white transition font-semibold

    mt-10         /* default: small screens */
    sm:mt-16 sm:ml-10  /* ≥640px */
    md:mt-20 md:ml-[50px]  /* ≥768px */
    lg:mt-24 lg:ml-[70px] /* ≥1024px */
  "
      >
        ← Back to Anime
      </Link>

      <AnimeLanding
        imgUrl="https://www.cartoonbrew.com/wp-content/uploads/2025/04/chainsawman_rezearc.jpg"
        textanime="Top"
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
        "
      >
        {topanimeList.map((anime: any) => (
          <Animecard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <Pagination />
      </div>
    </div>
  );
};

export default TopAnime;
