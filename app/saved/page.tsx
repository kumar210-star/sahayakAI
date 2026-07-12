import SavedSchemes from "@/components/saved-schemes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Schemes - SchemeMate AI",
  description: "View, share, sort, and compare your saved government scheme recommendations side-by-side.",
};

export default function SavedSchemesPage() {
  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-blue-50/40 via-white to-white py-8 px-4 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-left space-y-1.5 border-b border-gray-100 dark:border-slate-800 pb-4">
          <h1 className="text-2xl font-extrabold text-[#0F172A] dark:text-white tracking-tight sm:text-3xl">
            Saved Schemes
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Compare and manage government schemes you saved for application tracking.
          </p>
        </div>
        <SavedSchemes />
      </div>
    </main>
  );
}
