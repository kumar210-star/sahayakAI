"use client";

import { useState, useEffect } from "react";
import { motion, LazyMotion, domAnimation, type Variants, type Transition } from "framer-motion";
import Link from "next/link";
import Features from "@/components/features";
import TrustedBy from "@/components/trusted-by";
import CtaBanner from "@/components/cta-banner";
import Footer from "@/components/footer";
import {
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Award,
  Compass,
  Globe,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Framer Motion – all constants at module scope
   to satisfy TypeScript inference correctly.
───────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const floatA: Transition = { repeat: Infinity, duration: 4, ease: "easeInOut" };
const floatB: Transition = { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 };

/* ─────────────────────────────────────────────
   Hero Page Component
───────────────────────────────────────────── */

export default function Home() {
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage");
    if (!saved) {
      setShowLangModal(true);
    }
  }, []);

  const selectLanguage = (lang: string) => {
    localStorage.setItem("preferredLanguage", lang);
    setShowLangModal(false);
    window.dispatchEvent(new Event("languageChanged"));
  };

  const languages = [
    { name: "English", native: "English" },
    { name: "Hindi (हिंदी)", native: "हिंदी" },
    { name: "Tamil (தமிழ்)", native: "தமிழ்" },
    { name: "Telugu (తెలుగు)", native: "తెలుగు" },
    { name: "Bengali (বাংলা)", native: "বাংলা" },
    { name: "Marathi (मराठी)", native: "मராठी" },
    { name: "Gujarati (ગુજરાતી)", native: "ગુજરાતી" },
    { name: "Kannada (ಕನ್ನಡ)", native: "ಕನ್ನಡ" },
    { name: "Malayalam (മലയാളം)", native: "മലയാളம்" },
    { name: "Punjabi (ਪੰਜਾਬੀ)", native: "ਪੰਜਾਬੀ" }
  ];

  return (
    <LazyMotion features={domAnimation}>
    <main>
      {/* Language Selection Modal on first load */}
      {showLangModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-md p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="lang-modal-title">
          <div className="brand-card p-6 sm:p-8 max-w-md w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-2xl relative space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-850 text-[#2563EB] flex items-center justify-center mx-auto" aria-hidden="true">
                <Globe className="w-6 h-6" />
              </div>
              <h2 id="lang-modal-title" className="text-lg font-extrabold text-[#0F172A] dark:text-white leading-tight">
                Choose Your Language
              </h2>
              <p className="text-xs text-gray-400">अपनी पसंदीदा भाषा चुनें</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {languages.map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => selectLanguage(lang.name)}
                  className="py-3 px-4 rounded-xl border border-gray-200 dark:border-slate-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-[#2563EB] hover:bg-blue-50/20 dark:hover:bg-slate-800 hover:text-[#2563EB] transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <div className="font-bold text-sm">{lang.native}</div>
                  <div className="text-[10px] text-gray-400 font-normal mt-0.5">{lang.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* ── HERO SECTION ─────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50/60 via-white to-white"
      >
        {/* Ambient decorative blobs */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute -top-24 left-[5%] h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute bottom-0 right-[5%] h-[400px] w-[400px] rounded-full bg-green-100/40 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">

            {/* ── LEFT COLUMN: Content ─────────────── */}
            <motion.div
              className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Animated Badge */}
              <motion.div variants={badgeVariants} className="mb-6 inline-flex">
                <span
                  role="status"
                  aria-label="AI Powered Government Opportunity Platform"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-sm sm:text-sm"
                >
                  {/* Live pulse dot */}
                  <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                  </span>
                  <span aria-hidden="true">🇮🇳</span>
                  AI Powered Government Opportunity Platform
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                id="hero-heading"
                variants={fadeUpVariants}
                className="text-4xl font-extrabold leading-tight tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl"
              >
                Find Government Schemes
                <br className="hidden sm:block" />
                <span className="mt-1 inline-block bg-gradient-to-r from-[#2563EB] to-blue-700 bg-clip-text text-transparent">
                  You&apos;re Eligible For
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUpVariants}
                className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl"
              >
                Answer a few simple questions and instantly discover Central and State
                Government schemes personalized for your profile.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUpVariants}
                className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:gap-4 lg:justify-start"
              >
                {/* Primary */}
                <Link
                  href="/eligibility"
                  aria-label="Check your eligibility for government schemes"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-300/40 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                >
                  Check Eligibility
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>

                {/* Secondary */}
                <Link
                  href="/assistant"
                  aria-label="Talk to the SchemeMate AI assistant"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                >
                  <Sparkles className="h-5 w-5 text-[#2563EB]" aria-hidden="true" />
                  Talk to AI Assistant
                </Link>
              </motion.div>

              {/* Trust Bar */}
              <motion.div
                variants={fadeUpVariants}
                className="mt-10 grid w-full max-w-sm grid-cols-3 gap-6 border-t border-gray-100 pt-8 lg:max-w-none"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-extrabold text-[#0F172A]">1,200+</span>
                  <span className="text-xs font-medium text-gray-500">Active Schemes</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-extrabold text-[#0F172A]">36</span>
                  <span className="text-xs font-medium text-gray-500">States &amp; UTs</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-extrabold text-[#16A34A]">100%</span>
                  <span className="text-xs font-medium text-gray-500">AI Assisted</span>
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN: Glass Card Illustration ── */}
            <motion.div
              className="lg:col-span-5 flex w-full justify-center lg:justify-end"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full max-w-[420px]">

                {/* Main glass card */}
                <div
                  className="relative flex h-[520px] w-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/75 p-5 shadow-2xl backdrop-blur-md"
                  aria-hidden="true"
                >
                  {/* Inner radial glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-blue-400/10 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-green-300/10 blur-2xl" />

                  {/* Card chrome dots */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5">
                      <Compass className="h-3 w-3 text-[#2563EB]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        SchemeMate
                      </span>
                    </div>
                  </div>

                  {/* Mock search bar */}
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-gray-200/70 bg-gray-50/80 px-3 py-2.5">
                    <Search className="h-4 w-4 shrink-0 text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium select-none">
                      Search schemes, departments...
                    </span>
                  </div>

                  {/* Active filter pills */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {["Agriculture", "Housing", "Education"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="rounded-full border border-gray-100 bg-gray-50 px-2.5 py-0.5 text-[10px] font-semibold text-gray-400">
                      +6 more
                    </span>
                  </div>

                  {/* Scheme result cards */}
                  <div className="flex flex-1 flex-col gap-3 overflow-hidden">
                    {/* Scheme Card 1 */}
                    <div className="rounded-xl border border-gray-100/80 bg-white p-3.5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="inline-flex rounded-md border border-green-200/40 bg-green-50 px-1.5 py-0.5 text-[9px] font-semibold text-green-700">
                            ✓ Eligible
                          </span>
                          <h4 className="text-xs font-bold text-[#0F172A] line-clamp-1">
                            PM Awas Yojana (Urban)
                          </h4>
                          <p className="text-[10px] text-gray-500 line-clamp-1">
                            Housing for all — urban households
                          </p>
                        </div>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50">
                          <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between border-t border-gray-50 pt-2 text-[10px] font-medium text-gray-400">
                        <span>Central Subsidy</span>
                        <span className="font-bold text-[#0F172A]">Up to ₹2.67 Lakhs</span>
                      </div>
                    </div>

                    {/* Scheme Card 2 */}
                    <div className="rounded-xl border border-gray-100/80 bg-white p-3.5 shadow-sm opacity-95 transition-transform duration-200 hover:-translate-y-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="inline-flex rounded-md border border-blue-200/40 bg-blue-50 px-1.5 py-0.5 text-[9px] font-semibold text-blue-700">
                            DBT Transfer
                          </span>
                          <h4 className="text-xs font-bold text-[#0F172A] line-clamp-1">
                            PM-Kisan Samman Nidhi
                          </h4>
                          <p className="text-[10px] text-gray-500 line-clamp-1">
                            Direct income support for farmers
                          </p>
                        </div>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50">
                          <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between border-t border-gray-50 pt-2 text-[10px] font-medium text-gray-400">
                        <span>Yearly Benefit</span>
                        <span className="font-bold text-[#0F172A]">₹6,000 / Year</span>
                      </div>
                    </div>

                    {/* Scheme Card 3 — faded teaser */}
                    <div className="rounded-xl border border-gray-100/60 bg-white/60 p-3.5 opacity-50">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="inline-flex rounded-md border border-purple-200/40 bg-purple-50 px-1.5 py-0.5 text-[9px] font-semibold text-purple-700">
                            Education
                          </span>
                          <h4 className="text-xs font-bold text-[#0F172A] line-clamp-1">
                            National Scholarship Portal
                          </h4>
                          <p className="text-[10px] text-gray-500 line-clamp-1">
                            Merit and means-based scholarships
                          </p>
                        </div>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-50">
                          <Award className="h-4 w-4 text-purple-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card footer status */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      <span className="text-[10px] font-semibold text-gray-500">
                        Live sync — Official sources
                      </span>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg border border-green-100 bg-green-50/70 px-2 py-0.5">
                      <TrendingUp className="h-3 w-3 text-[#16A34A]" />
                      <span className="text-[10px] font-bold text-green-700">+8.4k today</span>
                    </div>
                  </div>
                </div>

                {/* Floating badge — AI Match */}
                <motion.div
                  className="absolute -left-5 -top-4 z-20 flex select-none items-center gap-2 rounded-xl border border-gray-100 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm"
                  animate={{ y: [0, -8, 0] }}
                  transition={floatA}
                  aria-hidden="true"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[#2563EB]">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[10px] font-extrabold text-[#0F172A]">AI Match</p>
                    <p className="text-[9px] font-medium text-gray-400">98% accuracy</p>
                  </div>
                </motion.div>

                {/* Floating badge — Verified */}
                <motion.div
                  className="absolute -bottom-4 -right-5 z-20 flex select-none items-center gap-2 rounded-xl border border-gray-100 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm"
                  animate={{ y: [0, 8, 0] }}
                  transition={floatB}
                  aria-hidden="true"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-[#16A34A]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[10px] font-extrabold text-[#0F172A]">Verified</p>
                    <p className="text-[9px] font-medium text-gray-400">Official sync</p>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ──────────────────────── */}
      <Features />

      {/* ── TRUSTED BY SECTION ───────────────────── */}
      <TrustedBy />

      {/* ── CTA BANNER ───────────────────────────── */}
      <CtaBanner />

      {/* ── FOOTER ───────────────────────────────── */}
      <Footer />

    </main>
    </LazyMotion>
  );
}
