"use client";

import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-12">
      {/* Glow overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/50 dark:bg-blue-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-150/40 dark:bg-green-950/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md text-center space-y-6">
        {/* Visual Badge Card */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/70 dark:border-slate-800/70 rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col items-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-slate-850 text-[#2563EB] flex items-center justify-center animate-bounce" aria-hidden="true">
            <Compass className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
              404
            </h1>
            <h2 className="text-base font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
              Page Not Found
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
              The page you are looking for does not exist, has been removed, or has been temporarily moved.
            </p>
          </div>

          <div className="pt-2 w-full grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                if (typeof window !== "undefined") window.history.back();
              }}
              className="py-3 px-4 border border-gray-250 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Go Back
            </button>
            <Link
              href="/"
              className="py-3 px-4 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
