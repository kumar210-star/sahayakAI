"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Loader2, MailCheck, ShieldAlert } from "lucide-react";
import AuthLayout from "@/components/auth/auth-layout";
import { resetPassword } from "@/lib/supabase/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [shakeEmail, setShakeEmail] = useState(false);

  const shakeVariants = {
    shake: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4 } },
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 400);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 400);
      return;
    }

    setEmailError("");
    setIsLoading(true);
    await resetPassword(email);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <LazyMotion features={domAnimation}>
      <AuthLayout
        title={isSubmitted ? "Check your email" : "Reset your password"}
        subtitle={
          isSubmitted
            ? "We sent a password recovery link to your inbox"
            : "Enter your email address and we'll send you a recovery link"
        }
      >
        {!isSubmitted ? (
          /* Password reset form */
          <form onSubmit={handleResetRequest} className="space-y-4 w-full text-left" noValidate>
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
                  Sending Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="text-center text-xs font-semibold pt-2 border-t border-gray-50 dark:border-slate-800/40">
              <Link href="/login" className="text-[#2563EB] hover:text-blue-700">
                Back to Sign In
              </Link>
            </div>
          </form>
        ) : (
          /* Success Message Display */
          <div className="w-full text-center space-y-5 py-4">
            <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-950/20 text-green-500 flex items-center justify-center mx-auto" aria-hidden="true">
              <MailCheck className="w-6 h-6" />
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-slate-950 rounded-2xl border border-gray-100 dark:border-slate-800/60 text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-left flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Please check the spam folder if you do not receive the email link in 5 minutes. The recovery link will expire in 60 minutes.
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="w-full inline-flex justify-center py-3 bg-[#2563EB] text-white hover:bg-blue-700 text-sm font-semibold rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                Return to Login
              </Link>
            </div>
          </div>
        )}
      </AuthLayout>
    </LazyMotion>
  );
}
