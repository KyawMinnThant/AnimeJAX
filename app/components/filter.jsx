"use client";

import React, { useState } from "react";

const typeOptions = ["TV", "Movie", "OVA", "Special", "ONA", "Music"];
const statusOptions = ["Finished", "Ongoing", "Upcoming"];
const genreOptions = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
];
const seasonOptions = ["Winter", "Spring", "Summer", "Fall"];
const studioOptions = [
  "Madhouse",
  "Bones",
  "Sunrise",
  "Toei Animation",
  "Production I.G",
  "MAPPA",
];

const Filterbar = () => {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [genre, setGenre] = useState("");
  const [season, setSeason] = useState("");
  const [studio, setStudio] = useState("");

  return (
    <div className="bg-[#141414] w-[20%] p-4 font-mono rounded-md flex flex-wrap gap-4 justify-center mr-30">
      {[
        { label: "Type", value: type, setValue: setType, options: typeOptions },
        {
          label: "Status",
          value: status,
          setValue: setStatus,
          options: statusOptions,
        },
        {
          label: "Genre",
          value: genre,
          setValue: setGenre,
          options: genreOptions,
        },
        {
          label: "Season",
          value: season,
          setValue: setSeason,
          options: seasonOptions,
        },
        {
          label: "Studio",
          value: studio,
          setValue: setStudio,
          options: studioOptions,
        },
      ].map(({ label, value, setValue, options }) => (
        <label
          key={label}
          className="flex flex-col text-sm font-semibold flex-grow min-w-[120px]"
        >
          {label}
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 bg-gray-800 text-white rounded px-2 py-1"
          >
            <option value="">All</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
};

export default Filterbar;
