import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");

  try {
    const res = await fetch(
      !page
        ? `https://api.jikan.moe/v4/anime/${id}/episodes?page=1`
        : `https://api.jikan.moe/v4/anime/${id}/episodes?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Prevent Next.js caching old data
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch episodes" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("EPISODES API ERROR:", error);

    return NextResponse.json(
      { message: "Server error while fetching episodes" },
      { status: 500 }
    );
  }
}
