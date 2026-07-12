import UserProfile from "@/components/user-profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - SchemeMate AI",
  description: "View and update your personal, location, and economic eligibility attributes.",
};

export default function ProfilePage() {
  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-blue-50/40 via-white to-white py-8 px-4 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-left space-y-1.5 border-b border-gray-100 dark:border-slate-800 pb-4">
          <h1 className="text-2xl font-extrabold text-[#0F172A] dark:text-white tracking-tight sm:text-3xl">
            Account Profile
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Keep your eligibility details updated to get accurate scheme recommendations in real-time.
          </p>
        </div>
        <UserProfile />
      </div>
    </main>
  );
}
