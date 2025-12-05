import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  // To delete a cookie, you set it again with maxAge 0 or expires in the past
  cookieStore.set({
    name: "uid",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return new Response(JSON.stringify({ message: "UID cookie deleted" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
