import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const query = searchParams.get("q");
  const page = searchParams.get("page");

  if (!query) {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      !page
        ? `https://api.jikan.moe/v4/anime?q=${query}&page=1`
        : `https://api.jikan.moe/v4/anime?q=${query}&page=${page}`
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from Jikan" },
      { status: 500 }
    );
  }
}
