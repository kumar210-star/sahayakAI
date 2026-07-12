"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, LazyMotion, domAnimation, AnimatePresence, type Variants } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Lock,
  ArrowRight,
  Printer,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { ApplicationTrackerItem } from "@/types/tracker";

/* ─────────────────────────────────────────────
   Mock Applications Database
───────────────────────────────────────────── */

const initialTrackers: ApplicationTrackerItem[] = [
  {
    id: "track-1",
    schemeName: "PM Awas Yojana (Urban)",
    applicationId: "PMAY-U-2026-98421",
    category: "Housing",
    dateApplied: "July 01, 2026",
    overallProgress: 60,
    stages: [
      {
        name: "Profile Completed",
        status: "completed",
        date: "July 01, 2026",
        notes: "Profile verified with UIDAI registry database. Aadhaar e-KYC verified successfully.",
      },
      {
        name: "Documents Uploaded",
        status: "completed",
        date: "July 03, 2026",
        notes: "Income certificate, land documents, and self-declaration affidavit received and digitized.",
      },
      {
        name: "Application Submitted",
        status: "completed",
        date: "July 05, 2026",
        notes: "Form signed via Aadhaar e-Sign. Application ID created and dispatched to Maharashtra state housing committee.",
      },
      {
        name: "Under Review",
        status: "in-progress",
        notes: "Maharashtra State Housing Inspector assigned. Local field verification of target site is in progress.",
      },
      {
        name: "Approved",
        status: "pending",
        notes: "Awaiting final sanction letter print from central fund allocation dashboard.",
      },
    ],
  },
  {
    id: "track-2",
    schemeName: "PM-Kisan Samman Nidhi",
    applicationId: "PMK-2026-00482",
    category: "Agriculture",
    dateApplied: "June 15, 2026",
    overallProgress: 100,
    stages: [
      {
        name: "Profile Completed",
        status: "completed",
        date: "June 15, 2026",
        notes: "Verified farmer registration completed on Maharashtra land records database.",
      },
      {
        name: "Documents Uploaded",
        status: "completed",
        date: "June 18, 2026",
        notes: "Bank accounts details, land maps, and tax declarations matched successfully.",
      },
      {
        name: "Application Submitted",
        status: "completed",
        date: "June 20, 2026",
        notes: "Signed submission routed through Pune district nodal center.",
      },
      {
        name: "Under Review",
        status: "completed",
        date: "June 25, 2026",
        notes: "District inspector review passed. No discrepancy found on landholdings verification.",
      },
      {
        name: "Approved",
        status: "completed",
        date: "June 30, 2026",
        notes: "Direct Benefit Transfer (DBT) activated. First installment of ₹2,000 credit cleared.",
      },
    ],
  },
  {
    id: "track-3",
    schemeName: "Post-Matric Scholarship Scheme",
    applicationId: "PMSC-2026-88402",
    category: "Education",
    dateApplied: "July 10, 2026",
    overallProgress: 20,
    stages: [
      {
        name: "Profile Completed",
        status: "completed",
        date: "July 10, 2026",
        notes: "Student enrollment verified with National Scholarship Portal (NSP).",
      },
      {
        name: "Documents Uploaded",
        status: "in-progress",
        notes: "Action Required: SC/ST/OBC certificate received. High-school grade sheets are awaiting review.",
      },
      {
        name: "Application Submitted",
        status: "pending",
        notes: "Will activate once document verification reports are cleared.",
      },
      {
        name: "Under Review",
        status: "pending",
        notes: "To be completed by college administration officer.",
      },
      {
        name: "Approved",
        status: "pending",
        notes: "Scholarship allocation release details.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Framer Motion Animations
───────────────────────────────────────────── */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const timelineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function ApplicationTracker() {
  const [trackers, setTrackers] = useState<ApplicationTrackerItem[]>([]);
  const [selectedId, setSelectedId] = useState("track-1");
  const [isLoading, setIsLoading] = useState(true);
  const [showPrintToast, setShowPrintToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrackers(initialTrackers);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const activeApp = trackers.find((t) => t.id === selectedId) || trackers[0];

  const handlePrintReceipt = () => {
    setShowPrintToast(true);
    setTimeout(() => setShowPrintToast(false), 2500);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full space-y-6 text-left relative">
        
        {/* Floating Print Success Toast */}
        <AnimatePresence>
          {showPrintToast && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-20 right-4 z-50 max-w-sm w-full bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-xl shadow-xl p-4 flex gap-3 items-start"
              role="alert"
            >
              <FileCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="block text-xs font-bold text-gray-800 dark:text-white">
                  Receipt Dispatched
                </span>
                <span className="block text-[10px] text-gray-400">
                  Simulated printing. Receipt PDF saved to downloads folder.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          /* Shimmer Header Loader */
          <div className="brand-card p-6 border border-gray-150 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse space-y-4">
            <div className="h-6 bg-gray-100 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-gray-100 dark:bg-slate-800 rounded w-1/2" />
            <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded w-full" />
          </div>
        ) : (
          /* Overview Panel & Switcher Card */
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="brand-card p-5 sm:p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                  Select Active Application
                </span>
                <div className="relative inline-block w-full sm:w-72">
                  <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white font-extrabold focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    {trackers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.schemeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs font-semibold text-gray-500">
                <span>
                  App ID: <strong className="text-gray-700 dark:text-gray-300">{activeApp?.applicationId}</strong>
                </span>
                <span>
                  Applied: <strong className="text-gray-700 dark:text-gray-300">{activeApp?.dateApplied}</strong>
                </span>
                <span>
                  Category: <strong className="text-gray-700 dark:text-gray-300">{activeApp?.category}</strong>
                </span>
              </div>
            </div>

            {/* Overall Progress ring/bar block */}
            <div className="md:w-64 space-y-2 shrink-0">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-500">Overall Progress</span>
                <span className="text-[#2563EB]">{activeApp?.overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeApp?.overallProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ── VERTICAL TIMELINE CONTAINER ── */}
        <div className="brand-card p-6 sm:p-8 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 relative overflow-hidden">
          
          {isLoading ? (
            /* Shimmer Timeline List Loader */
            <div className="space-y-8 animate-pulse pt-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-4 bg-gray-100 dark:bg-slate-800 rounded w-1/4" />
                    <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Timeline elements */
            <motion.div
              key={selectedId}
              variants={timelineContainerVariants}
              initial="hidden"
              animate="visible"
              className="relative space-y-8 pl-4 sm:pl-8 py-2"
            >
              {/* Connective Line (absolute placement) */}
              <div className="absolute top-0 bottom-0 left-[26px] sm:left-[42px] w-0.5 border-l-2 border-dashed border-gray-150 dark:border-slate-800 z-0 pointer-events-none" />

              {activeApp?.stages.map((stage) => {
                const isCompleted = stage.status === "completed";
                const isInProgress = stage.status === "in-progress";
                const isPending = stage.status === "pending";

                return (
                  <motion.div
                    key={stage.name}
                    variants={timelineItemVariants}
                    className="flex gap-4 sm:gap-6 items-start relative z-10"
                  >
                    {/* Node Visual circle */}
                    <div className="shrink-0 pt-0.5">
                      {isCompleted && (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-50 dark:bg-green-950/40 border-2 border-green-500 text-green-500 flex items-center justify-center shadow-md">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        </div>
                      )}
                      {isInProgress && (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-500 text-blue-500 flex items-center justify-center relative shadow-md">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 animate-pulse" />
                          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                        </div>
                      )}
                      {isPending && (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-250 dark:border-slate-800 text-gray-400 flex items-center justify-center">
                          <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        </div>
                      )}
                    </div>

                    {/* Stage descriptions right panel */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] dark:text-white">
                            {stage.name}
                          </h4>
                          {isCompleted && (
                            <span className="px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-950/30 text-[8px] font-bold text-green-600 dark:text-green-400 border border-green-100/30">
                              Completed
                            </span>
                          )}
                          {isInProgress && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-[8px] font-bold text-blue-600 dark:text-blue-400 border border-blue-100/30 animate-pulse">
                              In Progress
                            </span>
                          )}
                          {isPending && (
                            <span className="px-2 py-0.5 rounded-full bg-gray-50 dark:bg-slate-900 text-[8px] font-bold text-gray-400 border border-gray-200 dark:border-slate-800">
                              Locked
                            </span>
                          )}
                        </div>
                        {stage.date && (
                          <span className="text-[10px] font-semibold text-gray-400">
                            {stage.date}
                          </span>
                        )}
                      </div>

                      {/* Notes Box */}
                      <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                        isInProgress
                          ? "bg-blue-50/10 dark:bg-blue-950/5 border-blue-100 dark:border-blue-950 text-gray-700 dark:text-gray-300"
                          : isCompleted
                          ? "bg-gray-50/30 dark:bg-slate-950/30 border-gray-100 dark:border-slate-800 text-gray-600 dark:text-gray-400"
                          : "border-gray-100 dark:border-slate-800/60 text-gray-400/80"
                      }`}>
                        {stage.notes}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

        </div>

        {/* ── FOOTER ACTIONS TOOLBAR ── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
          <Link
            href="/dashboard"
            className="text-xs font-bold text-[#2563EB] hover:text-blue-700 flex items-center gap-1 group justify-center sm:justify-start"
          >
            Return to Dashboard
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="flex gap-2 justify-center">
            <button
              onClick={handlePrintReceipt}
              disabled={isLoading}
              className="px-4 py-2.5 border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Receipt
            </button>
            <button
              onClick={() => {}}
              disabled={isLoading}
              className="px-4 py-2.5 border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              Contact Officer
            </button>
          </div>
        </div>

      </div>
    </LazyMotion>
  );
}
