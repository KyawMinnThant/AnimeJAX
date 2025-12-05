import React from "react";
import Searchresult from "./searchresult";
// Adjust path accordingly

type ResultProps = {
  searchParams: Promise<{ query: string }>;
};

const Resultsearch: React.FC<ResultProps> = async ({ searchParams }) => {
  const { query } = await searchParams;

  return <Searchresult query={query || ""} />;
};

export default Resultsearch;
