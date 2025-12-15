"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import Animecard from "@/app/components/animecard";
import Link from "next/link";
import Loading from "@/app/components/loading";
import { usePaginationStore } from "@/app/store/usePaginationStore";
import Pagination from "@/app/components/pagination";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Searchresult = ({ query }: { query: string }) => {
  const { setLastPage, page } = usePaginationStore();
  const { data, error, isLoading } = useSWR(
    query && page
      ? `/api/anime/search?q=${encodeURIComponent(query)}&page=${page}`
      : null,
    fetcher
  );

  useEffect(() => {
    setLastPage(data?.pagination?.last_visible_page);
  }, [data]);

  if (!query) {
    return (
      <div className="text-white mt-20 text-center">
        No search query provided.
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 mt-20 text-center">
        Failed to load results.
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
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
      <div className=" font-mono max-w-10xl mt-5 px-4 text-white">
        <h1 className="text-2xl text-center font-bold mb-4">
          Search Results for: <span className="text-purple-400">{query}</span>
        </h1>

        {data?.data?.length === 0 && (
          <p className="text-gray-400 mt-6 text-center">No anime found.</p>
        )}

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
          {data?.data?.map((anime: any, index: number) => (
            <Animecard key={index} anime={anime} />
          ))}
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default Searchresult;
