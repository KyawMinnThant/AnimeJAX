export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ❗ params is a Promise
  const { id } = await context.params;

  try {
    // fetch detail from Jikan API
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Anime not found" }), {
        status: 404,
      });
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch anime detail" }),
      { status: 500 }
    );
  }
}
