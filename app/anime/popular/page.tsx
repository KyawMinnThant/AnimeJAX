"use client";
import React, { useEffect } from "react";

import useSWR from "swr";
import Animecard from "@/app/components/animecard";
import AnimeLanding from "@/app/components/animelanding";
import Link from "next/link";
import { usePaginationStore } from "@/app/store/usePaginationStore";
import Pagination from "@/app/components/pagination";
import Loading from "@/app/components/loading";

const Popular = () => {
  const { page, setLastPage } = usePaginationStore();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading } = useSWR(
    `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}`,
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
        imgUrl="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/11/sukuna-wakes-up.jpg?w=1600&h=900&fit=crop"
        textanime="Popular"
      />

      <div
        className="
  
        grid 
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3 
        lg:grid-cols-6
        mx-auto
        w-[91%]
        mt-[50px]
        gap-4

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

export default Popular;
