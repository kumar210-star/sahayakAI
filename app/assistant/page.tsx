import AiAssistant from "@/components/ai-assistant";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Assistant - SchemeMate AI",
  description: "Chat in plain language with our AI Assistant to find, verify, and compare government schemes.",
};

export default function AssistantPage() {
  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-blue-50/40 via-white to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight sm:text-4xl">
            SchemeMate AI Assistant
          </h1>
          <p className="mt-2.5 text-sm text-gray-500">
            Ask questions about government eligibility, registration processes, documents, and benefits.
          </p>
        </div>
        <AiAssistant />
      </div>
    </main>
  );
}
