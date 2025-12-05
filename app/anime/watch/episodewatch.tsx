"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import Episodes from "./episodes";
import { usePaginationStore } from "@/app/store/usePaginationStore";
import Link from "next/link";

const Episodewatch = ({ id }: { id: number }) => {
  const { page, setLastPage } = usePaginationStore();
  type EpisodeType = {
    mal_id: number;
    title: string;
    title_japanese: string;
    title_romanji: string;
    aired: string;
    score: number;
    filler: boolean;
    recap: boolean;
  };
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    `/api/anime/episodes/${id}?page=${page}`,
    fetcher
  );

  console.log(data);
  const episode: EpisodeType[] = data?.data;

  useEffect(() => {
    setLastPage(data?.pagination?.last_visible_page);
  }, [data]);

  return (
    <div className="">
      {isLoading && (
        <div className=" text-white font-mono mt-5 ml-10">
          Loading Episodes...
        </div>
      )}
      <div className=" flex">
        <Episodes episodes={episode} />
      </div>
    </div>
  );
};

export default Episodewatch;
