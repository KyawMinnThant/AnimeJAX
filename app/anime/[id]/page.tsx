import Loading from "@/app/components/loading";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import AnimeDetailContent from "@/app/components/animedetailcontent";

interface DetailAnimeProps {
  params: Promise<{ id: string }>;
}

const DetailAnime = async ({ params }: DetailAnimeProps) => {
  const { id } = await params;

  // Fetch anime data on the server
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

  const animeData = res.ok ? await res.json() : null;

  // Get user ID from cookies
  const userCookies = await cookies();
  const uid = userCookies.get("uid")?.value || null;

  return (
    <Suspense fallback={<Loading />}>
      <AnimeDetailContent id={Number(id)} animeData={animeData} uid={uid} />
    </Suspense>
  );
};

export default DetailAnime;
