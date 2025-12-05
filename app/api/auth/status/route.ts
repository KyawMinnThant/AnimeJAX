import { cookies } from "next/headers";

export async function GET() {
  const cookiesfirebase = await cookies();
  const token = cookiesfirebase.get("firebase-auth-token")?.value || null;

  return Response.json({
    loggedIn: !!token,
    token: token ?? "",
  });
}
