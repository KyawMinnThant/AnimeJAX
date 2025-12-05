import { cookies } from "next/headers";

export async function GET() {
  const cookiesfirebase = await cookies();
  const token = cookiesfirebase.get("firebase-auth-token");
  const uid = cookiesfirebase.get("uid");

  return Response.json({
    loggedIn: !!token && !!uid,
    token: token ?? "",
  });
}
