"use client";

import { useState } from "react";
import { FaBookmark, FaPlay } from "react-icons/fa";
import Link from "next/link";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

import Recommendation from "./recommendation";
import Textheader from "./textheader";

interface AnimeDetailContentProps {
  id: number;
  animeData: any; // The fetched anime data, passed from server
  uid?: string | null;
}

const AnimeDetailContent = ({
  id,
  animeData,
  uid,
}: AnimeDetailContentProps) => {
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!animeData) {
    return <div className="text-center mt-20 text-white">Anime not found.</div>;
  }

  const { data } = animeData;

  const handleBookmark = async () => {
    if (!uid) {
      alert("Please log in to bookmark.");
      return;
    }

    setLoading(true);
    try {
      const bookmarkRef = collection(db, "bookmark");
      const docRef = await addDoc(bookmarkRef, {
        id,
        userid: uid,
        anime: data,
        createdAt: new Date().toISOString(),
      });
      console.log("Document written with ID: ", docRef.id);
      setBookmarked(true);
      alert("Bookmarked successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to bookmark. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className=" px-4 sm:px-6 md:px-10 lg:px-20 font-mono text-white">
      {/* Back Button */}
      <Link
        href="/anime"
        className="
    inline-block
    text-purple-400 border border-purple-500 px-2 py-1.5 
    rounded-md hover:bg-purple-600 hover:text-white transition font-semibold

    mt-[70px]   ml-2         /* default: small screens */
    sm:mt-[50px] sm:ml-10  /* ≥640px */
    md:mt-20 md:ml-[50px]  /* ≥768px */
    lg:mt-24 lg:ml-[0px]  /* ≥1024px */
     text-sm font-mono
  "
      >
        ← Back to Anime
      </Link>

      {/* MAIN CONTAINER */}
      <div className="w-full mx-auto mt-10 max-w-[1400px]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={data.images.webp.large_image_url}
            alt={data.title}
            className="rounded-xl w-full md:w-[300px] shadow-lg object-cover"
          />

          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-extrabold">
              {data.title}{" "}
              <span className="text-purple-400">({data.year || "N/A"})</span>
            </h1>

            <p className="text-gray-400 italic">{data.title_japanese}</p>

            <div className="flex flex-wrap gap-3 text-sm text-gray-300">
              <span className="px-3 py-1 bg-gray-800 rounded-md">
                Score: {data.score ?? "N/A"}
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-md">
                Rank: #{data.rank ?? "N/A"}
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-md">
                Popularity: #{data.popularity ?? "N/A"}
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-md">
                Episodes: {data.episodes ?? "Unknown"}
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-md">
                Status: {data.status ?? "N/A"}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-3">
              {data.genres?.map((g: any) => (
                <span
                  key={g.mal_id}
                  className="px-3 py-1 rounded-full text-xs bg-purple-600/20 border border-purple-600"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <Link
                href={`/anime/watch/${id}`}
                className="bg-purple-600 hover:bg-purple-700 transition-colors px-5 py-2 
                  rounded-md font-semibold text-white flex items-center gap-2"
              >
                <FaPlay /> Watch
              </Link>

              <button
                type="button"
                onClick={handleBookmark}
                disabled={loading || bookmarked}
                className={`border border-purple-600 transition-colors px-5 py-2 rounded-md font-semibold flex items-center gap-2
                  ${
                    bookmarked
                      ? "bg-purple-700 text-white"
                      : "text-purple-400 hover:bg-purple-700 hover:text-white"
                  }`}
              >
                <FaBookmark />
                {bookmarked ? "Bookmarked" : loading ? "Saving..." : "Bookmark"}
              </button>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Synopsis</h2>
          <p className="text-gray-300 mt-3 leading-7">{data.synopsis}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-sm text-gray-300">
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-lg mb-2">Information</h3>
            <p>
              <strong>Type:</strong> {data.type ?? "N/A"}
            </p>
            <p>
              <strong>Source:</strong> {data.source ?? "N/A"}
            </p>
            <p>
              <strong>Duration:</strong> {data.duration ?? "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> {data.rating ?? "N/A"}
            </p>
          </div>

          <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-lg mb-2">Broadcast</h3>
            <p>
              <strong>Season:</strong> {data.season || "N/A"}
            </p>
            <p>
              <strong>Day:</strong> {data.broadcast?.day || "N/A"}
            </p>
            <p>
              <strong>Time:</strong> {data.broadcast?.time || "N/A"}
            </p>
            <p>
              <strong>Timezone:</strong> {data.broadcast?.timezone || "N/A"}
            </p>
          </div>
        </div>

        {/* Studios & Producers */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Studios</h2>
          <div className="flex gap-2 mt-3 flex-wrap">
            {data.studios?.map((s: any) => (
              <span
                key={s.mal_id}
                className="px-3 py-1 bg-gray-800 rounded-md text-xs"
              >
                {s.name}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-8">Producers</h2>
          <div className="flex gap-2 mt-3 flex-wrap">
            {data.producers?.map((p: any) => (
              <span
                key={p.mal_id}
                className="px-3 py-1 bg-gray-800 rounded-md text-xs"
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Trailer */}
        {data.trailer?.embed_url && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-3">Trailer</h2>
            <iframe
              className="w-full h-[400px] rounded-xl border border-gray-700"
              src={data.trailer.embed_url}
              allow="autoplay; encrypted-media"
              title={`${data.title} Trailer`}
            />
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="max-w-[1400px] mx-auto mt-16">
        <Textheader>
          <h2 className="text-2xl border-l-5 px-2 border-purple-500 font-mono font-bold text-white">
            Recommendations
          </h2>
        </Textheader>

        <Recommendation id={id} />
      </div>
    </main>
  );
};

export default AnimeDetailContent;
