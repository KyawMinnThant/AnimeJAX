import React from "react";
import Genreresult from "./genreresult";
import Link from "next/link";

type ResultProps = {
  searchParams: Promise<{ genre: number }>;
};

const GenreBasedAnime: React.FC<ResultProps> = async ({ searchParams }) => {
  const { genre } = await searchParams;
  return (
    <div>
      <Link
        href="/anime"
        className="
    inline-block
    text-purple-400 border border-purple-500 px-4 py-1.5 
    rounded-md hover:bg-purple-600 hover:text-white transition font-semibold

    mt-[80px] ml-6         /* default: small screens */
    sm:mt-16 sm:ml-10  /* ≥640px */
    md:mt-20 md:ml-[50px]  /* ≥768px */
    lg:mt-24 lg:ml-32  /* ≥1024px */
  "
      >
        ← Back to Anime
      </Link>
      <Genreresult genre={genre} />
    </div>
  );
};

export default GenreBasedAnime;
