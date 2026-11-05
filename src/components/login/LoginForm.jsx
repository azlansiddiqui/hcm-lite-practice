
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiLoader,
} from "react-icons/fi";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/firebase";


export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(e) {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const email = form.email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const persistence = form.remember
        ? browserLocalPersistence
        : browserSessionPersistence;

      await setPersistence(auth, persistence);

      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        form.password
      );

      const firebaseUser = credential.user;

      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        await signOut(auth);
        throw new Error(
          "Your account profile was not found. Contact the administrator."
        );
      }

      const userData = userSnapshot.data();

      const role = userData.role;

      const dashboards = {
        admin: "/admin",
        hr: "/hr",
        employee: "/employee",
      };

      if (!dashboards[role]) {
        await signOut(auth);
        throw new Error(
          "Your account has an invalid role. Contact the administrator."
        );
      }

      router.replace(dashboards[role]);
    } catch (err) {
      console.error("Login error:", err);

      const errorMessages = {
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect email or password.",
        "auth/invalid-email": "Enter a valid email address.",
        "auth/user-disabled": "This account has been disabled.",
        "auth/too-many-requests":
          "Too many attempts. Please try again later.",
        "auth/network-request-failed":
          "Network error. Check your internet connection.",
        "permission-denied":
          "Unable to access your profile. Check your account permissions.",
        "unavailable":
          "Database temporarily unavailable. Try again.",
      };

      setError(
        errorMessages[err.code] ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "h-14 w-full rounded-2xl border border-[#dbe3f5] bg-white pl-12 pr-12 text-[15px] text-slate-900 placeholder:text-slate-400 shadow-[0_1px_2px_rgba(30,64,175,0.04)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15";

  return (
    <section className="relative flex flex-col overflow-hidden bg-[#fafbff] px-6 py-10 sm:px-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-[#d9e1fb]/70 blur-2xl"
      />

      <div className="relative mx-auto my-auto w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
          <Image src="/images/logo.png" alt="HCM Lite" width={40} height={40} />
          <span className="text-xl font-semibold text-[#0a1f5c]">
            HCM Lite
          </span>
        </div>

        <header className="text-center">
          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[#0b1230]">
            Welcome Back!
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Sign in to your HCM account
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 space-y-5"
        >
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>

            <FiMail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              value={form.email}
              onChange={update}
              aria-invalid={!!error}
              className={inputBase}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <FiLock
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password"
              value={form.password}
              onChange={update}
              aria-invalid={!!error}
              className={inputBase}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {showPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2.5 text-slate-800">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={update}
                className="h-5 w-5 cursor-pointer rounded-md border-[#c5d0ea] accent-blue-600"
              />
              Remember me
            </label>
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] text-base font-semibold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.7)] transition hover:bg-[#1d4fd8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <FiLoader size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <FiArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>

      <p className="relative pt-8 text-center text-xs text-slate-500">
        © 2026 HCM Lite. All rights reserved.
      </p>
    </section>
  );
}
