"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, LazyMotion, domAnimation, AnimatePresence, type Variants } from "framer-motion";
import {
  Search,
  Share2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Inbox,
  ArrowRight,
  CheckCircle,
  Scale,
  X,
} from "lucide-react";
import { SavedSchemeItem } from "@/types/saved";
import EmptyState from "./ui/empty-state";
import { SkeletonCard } from "./ui/skeleton";

/* ─────────────────────────────────────────────
   Mock Bookmarks Database
───────────────────────────────────────────── */

const initialSaved: SavedSchemeItem[] = [
  {
    id: "rec-kisan",
    name: "PM-Kisan Samman Nidhi",
    category: "Agriculture",
    authority: "Ministry of Agriculture & Farmers Welfare",
    eligibilityScore: 92,
    dateSaved: "2026-07-11",
    summary: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
    requirements: ["Small or marginal landholding", "Aadhaar-seeded bank account", "Land registration documents"],
  },
  {
    id: "rec-pmawy",
    name: "PM Awas Yojana (Urban)",
    category: "Housing",
    authority: "Ministry of Housing and Urban Affairs",
    eligibilityScore: 88,
    dateSaved: "2026-07-09",
    summary: "Interest subsidy and financial assistance to build or purchase houses for EWS, LIG, and MIG categories.",
    requirements: ["Household annual income below ₹18L", "No pucca house registered in India", "Aadhaar card"],
  },
  {
    id: "rec-postmatric",
    name: "Post-Matric Scholarship Scheme",
    category: "Education",
    authority: "Ministry of Social Justice & Empowerment",
    eligibilityScore: 95,
    dateSaved: "2026-07-12",
    summary: "Financial support for post-matriculation courses to students belonging to scheduled categories.",
    requirements: ["Student must belong to SC/ST/OBC categories", "Annual family income under ₹2.5L", "Passing marks certificate"],
  },
  {
    id: "rec-didi",
    name: "Lakhpati Didi Scheme",
    category: "Business",
    authority: "Ministry of Rural Development",
    eligibilityScore: 78,
    dateSaved: "2026-07-08",
    summary: "Skills training, financial literacy, and credit assistance to help women SHG members earn at least ₹1L per year.",
    requirements: ["Must be a female member of a Self-Help Group (SHG)", "Rural resident", "Active participation for 6+ months"],
  },
  {
    id: "rec-pmjay",
    name: "Ayushman Bharat PM-JAY",
    category: "Health",
    authority: "National Health Authority",
    eligibilityScore: 82,
    dateSaved: "2026-07-05",
    summary: "Health insurance cover of up to ₹5 Lakh per family per year for secondary and tertiary hospitalization care.",
    requirements: ["Must be listed in SECC database", "No adult member earning above ₹10k/month", "BPL card holders"],
  },
];

/* ─────────────────────────────────────────────
   Framer Motion Variants (module scope)
───────────────────────────────────────────── */

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.25 } },
};

const compareBannerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 25 },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 25 },
  },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function SavedSchemes() {
  const [savedItems, setSavedItems] = useState<SavedSchemeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-newest");
  const [isLoading, setIsLoading] = useState(true);

  // Accordion details toggle states
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Comparison checkboxes state
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Success indicator toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Simulate loader mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setSavedItems(initialSaved);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Listen for Escape key to close the comparative modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowCompareModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRemoveBookmark = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    setComparedIds((prev) => prev.filter((cId) => cId !== id));
    setToastMessage("Scheme removed from saved list");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleShare = (id: string) => {
    const shareUrl = `${window.location.origin}/eligibility?scheme=${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setToastMessage("Scheme link copied to clipboard!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    });
  };

  const handleCompareCheck = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        setToastMessage("You can compare up to 3 schemes at a time");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
        return prev;
      }
      return [...prev, id];
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border-green-150";
    if (score >= 80) return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-150";
    return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-150";
  };

  // Sorting & Filtering Logic
  const filtered = savedItems.filter((item) => {
    const matchesFilter = selectedFilter === "all" || item.category === selectedFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "date-newest":
        return new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime();
      case "date-oldest":
        return new Date(a.dateSaved).getTime() - new Date(b.dateSaved).getTime();
      case "score-highest":
        return b.eligibilityScore - a.eligibilityScore;
      case "score-lowest":
        return a.eligibilityScore - b.eligibilityScore;
      default:
        return 0;
    }
  });

  const categories = ["all", "Education", "Agriculture", "Housing", "Business", "Health"];

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full space-y-6 text-left relative">
        
        {/* Floating toast notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-20 right-4 z-50 max-w-sm w-full bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-xl shadow-xl p-4 flex gap-3 items-start"
              role="alert"
            >
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-gray-800 dark:text-white">
                {toastMessage}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Side-by-side Comparative Table Modal */}
        <AnimatePresence>
          {showCompareModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-md p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="brand-card p-6 max-w-4xl w-full bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl shadow-2xl relative space-y-5 overflow-y-auto max-h-[90vh]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="compare-modal-title"
              >
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-3">
                  <h3 id="compare-modal-title" className="text-base font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#2563EB]" />
                    Scheme Comparison Grid
                  </h3>
                  <button
                    onClick={() => setShowCompareModal(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
                    aria-label="Close Comparison modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Comparative Table Layout */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-150 dark:border-slate-800">
                        <th className="py-3 px-4 font-bold text-gray-500 uppercase tracking-widest w-1/4">Criteria</th>
                        {comparedIds.map((cId) => {
                          const item = savedItems.find((s) => s.id === cId);
                          return (
                            <th key={cId} className="py-3 px-4 font-extrabold text-[#0F172A] dark:text-white w-1/3">
                              {item?.name}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60">
                      <tr>
                        <td className="py-3 px-4 font-bold text-gray-500">Category</td>
                        {comparedIds.map((cId) => (
                          <td key={cId} className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                            {savedItems.find((s) => s.id === cId)?.category}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-gray-500">Ministry / Authority</td>
                        {comparedIds.map((cId) => (
                          <td key={cId} className="py-3 px-4 text-gray-600 dark:text-gray-400">
                            {savedItems.find((s) => s.id === cId)?.authority}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-gray-500">Eligibility Match Score</td>
                        {comparedIds.map((cId) => {
                          const score = savedItems.find((s) => s.id === cId)?.eligibilityScore || 0;
                          return (
                            <td key={cId} className="py-3 px-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getScoreColor(score)}`}>
                                {score}% Eligible
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-gray-500">Direct Benefits Summary</td>
                        {comparedIds.map((cId) => (
                          <td key={cId} className="py-3 px-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                            {savedItems.find((s) => s.id === cId)?.summary}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-gray-500">Key Document Requirements</td>
                        {comparedIds.map((cId) => (
                          <td key={cId} className="py-3 px-4">
                            <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-400">
                              {savedItems.find((s) => s.id === cId)?.requirements.map((req, rIdx) => (
                                <li key={rIdx}>{req}</li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setShowCompareModal(false)}
                    className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    aria-label="Close comparative modal"
                  >
                    Done Comparison
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── TOOLBAR: Search, Filter & Sort ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center justify-between">
          {/* Search box */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search saved schemes by name or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative lg:col-span-2 flex justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-60 px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              aria-label="Sort saved schemes list"
            >
              <option value="date-newest">Saved Date: Newest First</option>
              <option value="date-oldest">Saved Date: Oldest First</option>
              <option value="score-highest">Match Score: Highest First</option>
              <option value="score-lowest">Match Score: Lowest First</option>
            </select>
          </div>
        </div>

        {/* Categories filters scroll list */}
        <div className="overflow-x-auto pb-1 flex gap-2 scrollbar-none" role="tablist" aria-label="Filter saved schemes by category">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat;
            const count = cat === "all"
              ? savedItems.length
              : savedItems.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide shrink-0 transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  isActive
                    ? "bg-[#2563EB] text-white font-bold"
                    : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                }`}
              >
                <span>{cat === "all" ? "All Categories" : cat}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-slate-850 text-gray-500"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── SAVED GRID LIST ── */}
        <div className="w-full">
          {isLoading ? (
            /* Shimmer loading skeletons using reusable components */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : sorted.length === 0 ? (
            /* Empty state using reusable components */
            <EmptyState
              icon={Inbox}
              title="No saved schemes found"
              description={
                searchQuery || selectedFilter !== "all"
                  ? "Try adjusting your search query keywords or filter tabs to discover bookmarks."
                  : "You haven't saved any government schemes yet. Explore matches using the Eligibility Checker!"
              }
              action={
                searchQuery || selectedFilter !== "all" ? (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFilter("all");
                    }}
                    className="px-4 py-2 border border-blue-200 text-[#2563EB] hover:bg-blue-50/30 text-xs font-semibold rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    Reset filters
                  </button>
                ) : (
                  <Link
                    href="/eligibility"
                    className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    Check Eligibility Matches
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )
              }
            />
          ) : (
            /* Bookmarks List Grid */
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {sorted.map((item) => {
                  const isExpanded = expandedId === item.id;
                  const isCompared = comparedIds.includes(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      layout
                      className="brand-card p-5 sm:p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-4 hover:shadow-md transition-all self-start"
                    >
                      {/* Card Header */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2.5">
                          <span className="px-2 py-0.5 rounded bg-blue-50/50 dark:bg-slate-800 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                            {item.category}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${getScoreColor(item.eligibilityScore)}`}>
                            {item.eligibilityScore}% Match
                          </span>
                        </div>
                        
                        <h4 className="text-sm font-extrabold text-[#0F172A] dark:text-white pt-1">
                          {item.name}
                        </h4>
                        
                        <p className="text-[10px] font-semibold text-gray-400">
                          Saved on {item.dateSaved}
                        </p>
                      </div>

                      {/* Summary Block */}
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Expandable requirements detail drawer */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-3 border-t border-gray-100 dark:border-slate-800/80 space-y-2 text-xs"
                        >
                          <div className="space-y-0.5">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Authority</span>
                            <span className="block text-gray-700 dark:text-gray-300 font-semibold">{item.authority}</span>
                          </div>
                          
                          <div className="space-y-1">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Document Requirements</span>
                            <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-400 font-medium">
                              {item.requirements.map((req, rIdx) => (
                                <li key={rIdx}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}

                      {/* Card Footer Control Panel */}
                      <div className="pt-3 border-t border-gray-50 dark:border-slate-800/40 flex items-center justify-between gap-4">
                        
                        {/* Compare checkbox trigger */}
                        <div className="flex items-center">
                          <input
                            id={`compare-${item.id}`}
                            type="checkbox"
                            checked={isCompared}
                            onChange={() => handleCompareCheck(item.id)}
                            className="w-4.5 h-4.5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                          />
                          <label htmlFor={`compare-${item.id}`} className="ml-1.5 text-[10px] font-bold text-gray-500 cursor-pointer select-none">
                            Compare
                          </label>
                        </div>

                        {/* Actions group */}
                        <div className="flex items-center gap-1.5 ml-auto">
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="p-2 border border-gray-200 dark:border-slate-800 text-gray-400 hover:text-[#2563EB] rounded-lg transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
                            title={isExpanded ? "Hide details" : "View details"}
                            aria-label={isExpanded ? "Hide details panel" : "View details and requirements"}
                          >
                            <span className="text-[9px] font-bold pr-0.5">Details</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          
                          <button
                            onClick={() => handleShare(item.id)}
                            className="p-2 border border-gray-200 dark:border-slate-800 text-gray-400 hover:text-blue-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            title="Share scheme link"
                            aria-label="Share scheme link"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleRemoveBookmark(item.id)}
                            className="p-2 border border-gray-200 dark:border-slate-800 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50/20 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                            title="Remove bookmark"
                            aria-label="Remove scheme from saved list"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* ── STICKY COMPARE BANNER (Checked items display) ── */}
        <AnimatePresence>
          {comparedIds.length >= 1 && (
            <motion.div
              variants={compareBannerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-md w-full bg-slate-900 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between border border-slate-800"
            >
              <div className="flex items-center gap-2 pr-3">
                <Scale className="w-5 h-5 text-blue-400 shrink-0 animate-bounce" />
                <div className="leading-tight">
                  <span className="block text-xs font-bold">Compare Schemes</span>
                  <span className="block text-[10px] text-gray-400">
                    Selected: {comparedIds.length} of 3
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setComparedIds([])}
                  className="px-3 py-2 border border-slate-700 hover:bg-slate-800 rounded-xl text-[10px] font-bold text-gray-300 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-700"
                  aria-label="Clear all selected schemes for comparison"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowCompareModal(true)}
                  disabled={comparedIds.length < 2}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                    comparedIds.length < 2
                      ? "bg-blue-800 text-blue-400 cursor-not-allowed"
                      : "bg-[#2563EB] hover:bg-blue-600 text-white shadow-md shadow-blue-500/10 cursor-pointer"
                  }`}
                  aria-label="Compare selected schemes side-by-side"
                >
                  Compare Now
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </LazyMotion>
  );
}
