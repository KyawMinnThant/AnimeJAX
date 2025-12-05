// app/signup/page.tsx

import SignupForm from "@/app/components/signup";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebase-auth-token");

  // If token exists, redirect to /anime
  if (token) {
    redirect("/anime");
  }

  return (
    <div>
      <SignupForm />
    </div>
  );
}
