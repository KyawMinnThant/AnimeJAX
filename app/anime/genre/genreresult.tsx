"use client";

import Animecard from "@/app/components/animecard";
import Loading from "@/app/components/loading";
import Pagination from "@/app/components/pagination";
import { usePaginationStore } from "@/app/store/usePaginationStore";
import React, { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Genreresult = ({ genre }: { genre: number }) => {
  const { setLastPage, page } = usePaginationStore();

  // Corrected SWR URL using backticks
  const { data, isLoading, error } = useSWR(
    `/api/anime/genres?genre=${genre}&page=${page}`,
    fetcher
  );

  // Update last page in Zustand store
  useEffect(() => {
    if (data?.pagination?.last_visible_page) {
      setLastPage(data.pagination.last_visible_page);
    }
  }, [data]);

  const GenreType = data?.data[0]?.themes.find(
    (t: any) => Number(t.mal_id) === Number(genre)
  );

  console.log();

  return (
    <div className="text-white px-[30px] ml-[70px] font-mono mt-[100px]">
      {/* Title */}
      {!isLoading && (
        <h1 className="text-3xl font-semibold font-mono mb-6">
          Search With Genre:{" "}
          <span className="text-purple-400">{GenreType?.name}</span>
        </h1>
      )}

      {/* Loading */}
      {isLoading && <Loading />}

      {/* Error */}
      {error && (
        <div className="text-red-400 text-lg mt-20">
          Failed to load anime. Please try again.
        </div>
      )}

      {/* No Data */}
      {!isLoading && data?.data?.length === 0 && (
        <div className="text-gray-400 text-lg mt-20">
          No anime found for this genre.
        </div>
      )}

      {/* Anime Grid */}
      <div className="mt-10 flex flex-wrap gap-4">
        {data?.data?.map((anime: any) => (
          <Animecard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      {/* Pagination */}
      {!isLoading && <Pagination />}
    </div>
  );
};

export default Genreresult;
