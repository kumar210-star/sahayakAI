"use client";

import { useState } from "react";
import { motion, LazyMotion, domAnimation, AnimatePresence, type Variants } from "framer-motion";
import {
  Compass,
  Bookmark,
  Bell,
  Clock,
  Search,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  TrendingUp,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { ApplicationStatus, UserNotification, SearchLog, EligibilityLog } from "@/types/dashboard";
import { SchemeRecommendation } from "@/types/recommendation";
import EmptyState from "./ui/empty-state";

/* ─────────────────────────────────────────────
   Mock Dashboard Data
───────────────────────────────────────────── */

const initialApplications: ApplicationStatus[] = [
  {
    id: "app-1",
    schemeName: "PM Awas Yojana (Urban)",
    currentStep: 1,
    steps: ["Submitted", "Documents Verified", "Officer Review", "Disbursement"],
    lastUpdated: "2 hours ago",
  },
  {
    id: "app-2",
    schemeName: "PM-Kisan Samman Nidhi",
    currentStep: 3,
    steps: ["Submitted", "Verification", "Review", "Approved & Active"],
    lastUpdated: "10 mins ago",
  },
];

const initialSavedSchemes: SchemeRecommendation[] = [
  {
    id: "rec-nsp",
    name: "Post-Matric Scholarship Scheme",
    category: "Education",
    authority: "Ministry of Social Justice",
    description: "Financial assistance for students from SC/ST/OBC categories to pursue post-matric courses.",
    score: 92,
    benefit: "Full tuition reimbursement + ₹1,200 monthly allowance",
    whyEligible: [],
    documents: ["Marksheet", "Income proof", "Caste certificate"],
    applyUrl: "https://scholarships.gov.in/",
  },
  {
    id: "rec-mudra",
    name: "Pradhan Mantri MUDRA Yojana",
    category: "Business",
    authority: "MUDRA Agency",
    description: "Collateral-free business loans up to ₹10 Lakhs for micro and small enterprises.",
    score: 88,
    benefit: "Loans up to ₹10 Lakhs with low interest rates",
    whyEligible: [],
    documents: ["ID Proof", "Business registration", "Project Report"],
    applyUrl: "https://www.mudra.org.in/",
  },
];

const initialNotifications: UserNotification[] = [
  {
    id: "notif-1",
    type: "success",
    message: "PM-Kisan installment of ₹2,000 has been credited to your bank account via DBT.",
    timestamp: "10 mins ago",
  },
  {
    id: "notif-2",
    type: "warning",
    message: "PM Awas Yojana requires additional land registry proof documents. Please re-upload.",
    timestamp: "2 hours ago",
  },
  {
    id: "notif-3",
    type: "info",
    message: "New scholarship schemes updated for students residing in Maharashtra.",
    timestamp: "1 day ago",
  },
];

const initialHistory: EligibilityLog[] = [
  {
    id: "hist-1",
    timestamp: "Today, 12:45 PM",
    matchesCount: 85,
    profileSummary: "Age: 26–35 · Farmer · Maharashtra · Income: ₹1–3L",
  },
  {
    id: "hist-2",
    timestamp: "July 05, 2026",
    matchesCount: 92,
    profileSummary: "Age: 18–25 · Student · Uttar Pradesh · Income: Below ₹1L",
  },
];

const initialSearches: SearchLog[] = [
  { id: "s-1", query: "housing loan subsidy", timestamp: "3 hours ago" },
  { id: "s-2", query: "farmer cash benefit", timestamp: "Yesterday" },
  { id: "s-3", query: "post graduate scholarship", timestamp: "3 days ago" },
];

const recommendedSchemes: SchemeRecommendation[] = [
  {
    id: "rec-pahal",
    name: "PAHAL (LPG Subsidy Transfer)",
    category: "Subsidy",
    authority: "Ministry of Petroleum",
    description: "Direct benefit transfer of LPG subsidy into linked bank accounts of customers.",
    score: 96,
    benefit: "Direct cash transfer of LPG cylinder subsidy",
    whyEligible: [],
    documents: ["Aadhaar Linkage", "LPG Connection Proof"],
    applyUrl: "#",
  },
];

/* ─────────────────────────────────────────────
   Framer Motion animations
───────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function UserDashboard() {
  const [savedSchemes, setSavedSchemes] = useState<SchemeRecommendation[]>(initialSavedSchemes);
  const [notifications, setNotifications] = useState<UserNotification[]>(initialNotifications);
  const [searches, setSearches] = useState<SearchLog[]>(initialSearches);
  const [profileCompletePercent, setProfileCompletePercent] = useState(75);

  const handleRemoveSaved = (id: string) => {
    setSavedSchemes((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleRemoveSearch = (id: string) => {
    setSearches((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCompleteProfileTask = () => {
    if (profileCompletePercent < 100) {
      setProfileCompletePercent(100);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 w-full max-w-7xl mx-auto"
      >
        
        {/* ── TOP SECTION: WELCOME & PROFILE COMPLETION BANNER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Welcome Banner */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gradient-to-r from-blue-50/70 to-indigo-50/30 dark:from-slate-900/50 dark:to-slate-800/10 p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-2 relative z-10">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                User Dashboard
              </span>
              <h2 className="text-2xl font-extrabold text-[#0F172A] dark:text-white sm:text-3xl">
                Welcome back, Rajesh!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                Monitor your active government applications, review saved schemes, and discover new matches based on your profile.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 items-center relative z-10">
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-lg border border-gray-100 dark:border-slate-800 shadow-sm text-xs font-bold text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Aadhaar Seeded
              </div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-lg border border-gray-100 dark:border-slate-800 shadow-sm text-xs font-bold text-gray-600 dark:text-gray-300">
                <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                Farmer Profile
              </div>
            </div>
          </motion.div>

          {/* Profile Completion Circle widget */}
          <motion.div
            variants={cardVariants}
            className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">Profile Strength</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {profileCompletePercent}% completed.
              </p>
              {profileCompletePercent < 100 ? (
                <button
                  onClick={handleCompleteProfileTask}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:text-blue-700 transition-colors mt-2"
                >
                  Link PAN Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs font-bold text-green-500 flex items-center gap-1 mt-2">
                  <Check className="w-4 h-4" /> Profile Fully Linked
                </span>
              )}
            </div>

            {/* Circular Progress Ring */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-gray-100 dark:stroke-slate-800"
                  strokeWidth="6"
                  fill="transparent"
                />
                {/* Colored Progress Ring */}
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-[#2563EB]"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={213}
                  initial={{ strokeDashoffset: 213 }}
                  animate={{ strokeDashoffset: 213 - (213 * profileCompletePercent) / 100 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute text-sm font-extrabold text-[#0F172A] dark:text-white">
                {profileCompletePercent}%
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── MAIN DASHBOARD CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT 2 COLUMNS (col-span-2) */}
          <div className="lg:col-span-2 space-y-6">

            {/* 1. Application Progress */}
            <motion.div
              variants={cardVariants}
              className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
            >
              <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#2563EB]" />
                Application Progress
              </h3>
              
              <div className="space-y-6">
                {initialApplications.map((app) => (
                  <div key={app.id} className="space-y-3.5">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="font-bold text-[#0F172A] dark:text-white">{app.schemeName}</span>
                      <span className="text-gray-400">Updated {app.lastUpdated}</span>
                    </div>

                    {/* Progress steps row */}
                    <div className="grid grid-cols-4 gap-2">
                      {app.steps.map((step, idx) => {
                        const isDone = idx < app.currentStep;
                        const isActive = idx === app.currentStep;
                        return (
                          <div key={step} className="space-y-1">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                isDone
                                  ? "bg-green-500"
                                  : isActive
                                  ? "bg-[#2563EB] animate-pulse"
                                  : "bg-gray-100 dark:bg-slate-800"
                              }`}
                            />
                            <span
                              className={`block text-[9px] font-bold text-center leading-tight truncate ${
                                isDone
                                  ? "text-green-600 dark:text-green-400"
                                  : isActive
                                  ? "text-[#2563EB] font-extrabold"
                                  : "text-gray-400"
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 2. Saved Schemes list */}
            <motion.div
              variants={cardVariants}
              className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
            >
              <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#2563EB]" />
                Saved Schemes
              </h3>

              <AnimatePresence mode="popLayout">
                {savedSchemes.length === 0 ? (
                  <EmptyState
                    title="No saved schemes"
                    description="You haven't bookmarked any schemes. Use the Eligibility Checker to save matches."
                  />
                ) : (
                  <div className="space-y-3.5">
                    {savedSchemes.map((scheme) => (
                      <motion.div
                        key={scheme.id}
                        layout
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="p-4 bg-gray-50/50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-800/50 flex justify-between items-start gap-4 transition-all hover:border-gray-200 dark:hover:border-slate-700"
                      >
                        <div className="space-y-1">
                          <span className="inline-flex rounded bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                            {scheme.category}
                          </span>
                          <h4 className="text-xs font-bold text-[#0F172A] dark:text-white leading-snug">
                            {scheme.name}
                          </h4>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal line-clamp-1">
                            {scheme.description}
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <a
                            href={scheme.applyUrl}
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 px-3 py-2 rounded-lg text-[10px] font-bold text-[#0F172A] dark:text-gray-300 transition-colors shadow-xs"
                          >
                            Resume App
                          </a>
                          <button
                            onClick={() => handleRemoveSaved(scheme.id)}
                            className="p-2 border border-gray-100 dark:border-slate-800 hover:border-red-100 hover:bg-red-50/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                            aria-label={`Remove ${scheme.name} from saved`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 3. Recommended Schemes */}
            <motion.div
              variants={cardVariants}
              className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
            >
              <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#2563EB]" />
                Recommended For You
              </h3>

              <div className="space-y-3.5">
                {recommendedSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 flex justify-between items-start gap-4 transition-all hover:shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex rounded bg-green-50 dark:bg-green-950/40 px-1.5 py-0.5 text-[9px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
                          {scheme.score}% Match
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">{scheme.authority}</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#0F172A] dark:text-white leading-snug">
                        {scheme.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal line-clamp-1">
                        {scheme.description}
                      </p>
                    </div>
                    <a
                      href="/eligibility"
                      className="bg-[#2563EB] hover:bg-blue-700 px-3 py-2 rounded-lg text-[10px] font-bold text-white transition-colors shrink-0 shadow-sm"
                    >
                      Check Eligibility
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN (col-span-1) */}
          <div className="space-y-6">

            {/* 1. Notifications Center */}
            <motion.div
              variants={cardVariants}
              className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
            >
              <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#2563EB]" />
                Recent Alerts
              </h3>

              <AnimatePresence mode="popLayout">
                {notifications.length === 0 ? (
                  <EmptyState
                    title="No new alerts"
                    description="You are completely caught up!"
                  />
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notif) => {
                      const Icon =
                        notif.type === "success"
                          ? CheckCircle
                          : notif.type === "warning"
                          ? AlertTriangle
                          : Info;
                      const colorClass =
                        notif.type === "success"
                          ? "text-green-500 bg-green-50 dark:bg-green-950/20"
                          : notif.type === "warning"
                          ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                          : "text-blue-500 bg-blue-50 dark:bg-blue-950/20";

                      return (
                        <motion.div
                          key={notif.id}
                          layout
                          exit={{ opacity: 0, x: 20 }}
                          className="flex gap-3 p-3 rounded-xl border border-gray-50 dark:border-slate-800/40 bg-white dark:bg-slate-900/50 hover:bg-gray-50/50 dark:hover:bg-slate-900 transition-colors group relative"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${colorClass}`} aria-hidden="true">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5 leading-tight flex-1 pr-6">
                            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                              {notif.message}
                            </p>
                            <span className="text-[9px] font-bold text-gray-400">{notif.timestamp}</span>
                          </div>
                          <button
                            onClick={() => handleClearNotif(notif.id)}
                            className="absolute right-2 top-2 p-1 text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
                            aria-label="Dismiss alert"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 2. Eligibility History */}
            <motion.div
              variants={cardVariants}
              className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
            >
              <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2563EB]" />
                Eligibility History
              </h3>

              <div className="space-y-3">
                {initialHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50/50 dark:bg-slate-800/30 rounded-xl border border-gray-50 dark:border-slate-800/40 space-y-1 text-xs"
                  >
                    <div className="flex justify-between items-center text-gray-400 font-semibold text-[10px]">
                      <span>{item.timestamp}</span>
                      <span className="text-[#2563EB]">{item.matchesCount} Matches</span>
                    </div>
                    <p className="text-[#0F172A] dark:text-gray-300 font-bold leading-normal truncate">
                      {item.profileSummary}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Recent Searches */}
            <motion.div
              variants={cardVariants}
              className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
            >
              <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-[#2563EB]" />
                Recent Searches
              </h3>

              <AnimatePresence mode="popLayout">
                {searches.length === 0 ? (
                  <EmptyState
                    title="No recent searches"
                    description="Your search queries will be cached here."
                  />
                ) : (
                  <div className="space-y-2">
                    {searches.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center justify-between p-2.5 bg-gray-50/30 dark:bg-slate-800/20 border border-gray-100/50 dark:border-slate-800/20 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 group"
                      >
                        <span className="truncate flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                          {item.query}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[9px] text-gray-400 font-normal">{item.timestamp}</span>
                          <button
                            onClick={() => handleRemoveSearch(item.id)}
                            className="p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
                            aria-label={`Remove search for ${item.query}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

        </div>

      </motion.div>
    </LazyMotion>
  );
}
