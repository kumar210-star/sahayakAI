import UserDashboard from "@/components/dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - SchemeMate AI",
  description: "View your saved schemes, track application progress, read alerts, and manage your profile.",
};

export default function DashboardPage() {
  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-blue-50/40 via-white to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <UserDashboard />
      </div>
    </main>
  );
}
