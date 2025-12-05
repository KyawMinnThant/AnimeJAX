import { cookies } from "next/headers";
import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { db } from "@/firebaseConfig";
import { collection, where, query, getDocs } from "firebase/firestore";
import Animecard from "@/app/components/animecard";
import Bookmarkcard from "@/app/components/bookmarkcard";

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
    <div className="mt-20 w-full px-4 sm:px-6 md:px-10 lg:px-20 font-mono">
      {hasBookmarks && bookmarks ? (
        <div
          className="
            flex flex-wrap justify-center 
            gap-4 sm:gap-5 md:gap-6 
            w-full
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
