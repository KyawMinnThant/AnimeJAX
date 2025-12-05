"use client";
import React from "react";

type AnimelandingProps = {
  imgUrl: string;
  textanime: string;
};

const AnimeLanding: React.FC<AnimelandingProps> = ({ imgUrl, textanime }) => {
  return (
    <div
      className="
        w-full 
        
        h-[50vh] 
        sm:h-[60vh] 
        md:h-[70vh] 
        font-mono 
        
        relative 
        rounded-xl 
        overflow-hidden 
        mt-5
        px-4
        sm:px-6
      "
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>

      {/* Gradient Overlay (left dark → right transparent) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

      {/* Text on image */}
      <div
        className="
          absolute inset-0 
          flex flex-col 
          items-start 
          justify-center 
          gap-2 
          pl-4 
          sm:pl-8 
          md:pl-16
        "
      >
        <h1
          className="
            text-white 
            text-3xl 
            sm:text-4xl 
            md:text-5xl 
            font-extrabold 
            drop-shadow-lg
            max-w-full
            truncate
          "
          title={`${textanime} Anime`}
        >
          {textanime} <span className="text-purple-500">Anime</span>
        </h1>
        <p className="text-white/80 text-base sm:text-lg max-w-md">
          Top Rated Anime Are Here!
        </p>
      </div>
    </div>
  );
};

export default AnimeLanding;
