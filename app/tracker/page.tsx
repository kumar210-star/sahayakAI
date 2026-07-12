import ApplicationTracker from "@/components/application-tracker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Tracker - SchemeMate AI",
  description: "Monitor real-time progress timelines, dates, and verification notes for your active government schemes applications.",
};

export default function TrackerPage() {
  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-blue-50/40 via-white to-white py-8 px-4 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-left space-y-1.5 border-b border-gray-100 dark:border-slate-800 pb-4">
          <h1 className="text-2xl font-extrabold text-[#0F172A] dark:text-white tracking-tight sm:text-3xl">
            Application Status Tracker
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Check the verification roadmap stages, verification officer details, and processing dates for registered schemes.
          </p>
        </div>
        <ApplicationTracker />
      </div>
    </main>
  );
}
