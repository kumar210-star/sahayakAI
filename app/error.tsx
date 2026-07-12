"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console or tracking dashboard
    console.error("Global crash captured by error boundary:", error);
  }, [error]);

  return (
    <main className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-12">
      {/* Background blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-100/50 dark:bg-red-950/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/40 dark:bg-amber-950/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md text-center space-y-6">
        {/* Main Error boundary card */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/70 dark:border-slate-800/70 rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col items-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center shrink-0" aria-hidden="true">
            <AlertCircle className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">
              500
            </h1>
            <h2 className="text-base font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
              Application Error
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
              An unexpected error occurred while rendering the page. This issue has been logged.
            </p>
          </div>

          {/* Diagnostic collapse info */}
          <div className="w-full text-left bg-gray-50 dark:bg-slate-950/60 border border-gray-100 dark:border-slate-850 rounded-2xl p-3.5 space-y-1">
            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              Error Details
            </span>
            <code className="block text-[10px] text-red-500 font-mono break-all leading-normal max-h-24 overflow-y-auto">
              {error.message || "Unknown client execution mismatch"}
            </code>
          </div>

          {/* Core controls */}
          <div className="pt-2 w-full grid grid-cols-2 gap-3">
            <button
              onClick={() => reset()}
              className="py-3 px-4 border border-gray-250 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
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
