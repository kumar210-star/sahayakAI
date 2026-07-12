"use client";

import { useState, useMemo } from "react";
import { motion, LazyMotion, domAnimation, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  GitCompare,
  CheckCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { SchemeRecommendation } from "@/types/recommendation";
import { UserProfile } from "@/types/eligibility";

/* ─────────────────────────────────────────────
   Mock Recommendation Database
───────────────────────────────────────────── */

const allRecommendations: SchemeRecommendation[] = [
  {
    id: "rec-pmay",
    name: "PM Awas Yojana (Urban)",
    category: "Housing",
    authority: "Ministry of Housing and Urban Affairs",
    description: "Provides financial interest subsidies on home loans for purchasing, constructing, or renovating houses in urban areas.",
    score: 98,
    benefit: "Subsidy up to ₹2.67 Lakhs on loan interest",
    whyEligible: [
      "Household income is within EWS/LIG slab limits",
      "Do not own a pucca house in any part of India",
      "Residing in registered urban municipalities",
    ],
    documents: ["Aadhaar Card", "Income Certificate", "Affidavit of landownership", "Bank Passbook"],
    applyUrl: "https://pmaymis.gov.in/",
  },
  {
    id: "rec-pmkisan",
    name: "PM-Kisan Samman Nidhi",
    category: "Agriculture",
    authority: "Ministry of Agriculture & Farmers Welfare",
    description: "Direct income support of ₹6,000 per year distributed in three equal installments to all eligible landholding farmer families.",
    score: 95,
    benefit: "Direct Benefit Transfer of ₹6,000 / Year",
    whyEligible: [
      "Occupation registered as farming / cultivation",
      "Valid landholding titles registered in state databases",
      "Aadhaar-seeded bank account active",
    ],
    documents: ["Aadhaar Card", "Land ownership proof (Khatauni)", "Bank Account details", "Mobile linked to Aadhaar"],
    applyUrl: "https://pmkisan.gov.in/",
  },
  {
    id: "rec-nsp",
    name: "Post-Matric Scholarship Scheme",
    category: "Education",
    authority: "Ministry of Social Justice & Empowerment",
    description: "Financial assistance for Indian students from SC/ST/OBC categories to pursue post-matric or post-secondary education.",
    score: 92,
    benefit: "Full tuition reimbursement + ₹1,200 monthly allowance",
    whyEligible: [
      "Currently pursuing graduate, post-graduate, or diploma courses",
      "Annual family income is below ₹2.5 Lakhs",
      "Belong to reserved community categories (OBC/SC/ST)",
    ],
    documents: ["Previous Class Marksheet", "Income Certificate", "Community Certificate", "Fees Receipt"],
    applyUrl: "https://scholarships.gov.in/",
  },
  {
    id: "rec-mudra",
    name: "Pradhan Mantri MUDRA Yojana",
    category: "Business",
    authority: "Micro Units Development & Refinance Agency",
    description: "Collateral-free business loans up to ₹10 Lakhs for setting up or expanding small, micro, or non-farm enterprises.",
    score: 88,
    benefit: "Collateral-free business loans up to ₹10 Lakhs",
    whyEligible: [
      "Registered occupation falls under Business Owner / Self-Employed",
      "Operating a micro, small, or medium enterprise",
      "Proprietorship or partnership validation active",
    ],
    documents: ["Business Registration Certificate", "PAN Card", "Aadhaar Card", "Projected Balance Sheet"],
    applyUrl: "https://www.mudra.org.in/",
  },
];

/* ─────────────────────────────────────────────
   Framer Motion animations
───────────────────────────────────────────── */

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardEntryVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────────
   Props types
───────────────────────────────────────────── */

interface RecommendationCardsProps {
  userProfile?: Partial<UserProfile>;
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function RecommendationCards({ userProfile }: RecommendationCardsProps) {
  const [filter, setFilter] = useState<string>("All");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [comparedIds, setComparedIds] = useState<Set<string>>(new Set());
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Filter categories dynamically based on recommendations
  const categories = useMemo(() => {
    const list = new Set(allRecommendations.map((r) => r.category));
    return ["All", ...Array.from(list)];
  }, []);

  // Filter matches based on user answers if provided, or categories
  const filteredRecommendations = useMemo(() => {
    let list = allRecommendations;

    // Filter by Category first
    if (filter !== "All") {
      list = list.filter((r) => r.category === filter);
    }

    // Dynamic filtering based on profile answers if supplied
    if (userProfile) {
      list = list.map((scheme) => {
        let scoreOffset = 0;
        
        // Income checks
        if (scheme.id === "rec-pmay" && userProfile.income) {
          if (["Below ₹1L", "₹1–3L", "₹3–6L"].includes(userProfile.income)) scoreOffset += 5;
          else scoreOffset -= 15;
        }
        if (scheme.id === "rec-pmkisan" && userProfile.occupation !== "Farmer") {
          scoreOffset -= 40;
        }
        if (scheme.id === "rec-mudra" && !["Self-Employed", "Business Owner"].includes(userProfile.occupation || "")) {
          scoreOffset -= 35;
        }
        if (scheme.id === "rec-nsp" && !["Student"].includes(userProfile.occupation || "")) {
          scoreOffset -= 30;
        }

        const calculatedScore = Math.max(0, Math.min(100, scheme.score + scoreOffset));
        return { ...scheme, score: calculatedScore };
      });

      // Filter out schemes that have low relevance (< 60% match)
      list = list.filter((scheme) => scheme.score >= 60);
      // Sort by eligibility score descending
      list.sort((a, b) => b.score - a.score);
    }

    return list;
  }, [filter, userProfile]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCompare = (id: string) => {
    setComparedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-6 w-full">
        
        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start border-b border-gray-100 dark:border-slate-800 pb-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2 select-none">
            Filter:
          </span>
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isActive
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/10 scale-102"
                    : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic header summary */}
        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          Showing {filteredRecommendations.length} personalized recommendation{filteredRecommendations.length !== 1 ? "s" : ""}
        </div>

        {/* Main grid wrapper */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredRecommendations.map((scheme) => {
              const isSaved = savedIds.has(scheme.id);
              const isCompared = comparedIds.has(scheme.id);
              const isExpanded = expandedCardId === scheme.id;

              return (
                <motion.div
                  key={scheme.id}
                  layoutId={scheme.id}
                  variants={cardEntryVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="brand-card relative flex flex-col justify-between overflow-hidden border border-gray-200/60 dark:border-slate-800 bg-white/95 dark:bg-slate-900 shadow-md p-5 rounded-2xl group"
                >
                  {/* Subtle top eligibility accent stripe */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 ${
                      scheme.score >= 90
                        ? "bg-gradient-to-r from-green-400 to-green-500"
                        : "bg-gradient-to-r from-blue-400 to-blue-500"
                    }`}
                  />

                  {/* Header metadata */}
                  <div>
                    <div className="flex items-center justify-between mb-3.5 pt-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {scheme.authority}
                      </span>
                      
                      {/* Eligibility score bubble */}
                      <span
                        role="status"
                        aria-label={`Eligibility match score is ${scheme.score} percent`}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                          scheme.score >= 90
                            ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200/40"
                            : "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200/40"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {scheme.score}% Match
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white leading-snug">
                      {scheme.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed line-clamp-2">
                      {scheme.description}
                    </p>

                    {/* Core Financial Benefit Highlight */}
                    <div className="mt-4 p-3 bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100/30 dark:border-slate-700/30 rounded-xl flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-[#2563EB] flex items-center justify-center shrink-0" aria-hidden="true">
                        <Info className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-[#2563EB] dark:text-blue-400">
                        {scheme.benefit}
                      </span>
                    </div>

                    {/* Collapsible checklist toggler */}
                    <button
                      onClick={() => toggleExpand(scheme.id)}
                      className="w-full flex items-center justify-between text-xs font-bold text-gray-500 hover:text-[#2563EB] transition-colors mt-4 py-1.5 border-t border-b border-gray-100 dark:border-slate-800 focus:outline-none"
                    >
                      <span>Requirement Details</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {/* Expanded details section */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden space-y-3.5 pt-3"
                        >
                          {/* Why Eligible checklist */}
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                              Why you qualify
                            </span>
                            <ul className="space-y-1">
                              {scheme.whyEligible.map((item, idx) => (
                                <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-1.5 leading-normal">
                                  <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Required Documents Checklist */}
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                              Documents Checklist
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {scheme.documents.map((doc, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 rounded-md bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 px-2 py-0.5 text-[9px] font-bold text-gray-500 dark:text-gray-300"
                                >
                                  <FileText className="w-2.5 h-2.5" />
                                  {doc}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions Section */}
                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2.5">
                    {/* Primary Apply Button */}
                    <a
                      href={scheme.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-xs font-bold text-white py-3 shadow-md shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all select-none"
                    >
                      Apply Now
                      <ArrowUpRight className="w-4.5 h-4.5" />
                    </a>

                    {/* Bookmark Save Button */}
                    <button
                      onClick={() => toggleSave(scheme.id)}
                      className={`p-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isSaved
                          ? "bg-blue-50 dark:bg-blue-950/20 text-[#2563EB] border-blue-200"
                          : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-400 hover:text-gray-500"
                      }`}
                      aria-label={isSaved ? "Saved scheme" : "Save scheme"}
                    >
                      <motion.div
                        animate={isSaved ? { scale: [1, 1.25, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {isSaved ? <BookmarkCheck className="w-4.5 h-4.5" /> : <Bookmark className="w-4.5 h-4.5" />}
                      </motion.div>
                    </button>

                    {/* Compare Button */}
                    <button
                      onClick={() => toggleCompare(scheme.id)}
                      className={`p-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isCompared
                          ? "bg-blue-50 dark:bg-blue-950/20 text-[#2563EB] border-blue-200"
                          : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-400 hover:text-gray-500"
                      }`}
                      aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
                    >
                      <GitCompare className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </LazyMotion>
  );
}
