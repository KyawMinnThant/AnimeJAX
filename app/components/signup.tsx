"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { setAuthCookie } from "../action/authActions";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupData>();

  const onSubmit = async (data: SignupData) => {
    if (loading) return;
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      toast.success("Account created successfully!");

      setTimeout(() => {
        router.push("/anime");
      }, 800);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "Email already exists!",
        });
      } else if (err.code === "auth/weak-password") {
        setError("password", {
          type: "manual",
          message: "Password too weak",
        });
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const token = await user.getIdToken();
      const uid = user.uid;

      // ✅ Set cookie on server
      await setAuthCookie(token, uid);

      // ✅ Redirect after successful register
      router.push("/anime");
    });

    return () => unsub();
  }, [router]);

  return (
    <div className="min-h-screen flex font-mono mt-[100px] items-center justify-center bg-[#0a0a0a]/90 px-4">
      <div className="max-w-md w-full bg-[#111] border border-white/10 rounded-xl shadow-xl backdrop-blur-xl p-8 text-white">
        <div className="flex justify-center mb-8">
          <div className="text-3xl font-bold italic cursor-pointer flex items-center">
            <span className="text-white">Anime</span>
            <span className="text-purple-500">JAX</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">
          Create your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              {...register("name", {
                required: "Full name is required",
                minLength: 3,
              })}
              disabled={loading}
              className="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 outline-none"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">
                {errors.name.message || "Name must be at least 3 characters"}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              disabled={loading}
              className="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="block text-sm mb-1">Password</label>
            <input
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              type={showPassword ? "text" : "password"}
              disabled={loading}
              className="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 outline-none pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-[38px] right-3 text-gray-400 hover:text-purple-400 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold text-white flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
