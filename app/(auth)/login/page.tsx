import LoginForm from "@/app/components/login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Login = async () => {
  const cookiesToken = await cookies();
  const token = cookiesToken.get("firebase-auth-token");

  // If token exists, redirect to /anime
  if (token) {
    redirect("/anime");
  }
  return (
    <div className=" font-mono">
      <LoginForm />
    </div>
  );
};

export default Login;
