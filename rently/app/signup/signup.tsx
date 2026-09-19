"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, MapPin, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface AuthPageProps {
  name: string;
  email: string;
  password: string;
}

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<AuthPageProps>({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const isSignup = mode === "signup";

  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   try {
     if(isSignup){
      if(role !== "OWNER" && role !== "CUSTOMER") {
        alert("Invalid role. Please select a valid role.");
        router.push("/api/role");
        return;
      }
      console.log("Form Data:", formData);

      const res = await fetch("/api/auth/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...formData, role })
      });

      const data = await res.json();
     

      if(!res.ok) {
       
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess(data.message || "Signup successful");
    }
    else {
     const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: formData.email, password: formData.password, role })
     });

      const data = await res.json();
      
      if(!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      setSuccess(data.message || "Login successful");
      if(role === "CUSTOMER") {
        router.push(`/Customer/${data.user.userId}`);
      } else if (role === "OWNER") {
        router.push(`/Owner/${data.user.userId}`);
      }
     
    }
   }catch (error) {
    console.log("Error: ", error)
    setError("An unexpected error occurred. Please try again.");
  }
}

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ecfeff_0%,_#f8fafc_35%,_#eff6ff_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[32px] border border-sky-100 bg-white/80 shadow-[0_30px_80px_rgba(14,116,144,0.12)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-cyan-700 to-teal-600 p-8 text-white sm:p-10 lg:p-12">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-10 left-10 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <MapPin className="w-6 h-6 text-white" />
            </div>
                  <span className="text-sm font-semibold tracking-[0.18em] uppercase">Rently</span>
                </div>

                <h1 className="max-w-md text-4xl font-black leading-tight sm:text-5xl">
                  Turn your ride into a smooth experience.
                </h1>

                <p className="mt-5 max-w-md text-base text-cyan-50/90 sm:text-lg">
                  Discover trusted vehicles, manage rentals in minutes, and enjoy seamless bookings from anywhere.
                </p>

                <div className="mt-10 space-y-4">
                  {[
                    "Verified owners and vehicles",
                    "Secure rentals with instant booking",
                    "Smart pricing and flexible plans",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-cyan-100">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-cyan-50">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 rounded-3xl border border-white/10 bg-slate-950/10 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                      <ShieldCheck className="h-5 w-5 text-cyan-100" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-cyan-100">Trusted by thousands</div>
                      <div className="text-xs text-cyan-50/80">Built for safe, modern rentals</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <div className="mx-auto max-w-md">
                <div className="mb-8 flex items-center justify-between rounded-full bg-slate-100 p-1.5">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="mb-6 flex items-center gap-3">
                  
                   <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <MapPin className="w-6 h-6 text-white" />
            </div>
                 
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {isSignup ? "Create your account" : "Welcome back"}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {isSignup ? "Start your journey with Rently" : "Sign in to continue your rentals"}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignup && (
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 transition focus-within:border-cyan-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
                        <User className="h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </label>
                  )}

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Email address</span>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 transition focus-within:border-cyan-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 transition focus-within:border-cyan-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
                      <Lock className="h-4 w-4 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        aria-label="Toggle password visibility"
                        onClick={() => setShowPassword((value) => !value)}
                        className="text-slate-500 transition hover:text-slate-700"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>

                  {isSignup && (
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-700">Confirm password</span>
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 transition focus-within:border-cyan-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
                        <Lock className="h-4 w-4 text-slate-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter your password"
                          className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                        />
                        <button
                          type="button"
                          aria-label="Toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword((value) => !value)}
                          className="text-slate-500 transition hover:text-slate-700"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </label>
                  )}

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" />
                      <span>{isSignup ? "I agree to terms" : "Remember me"}</span>
                    </label>
                    {!isSignup && (
                      <button type="button" className="font-medium text-cyan-600 hover:text-cyan-700">
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <Button type="submit" className="mt-2 w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-600 px-4 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:translate-y-[-1px] hover:shadow-xl hover:shadow-cyan-500/25">
                    {isSignup ? "Create account" : "Login"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span>or continue with</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {success && <p className="text-green-600 text-sm">{success}</p>}
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
