"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaInfoCircle,
} from "react-icons/fa";
import Link from "next/link";

export type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  thumbnail?: string;

  score?: number;
  rank?: number;
  episodes?: number;
  season?: string;
  year?: number;
  studio?: string;
  synopsis?: string;
  genres?: string[];
};

interface FadeCarouselProps {
  slides: Slide[];
  autoplay?: boolean;
  interval?: number;
}

export default function FadeCarousel({
  slides,
  autoplay = true,
  interval = 6000,
}: FadeCarouselProps) {
  const [selected, setSelected] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // no return statement here (implicitly returns void)
    };
  }, []);

  useEffect(() => {
    if (!autoplay) return;

    timeoutRef.current && clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      goToSlide((selected + 1) % slides.length);
    }, interval);
  }, [selected, autoplay, interval, slides.length]);

  function goToSlide(index: number) {
    if (isTransitioning.current) return;

    isTransitioning.current = true;
    setSelected(index);

    setTimeout(() => {
      isTransitioning.current = false;
    }, 700);
  }

  function nextSlide() {
    goToSlide((selected + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((selected - 1 + slides.length) % slides.length);
  }

  return (
    <div className="relative w-full h-screen md:h-[600px] overflow-hidden font-mono">
      {slides.map((slide, index) => {
        const isActive = index === selected;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-linear ${
              isActive
                ? "opacity-100 z-20"
                : "opacity-0 z-10 pointer-events-none"
            }`}
          >
            {/* Background image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(
                    ellipse at bottom right,
                    rgba(0,0,0,0.75) 40%,
                    rgba(0,0,0,0.35) 70%,
                    transparent 100%
                  ),
                  linear-gradient(
                    to top,
                    rgba(0,0,0,0.9) 45%,
                    rgba(0,0,0,0.15) 80%,
                    transparent 100%
                  )
                `,
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-between px-[75px] text-white">
              {/* LEFT info */}
              <div className="max-w-lg z-30 space-y-4">
                <h3 className="text-3xl md:text-5xl font-extrabold drop-shadow">
                  {slide.title}
                </h3>

                {/* Stats badges */}
                <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                  {slide.score && (
                    <span className="px-3 py-1 bg-yellow-400 text-black font-bold rounded">
                      ⭐ {slide.score}
                    </span>
                  )}

                  {slide.rank && (
                    <span className="px-3 py-1 bg-purple-600/80 rounded">
                      # Rank {slide.rank}
                    </span>
                  )}

                  {slide.episodes && (
                    <span className="px-3 py-1 bg-white/20 rounded">
                      🎞 {slide.episodes} Episodes
                    </span>
                  )}

                  {slide.studio && (
                    <span className="px-3 py-1 bg-white/10 rounded">
                      🏢 {slide.studio}
                    </span>
                  )}

                  {slide.season && slide.year && (
                    <span className="px-3 py-1 bg-white/10 rounded">
                      📅 {slide.season.toUpperCase()} {slide.year}
                    </span>
                  )}
                </div>

                {/* Genres */}
                {slide.genres && (
                  <div className="flex flex-wrap gap-2">
                    {slide.genres.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-1 bg-white/10 border border-white/10 rounded text-xs"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}

                {/* Synopsis */}
                {slide.synopsis && (
                  <div className="text-sm opacity-90 max-w-lg">
                    <p className="line-clamp-3">{slide.synopsis}</p>

                    {/* Read More Link */}
                    {slide.synopsis.length > 180 && (
                      <Link
                        href={`/anime/${slide.id}`}
                        className="mt-1 inline-block text-purple-300 hover:text-purple-400 underline text-sm"
                      >
                        Read More →
                      </Link>
                    )}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                  <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-400 px-5 py-2 rounded-md font-semibold">
                    <FaPlay />
                    Watch
                  </button>

                  <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-2 rounded-md font-semibold">
                    <FaInfoCircle />
                    Detail
                  </button>
                </div>
              </div>

              {/* RIGHT Thumbnail */}
              <div className="hidden md:block relative w-[28%] h-[70%] rounded-lg overflow-hidden border border-white/30 shadow-xl">
                <Image
                  src={slide.thumbnail || slide.image}
                  alt={`${slide.title} thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === selected ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 z-40"
      >
        <FaChevronLeft size={16} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 z-40"
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
}
