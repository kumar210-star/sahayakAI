import EligibilityChat from "@/components/eligibility-chat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eligibility Checker - SchemeMate AI",
  description: "Answer conversational questions to discover government schemes you qualify for.",
};

export default function EligibilityPage() {
  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-blue-50/40 via-white to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight sm:text-4xl">
            AI Guided Eligibility Checker
          </h1>
          <p className="mt-2.5 text-sm text-gray-500">
            Let our conversational assistant analyze your eligibility for central and state government benefits.
          </p>
        </div>
        <EligibilityChat />
      </div>
    </main>
  );
}
