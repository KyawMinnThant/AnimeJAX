"use client";
import React, { useEffect } from "react";

import useSWR from "swr";
import Animecard from "@/app/components/animecard";
import AnimeLanding from "@/app/components/animelanding";
import Link from "next/link";
import { usePaginationStore } from "@/app/store/usePaginationStore";
import Pagination from "@/app/components/pagination";
import Loading from "@/app/components/loading";

const Favourited = () => {
  const { setLastPage, page } = usePaginationStore();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    `https://api.jikan.moe/v4/anime?order_by=favorites&sort=desc&page=${page}`,
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
    text-purple-400 border border-purple-500 px-2 py-1.5 
    rounded-md hover:bg-purple-600 hover:text-white transition font-semibold

    mt-[70px]   ml-2         /* default: small screens */
    sm:mt-[50px] sm:ml-10  /* ≥640px */
    md:mt-20 md:ml-[50px]  /* ≥768px */
    lg:mt-24 lg:ml-[70px]  /* ≥1024px */
     text-sm font-mono
  "
      >
        ← Back to Anime
      </Link>
      <AnimeLanding
        imgUrl="https://i1.sndcdn.com/artworks-000149774973-ssrkd9-t1080x1080.jpg"
        textanime="Favourited"
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

export default Favourited;
