"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void | Promise<void>;
}

export default function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    try {
      await onRetry();
    } catch (e) {
      console.error("Retry failed:", e);
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="brand-card p-6 sm:p-8 border border-red-100 dark:border-red-950 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center space-y-4 max-w-md w-full mx-auto">
      <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center shrink-0" aria-hidden="true">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <div className="pt-2">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white text-xs font-semibold rounded-xl shadow-md shadow-red-500/10 transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {isRetrying ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Retrying...
              </>
            ) : (
              "Retry Request"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
