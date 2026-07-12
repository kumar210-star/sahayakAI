"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Eye, EyeOff, Loader2, KeyRound } from "lucide-react";
import AuthLayout from "@/components/auth/auth-layout";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Errors validation
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [shakePassword, setShakePassword] = useState(false);
  const [shakeConfirm, setShakeConfirm] = useState(false);

  const shakeVariants = {
    shake: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4 } },
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      setShakePassword(true);
      setTimeout(() => setShakePassword(false), 400);
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Must contain at least 8 characters");
      setShakePassword(true);
      setTimeout(() => setShakePassword(false), 400);
      valid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmError("Please confirm your password");
      setShakeConfirm(true);
      setTimeout(() => setShakeConfirm(false), 400);
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      setShakeConfirm(true);
      setTimeout(() => setShakeConfirm(false), 400);
      valid = false;
    } else {
      setConfirmError("");
    }

    if (valid) {
      setIsLoading(true);
      // Simulate saving new password
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 1200);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <AuthLayout
        title={isSuccess ? "Password updated" : "Create new password"}
        subtitle={
          isSuccess
            ? "Your account security credentials have been updated"
            : "Set a new secure password to access your account"
        }
      >
        {!isSuccess ? (
          /* Form for new password setup */
          <form onSubmit={handleResetSubmit} className="space-y-4 w-full text-left" noValidate>
            
            {/* New Password input */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                New Password
              </label>
              <motion.div 
                animate={shakePassword ? "shake" : ""} 
                variants={shakeVariants}
                className="relative flex items-center"
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
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

            {/* Confirm Password input */}
            <div className="space-y-1">
              <label htmlFor="confirm-password" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Confirm Password
              </label>
              <motion.div animate={shakeConfirm ? "shake" : ""} variants={shakeVariants}>
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmError) setConfirmError("");
                  }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all ${
                    confirmError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-250 dark:border-slate-800 focus:ring-[#2563EB]"
                  }`}
                />
              </motion.div>
              {confirmError && (
                <p className="text-[10px] font-bold text-red-500 tracking-wide mt-1">
                  ⚠️ {confirmError}
                </p>
              )}
            </div>

            {/* Reset Button */}
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
                  Updating Password...
                </>
              ) : (
                "Reset Password"
              )}
            </button>

            <div className="text-center text-xs font-semibold pt-2 border-t border-gray-50 dark:border-slate-800/40">
              <Link href="/login" className="text-[#2563EB] hover:text-blue-700">
                Back to Sign In
              </Link>
            </div>
          </form>
        ) : (
          /* Success Screen Display */
          <div className="w-full text-center space-y-5 py-4">
            <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-950/20 text-green-500 flex items-center justify-center mx-auto" aria-hidden="true">
              <KeyRound className="w-6 h-6" />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
              Your password has been reset successfully. You can now use your new password to sign in.
            </p>

            <div className="pt-2">
              <Link
                href="/login"
                className="w-full inline-flex justify-center py-3 bg-[#2563EB] text-white hover:bg-blue-700 text-sm font-semibold rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </AuthLayout>
    </LazyMotion>
  );
}
