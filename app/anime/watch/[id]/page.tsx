import React from "react";
import Episodewatch from "../episodewatch";
import EpisodePagination from "@/app/components/episodepagination";
import AnimeDetail from "@/app/components/animedetail";
import Link from "next/link";

type Episodes = {
  params: Promise<{ id: number }>;
};

const Watchanime: React.FC<Episodes> = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  const fetchAnime = async () => {
    const res = await fetch(`http://localhost:3000/api/anime/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  };

  const detail = await fetchAnime();
  return (
    <div>
      <Link
        href={`/anime/${id}`}
        className="
    inline-block
    text-purple-400 border border-purple-500 px-4 py-1.5 
    rounded-md hover:bg-purple-600 hover:text-white transition font-semibold

    mt-10 ml-6         /* default: small screens */
    sm:mt-16 sm:ml-10  /* ≥640px */
    md:mt-20 md:ml-[50px]  /* ≥768px */
    lg:mt-24 lg:ml-32  /* ≥1024px */
  "
      >
        ← Back to Anime
      </Link>
      <AnimeDetail anime={detail?.data} />
      <h1 className=" ml-[60px] font-mono font-semibold mt-[100px]">
        Episodes
      </h1>
      <EpisodePagination />
      <Episodewatch id={id} />
    </div>
  );
};

export default Watchanime;
