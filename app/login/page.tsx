"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth/auth-layout";
import SocialButtons from "@/components/auth/social-buttons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error validations states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  const shakeVariants = {
    shake: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4 } },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 400);
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 400);
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      setShakePassword(true);
      setTimeout(() => setShakePassword(false), 400);
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      setIsLoading(true);
      // Simulate authenticating check before dashboard entry
      setTimeout(() => {
        setIsLoading(false);
        router.push("/dashboard");
      }, 1200);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <AuthLayout
        title="Sign In to SchemeMate AI"
        subtitle="Manage your applications and check new scheme matches"
      >
        <form onSubmit={handleLogin} className="space-y-4 w-full text-left" noValidate>
          
          {/* Email input field */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Email Address
            </label>
            <motion.div animate={shakeEmail ? "shake" : ""} variants={shakeVariants}>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                className={`w-full px-4 py-3 border rounded-xl text-sm bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all ${
                  emailError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-250 dark:border-slate-800 focus:ring-[#2563EB]"
                }`}
              />
            </motion.div>
            {emailError && (
              <p className="text-[10px] font-bold text-red-500 tracking-wide mt-1">
                ⚠️ {emailError}
              </p>
            )}
          </div>

          {/* Password input field */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[10px] font-bold text-[#2563EB] hover:text-blue-700 tracking-wide"
              >
                Forgot Password?
              </Link>
            </div>
            <motion.div 
              animate={shakePassword ? "shake" : ""} 
              variants={shakeVariants}
              className="relative flex items-center"
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                className={`w-full pl-4 pr-10 py-3 border rounded-xl text-sm bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-250 dark:border-slate-800 focus:ring-[#2563EB]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </motion.div>
            {passwordError && (
              <p className="text-[10px] font-bold text-red-500 tracking-wide mt-1">
                ⚠️ {passwordError}
              </p>
            )}
          </div>

          {/* Remember me option */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 text-xs font-semibold text-gray-600 dark:text-gray-400 cursor-pointer select-none">
              Remember me
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              isLoading
                ? "bg-blue-300 dark:bg-blue-900 text-white cursor-not-allowed"
                : "bg-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Social login list */}
          <SocialButtons />

          {/* Footer link */}
          <div className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-50 dark:border-slate-800/40">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#2563EB] hover:text-blue-700 ml-0.5"
            >
              Sign Up
            </Link>
          </div>

        </form>
      </AuthLayout>
    </LazyMotion>
  );
}
