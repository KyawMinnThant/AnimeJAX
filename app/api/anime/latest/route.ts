import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const res = await fetch(
      page
        ? `https://api.jikan.moe/v4/seasons/now?page=${page}`
        : "https://api.jikan.moe/v4/seasons/now?page=1"
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch top anime" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
