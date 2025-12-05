"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://static0.srcdn.com/wordpress/wp-content/uploads/2023/08/attack-on-titan-eren-yeager-header.jpg')",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white font-mono px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          Welcome to{" "}
          <span className="">
            Anime<span className="text-purple-600 italic">JAX</span>
          </span>
        </h1>
        <p className="mb-12 max-w-lg text-lg md:text-xl">
          Explore top anime and dive into the world of your favorite shows.
        </p>

        <button
          onClick={() => router.push("/anime")}
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-2 px-5 rounded-lg text-xl shadow-lg"
        >
          Explore Top Anime
        </button>
      </div>
    </div>
  );
};

export default Home;
