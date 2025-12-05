"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { setAuthCookie } from "../action/authActions";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginData>();

  const googleProvider = new GoogleAuthProvider();

  // 🔒 Redirect if already logged in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const uid = user.uid;

        // Pass both token and uid
        await setAuthCookie(token, uid);

        router.push("/anime");
      }
    });

    return () => unsub();
  }, [router]);

  // ------------------ GOOGLE LOGIN -------------------
  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await signInWithPopup(auth, googleProvider);
      const token = await res.user.getIdToken();
      const uid = res.user.uid;

      await setAuthCookie(token, uid); // Pass uid here

      toast.success("Logged in with Google!");
      router.push("/anime");
    } catch (error: any) {
      toast.error(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ EMAIL LOGIN -------------------
  const onSubmit = async (data: LoginData) => {
    if (loading) return;
    setLoading(true);

    clearErrors();
    setFormError(null);

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const token = await res.user.getIdToken();
      await setAuthCookie(token, res.user.uid);

      toast.success("Logged in successfully!");
      router.push("/anime");
    } catch (error: any) {
      console.error("Firebase auth error:", error);

      if (error.code === "auth/user-not-found") {
        setError("email", { type: "manual", message: "User not found." });
      } else if (error.code === "auth/wrong-password") {
        setError("password", {
          type: "manual",
          message: "Incorrect password.",
        });
      } else if (error.code === "auth/invalid-credential") {
        setFormError("Invalid credentials. Please check your info.");
      } else {
        toast.error("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-mono mt-[100px] items-center justify-center bg-[#0a0a0a]/90 px-4">
      <div className="max-w-md w-full bg-[#111] border border-white/10 rounded-xl shadow-xl backdrop-blur-xl p-8 text-white">
        <div className="flex justify-center mb-8 text-3xl font-bold italic cursor-pointer">
          <span className="text-white">Anime</span>
          <span className="text-purple-500">JAX</span>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-center">Log in</h2>

        {formError && (
          <p className="mb-4 text-center text-red-500 font-medium">
            {formError}
          </p>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border hover:bg-black transition disabled:opacity-50"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            className="w-5"
          />
          Continue with Google
        </button>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Or continue with email
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
              })}
              className={`w-full px-3 py-2 rounded-lg bg-[#1a1a1a] border ${
                errors.email ? "border-red-500" : "border-white/10"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm mb-1 text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className={`w-full px-3 py-2 rounded-lg bg-[#1a1a1a] border pr-10 ${
                errors.password ? "border-red-500" : "border-white/10"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-[38px] right-3"
            >
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>

            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-purple-400">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
