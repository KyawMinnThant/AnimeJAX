import { cookies } from "next/headers";
import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { db } from "@/firebaseConfig";
import { collection, where, query, getDocs } from "firebase/firestore";
import Animecard from "@/app/components/animecard";
import Bookmarkcard from "@/app/components/bookmarkcard";
import Link from "next/link";

const Bookmark = async () => {
  const userCookies = await cookies();
  const token = userCookies.get("uid")?.value || null;

  const bookmarksRef = collection(db, "bookmark");
  const bookmarksQuery = query(bookmarksRef, where("userid", "==", token));
  const querySnapshot = await getDocs(bookmarksQuery);

  const bookmarks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Record<string, any>),
  }));

  const hasBookmarks = bookmarks.length > 0;

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 font-mono">
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
      {hasBookmarks && bookmarks ? (
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
          {bookmarks.map((b: any) => {
            const anime = b.anime;
            return <Bookmarkcard anime={anime} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FaRegBookmark className="text-gray-500 text-6xl sm:text-7xl mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-300">
            No Bookmarked Anime Yet
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Save your favorite anime to access them quickly later.
          </p>
        </div>
      )}
    </div>
  );
};

export default Bookmark;
