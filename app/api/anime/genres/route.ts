// /app/api/anime/filtered/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const genre = searchParams.get("genre") || "";
    const page = searchParams.get("page") || "1";

    if (!genre) {
      return NextResponse.json(
        { error: "Missing required 'genres' query parameter" },
        { status: 400 }
      );
    }

    const apiUrl = `https://api.jikan.moe/v4/anime?genres=${genre}&page=${page}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Jikan API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
