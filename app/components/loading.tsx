"use client";
import React from "react";

const Loading: React.FC = () => {
  const left = ["A", "n", "i", "m", "e"];
  const right = ["J", "A", "X"];

  return (
    <div className="w-full h-screen font-mono flex flex-col items-center justify-center bg-[#0a0a0a] text-white select-none">
      {/* animated word */}
      <h1 className="text-5xl font-extrabold italic tracking-wider flex gap-1">
        {left.map((ch, i) => (
          <span
            key={`L-${i}`}
            className="fade-letter"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {ch}
          </span>
        ))}

        {right.map((ch, i) => (
          <span
            key={`R-${i}`}
            className="fade-letter purple"
            style={{ animationDelay: `${(i + left.length) * 120}ms` }}
          >
            {ch}
          </span>
        ))}
      </h1>

      <p className="mt-4 text-gray-400 text-sm animate-pulse">
        Loading your anime multiverse...
      </p>

      {/* local styles so animation always exists — no external CSS required */}
      <style jsx>{`
        .fade-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(8px) scale(0.98);
          animation: fadeInWave 700ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .fade-letter.purple {
          color: #a78bfa; /* tailwind purple-400-ish */
        }

        @keyframes fadeInWave {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
            filter: blur(1px);
          }
          60% {
            opacity: 0.85;
            transform: translateY(-2px) scale(1.02);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
