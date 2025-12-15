"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import Animecard from "@/app/components/animecard";
import Topanimelanding from "@/app/components/animelanding";
import AnimeLanding from "@/app/components/animelanding";
import { usePaginationStore } from "@/app/store/usePaginationStore";
import Pagination from "@/app/components/pagination";
import Link from "next/link";
import Loading from "@/app/components/loading";

const Upcoming = () => {
  const { setLastPage, page } = usePaginationStore();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    `/api/anime/upcoming?page=${page}`,
    fetcher
  );

  const upcomingAnimeList = data?.data || [];

  useEffect(() => {
    setLastPage(data?.pagination?.last_visible_page);
  }, [data]);

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
        imgUrl="https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABddRc_ab5Ayz-JJFiOpbGgIz6_PvHkf1u9IzZsxSfcl3EEGid-bsL1QqBwbpkxfSz89sJNgTFCEnxxDve0wvwp7HKU1q9e66kQQO.jpg?r=233"
        textanime="Upcoming"
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
        {upcomingAnimeList.map((anime: any, index: number) => (
          <Animecard key={index} anime={anime} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default Upcoming;
