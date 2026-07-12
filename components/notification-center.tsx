"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, LazyMotion, domAnimation, AnimatePresence, type Variants } from "framer-motion";
import {
  Sparkles,
  Award,
  TrendingUp,
  Calendar,
  FileText,
  Megaphone,
  CheckCheck,
  Search,
  Trash2,
  Inbox,
  ArrowRight,
} from "lucide-react";
import { NotificationItem } from "@/types/notifications";

/* ─────────────────────────────────────────────
   Initial mock notifications list
───────────────────────────────────────────── */

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New AI Scheme Match Recommendation",
    message: "Based on your updated profile (Farmer, Maharashtra), you are 92% match eligible for PM-Kisan Samman Nidhi.",
    category: "recommendation",
    timestamp: "10 mins ago",
    isRead: false,
    actionUrl: "/dashboard",
  },
  {
    id: "notif-2",
    title: "Application Status Advanced",
    message: "Your application for PM Awas Yojana (Urban) has passed 'Documents Verified' and is now under Officer Review.",
    category: "status",
    timestamp: "2 hours ago",
    isRead: false,
    actionUrl: "/dashboard",
  },
  {
    id: "notif-3",
    title: "Document Upload Pending",
    message: "Action Required: Please upload your Income Certificate and Land Ownership records to complete PM-Kisan eligibility checks.",
    category: "document",
    timestamp: "1 day ago",
    isRead: false,
    actionUrl: "/profile",
  },
  {
    id: "notif-4",
    title: "New Scheme Launched: Lakhpati Didi",
    message: "Central Government has launched a new support scheme for self-employed women with up to ₹1L financial assistance.",
    category: "scheme",
    timestamp: "2 days ago",
    isRead: true,
    actionUrl: "/eligibility",
  },
  {
    id: "notif-5",
    title: "Upcoming Deadline Alert",
    message: "The application period for Post-Matric Scholarship Scheme closes in 5 days (July 17, 2026). Submit soon!",
    category: "deadline",
    timestamp: "3 days ago",
    isRead: true,
    actionUrl: "/dashboard",
  },
  {
    id: "notif-6",
    title: "Scheduled Maintenance Announcement",
    message: "SahayakAI portal will undergo a brief 10-minute database speed optimization on Sunday at 02:00 AM IST.",
    category: "announcement",
    timestamp: "5 days ago",
    isRead: true,
  },
];

/* ─────────────────────────────────────────────
   Framer Motion Configurations
───────────────────────────────────────────── */

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -25,
    transition: { duration: 0.25 },
  },
};

const countVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loader mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(initialNotifications);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getCategoryConfig = (cat: NotificationItem["category"]) => {
    switch (cat) {
      case "recommendation":
        return { icon: Sparkles, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40" };
      case "scheme":
        return { icon: Award, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40" };
      case "status":
        return { icon: TrendingUp, color: "text-green-500 bg-green-50 dark:bg-green-950/40" };
      case "deadline":
        return { icon: Calendar, color: "text-red-500 bg-red-50 dark:bg-red-950/40" };
      case "document":
        return { icon: FileText, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40" };
      case "announcement":
      default:
        return { icon: Megaphone, color: "text-gray-500 bg-gray-50 dark:bg-gray-850" };
    }
  };

  // Filter & Search Logic
  const filtered = notifications.filter((n) => {
    const matchesFilter = selectedFilter === "all" || n.category === selectedFilter;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const categories = [
    { id: "all", label: "All Updates" },
    { id: "recommendation", label: "AI Matches" },
    { id: "scheme", label: "New Schemes" },
    { id: "status", label: "App Status" },
    { id: "deadline", label: "Deadlines" },
    { id: "document", label: "Documents" },
    { id: "announcement", label: "General" },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full space-y-6 text-left">
        
        {/* ── SEARCH & BATCH ACTIONS ROW ── */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notifications by title or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
            />
          </div>

          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0 || isLoading}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              unreadCount === 0
                ? "border border-gray-200 text-gray-300 cursor-not-allowed"
                : "border border-blue-200 text-[#2563EB] hover:bg-blue-50/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            }`}
          >
            <CheckCheck className="w-4.5 h-4.5" />
            Mark All as Read
          </button>
        </div>

        {/* ── CATEGORIES SLIDER ROWS ── */}
        <div className="overflow-x-auto pb-1 flex gap-2 scrollbar-none" role="tablist" aria-label="Filter notifications by category">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            const count = cat.id === "all" 
              ? notifications.length 
              : notifications.filter(n => n.category === cat.id).length;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#2563EB] text-white font-bold"
                    : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                }`}
              >
                <span>{cat.label}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-500"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── NOTIFICATIONS MAIN FEED PANEL ── */}
        <div className="space-y-4" role="log" aria-live="polite">
          {isLoading ? (
            /* Loading Shimmer Skeletons */
            <div className="space-y-3">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="brand-card p-5 border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex gap-4 animate-pulse"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-100 dark:bg-slate-800 rounded w-1/3" />
                    <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded w-5/6" />
                    <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* Empty State Panel */
            <div className="brand-card py-16 px-6 border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-slate-850 text-blue-500 flex items-center justify-center" aria-hidden="true">
                <Inbox className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white">
                  No notifications found
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
                  {searchQuery || selectedFilter !== "all"
                    ? "Try adjusting your search terms or selecting a different category filter above."
                    : "You are all caught up! Check back later for matching schemes and updates."}
                </p>
              </div>
              {(searchQuery || selectedFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("all");
                  }}
                  className="px-4 py-2 border border-blue-200 text-[#2563EB] hover:bg-blue-50/30 text-xs font-semibold rounded-xl transition-all"
                >
                  Reset filters
                </button>
              )}
            </div>
          ) : (
            /* Main List */
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => {
                  const cfg = getCategoryConfig(item.category);
                  const CatIcon = cfg.icon;
                  return (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      layout
                      className={`brand-card p-4 sm:p-5 border bg-white dark:bg-slate-900 transition-all flex items-start gap-4 ${
                        item.isRead
                          ? "border-gray-100 dark:border-slate-800/80 opacity-75"
                          : "border-blue-100 dark:border-blue-950 bg-blue-50/10 dark:bg-blue-950/5 shadow-md shadow-blue-500/2"
                      }`}
                    >
                      {/* Category Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${cfg.color}`} aria-hidden="true">
                        <CatIcon className="w-5 h-5" />
                      </div>

                      {/* Content Panel */}
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
                            {item.title}
                            {!item.isRead && (
                              <motion.span
                                variants={countVariants}
                                initial="hidden"
                                animate="visible"
                                className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0"
                                title="Unread"
                              />
                            )}
                          </h4>
                          <span className="text-[10px] font-semibold text-gray-400 shrink-0">
                            {item.timestamp}
                          </span>
                        </div>

                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed min-w-0 break-words">
                          {item.message}
                        </p>

                        {/* Action buttons footer */}
                        <div className="flex flex-wrap gap-2.5 pt-1 items-center justify-between">
                          {item.actionUrl ? (
                            <Link
                              href={item.actionUrl}
                              onClick={() => handleMarkAsRead(item.id)}
                              className="text-[10px] font-bold text-[#2563EB] hover:text-blue-700 flex items-center gap-1 group"
                            >
                              Take Action
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          ) : (
                            <div />
                          )}

                          <div className="flex items-center gap-1.5 ml-auto">
                            <button
                              type="button"
                              onClick={() => handleToggleRead(item.id)}
                              className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-slate-800 text-[9px] font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                              {item.isRead ? "Mark Unread" : "Mark Read"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50/20 transition-all cursor-pointer"
                              aria-label="Delete notification"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

      </div>
    </LazyMotion>
  );
}
