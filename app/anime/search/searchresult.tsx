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
      <div className=" font-mono max-w-10xl ml-[50px] mt-24 px-4 text-white">
        <h1 className="text-2xl font-bold mb-4">
          Search Results for: <span className="text-purple-400">{query}</span>
        </h1>

        {data?.data?.length === 0 && (
          <p className="text-gray-400 mt-6 text-center">No anime found.</p>
        )}

        <div
          className="
          flex 
          flex-wrap 
          gap-4 
          mt-8 
          mb-12 
          overflow-x-hidden
          overflow-y-hidden

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
