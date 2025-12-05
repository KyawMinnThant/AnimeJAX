"use server";

import { cookies } from "next/headers";

// Set Firebase Auth Token Cookie
export async function setAuthCookie(token: string, uid: string) {
  const cookieStore = await cookies();

  cookieStore.set("firebase-auth-token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
  });

  cookieStore.set("uid", uid, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
  });
}

// Clear Cookie on Logout
export async function clearAuthCookie() {
  const cookieStore = await cookies();

  cookieStore.delete("firebase-auth-token");
}
