"use client";

import React from "react";
import useSWR from "swr";
import RecommendationCard from "../components/recommendationcard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface RecommendationProps {
  id: number;
}

const Recommendation: React.FC<RecommendationProps> = ({ id }) => {
  const { data, error, isLoading } = useSWR(
    id ? `http://localhost:3000/api/anime/recommendation/${id}` : null,
    fetcher
  );

  if (!id) {
    return (
      <p className="text-white text-center mt-10">No anime ID provided.</p>
    );
  }

  if (error) {
    return (
      <p className="text-red-400 text-center mt-10">
        Failed to load recommendations.
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-gray-400 text-center mt-10">
        Loading recommendations...
      </p>
    );
  }

  const recommendations: any = data?.data || [];

  if (recommendations.length === 0) {
    return (
      <div className="mt-12 text-center">
        <p className="inline-block px-5 py-3 border font-mono border-purple-500/40 rounded-lg text-purple-300 bg-purple-500/10 backdrop-blur-sm shadow-md">
          No recommendations found for this anime.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mt-6">
      <div
        className="
          grid
          gap-5
          
          /* Mobile: 2 per row */
          grid-cols-2

          /* Tablet: 3 per row */
          sm:grid-cols-3

          /* Medium devices: 4 per row */
          md:grid-cols-4

          /* Desktop: 5 per row */
          lg:grid-cols-5

          xl:grid-cols-6

          px-4 sm:px-6 md:px-10 lg:px-0
        "
      >
        {recommendations.map((rec: any) => (
          <RecommendationCard key={rec.entry.mal_id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
