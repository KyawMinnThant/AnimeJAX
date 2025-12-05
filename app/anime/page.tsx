"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import FadeCarousel from "../components/carouselanime/carouselanime";
import Filterbar from "../components/filter";
import Animecard from "../components/animecard";
import Topanime from "../components/topanime";
import Loading from "../components/loading";
import Textheader from "../components/textheader";
import Pagination from "../components/pagination";
import { usePaginationStore } from "../store/usePaginationStore";
import Link from "next/link";
import Genrebox from "../components/genrebox";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href?: string;
};

const Anime = () => {
  const { setLastPage, page } = usePaginationStore();

  const { data, isLoading: isAnimeLoading } = useSWR(
    "http://localhost:3000/api/anime",
    fetcher
  );

  const { data: LatestAnime, isLoading: isLatestLoading } = useSWR(
    `http://localhost:3000/api/anime/latest?page=${page}`,
    fetcher
  );

  const animeList = data?.data || [];
  const LatestAnimeList = LatestAnime?.data || [];

  useEffect(() => {
    setLastPage(LatestAnime?.pagination?.last_visible_page);
  }, [LatestAnime]);

  if (isAnimeLoading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <Loading />
      </main>
    );
  }

  const slides: Slide[] = animeList.slice(0, 5).map((anime: any) => ({
    id: String(anime.mal_id),
    title: anime.title_english || anime.title || "Unknown Title",
    subtitle: anime.type + (anime.year ? ` (${anime.year})` : ""),
    image:
      anime.images?.jpg?.large_image_url ||
      anime.images?.jpg?.image_url ||
      anime.images?.webp?.large_image_url ||
      anime.images?.webp?.image_url,
    thumbnail: anime.images?.jpg?.image_url,
    href: `/anime/${anime.mal_id}`,
    score: anime.score || null,
    rank: anime.rank || null,
    episodes: anime.episodes || null,
    season: anime.season || null,
    year: anime.year || null,
    studio: anime.studios?.[0]?.name || null,
    synopsis: anime.synopsis || "",
    genres: anime.genres?.map((g: any) => g.name) || [],
  }));

  return (
    <main className="w-full overflow-x-hidden">
      {/* CAROUSEL */}
      <div className="flex mt-6 w-full gap-3">
        <FadeCarousel slides={slides} />
      </div>

      {/* PAGE CONTENT: LEFT + RIGHT (desktop) */}
      <div className="flex flex-col lg:flex-row w-full px-10 md:px-10 lg:px-14 mt-10 gap-8">
        {/* LEFT CONTENT */}
        <section className="w-full ml-5 lg:w-[80%]">
          {/* TOP ANIME TITLE */}
          <Textheader>
            <h2 className="text-2xl font-mono font-bold mt-3 mb-5 text-white border-l-5 px-2 border-purple-500">
              Top Anime
            </h2>
          </Textheader>

          {/* Top Anime Grid */}
          <div className="flex flex-wrap gap-5">
            {animeList.map((anime: any, index: number) => (
              <Animecard key={index} anime={anime} />
            ))}
          </div>

          {/* View all */}
          <Link
            href={"anime/top"}
            className="p-2 shadow-sm font-mono font-semibold flex justify-center bg-purple-500 mt-6 w-fit text-sm mb-10 mx-auto hover:bg-purple-600 duration-100 rounded-sm"
          >
            View All Top Anime
          </Link>

          {/* Latest Anime */}
          <Textheader>
            <h2 className="text-2xl font-mono font-bold mt-3 mb-5 text-white border-l-5 px-2 border-purple-500">
              Latest Anime
            </h2>
          </Textheader>

          {LatestAnimeList.length === 0 ? (
            <p className="text-gray-400">Latest anime will appear soon.</p>
          ) : (
            <div className="flex flex-wrap gap-5">
              {LatestAnimeList.map((anime: any, index: number) => (
                <Animecard key={index} anime={anime} />
              ))}
            </div>
          )}
        </section>

        {/* RIGHT SIDEBAR — Desktop only */}
        <aside className="hidden lg:block w-[20%]">
          <Topanime topAnime={animeList} />
        </aside>
      </div>

      {/* MOBILE/TABLET TOP ANIME — Responsive (only small devices) */}
      <div className="block lg:hidden px-5 mt-10 mb-5">
        <Topanime topAnime={animeList} />
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mb-10">
        <Pagination />
      </div>

      {/* GENRE BOX */}
      <Genrebox />
    </main>
  );
};

export default Anime;
