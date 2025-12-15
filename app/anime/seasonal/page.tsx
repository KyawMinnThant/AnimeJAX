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

const Seasonal = () => {
  const { setLastPage, page } = usePaginationStore();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    `/api/anime/seasonal?page=${page}`,
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
        imgUrl="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3d305e75-d2b9-4a65-bdef-6414c694d540/dgl9fel-265c326b-e02f-49c0-8f9d-0e0467d84278.png/v1/fill/w_1280,h_720,q_80,strp/luffy_gear_5___one_piece__re_color__by_walttarts_dgl9fel-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mLzNkMzA1ZTc1LWQyYjktNGE2NS1iZGVmLTY0MTRjNjk0ZDU0MC9kZ2w5ZmVsLTI2NWMzMjZiLWUwMmYtNDljMC04ZjlkLTBlMDQ2N2Q4NDI3OC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FmLv_P1snP_iwzrcqeOMUyQbaurFEq1bvUvctkXISLo"
        textanime="Seasonal"
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

export default Seasonal;
