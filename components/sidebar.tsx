"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import {
  LayoutDashboard,
  Bot,
  ClipboardCheck,
  Bookmark,
  TrendingUp,
  Bell,
  User,
  Settings,
  Globe,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Compass,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [currentLang, setCurrentLang] = useState("English");
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Sync current language with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("preferredLanguage");
      if (savedLang) setCurrentLang(savedLang);

      const handleLangChange = () => {
        const updated = localStorage.getItem("preferredLanguage");
        if (updated) setCurrentLang(updated);
      };
      window.addEventListener("languageChanged", handleLangChange);
      return () => window.removeEventListener("languageChanged", handleLangChange);
    }
  }, []);

  const handleLanguageSelect = (lang: string) => {
    localStorage.setItem("preferredLanguage", lang);
    setCurrentLang(lang);
    setIsLangOpen(false);
    window.dispatchEvent(new Event("languageChanged"));
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Assistant", href: "/assistant", icon: Bot },
    { name: "Eligibility Checker", href: "/eligibility", icon: ClipboardCheck },
    { name: "Saved Schemes", href: "/saved", icon: Bookmark },
    { name: "Tracker", href: "/tracker", icon: TrendingUp },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-gray-150 dark:border-slate-800 text-left">
      
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-slate-800/60 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2.5 focus:outline-none">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/10">
            <Compass className="w-4.5 h-4.5 shrink-0" />
          </div>
          {!isCollapsed && (
            <span className="text-sm font-black tracking-tight text-slate-800 dark:text-white">
              Sahayak<span className="text-[#2563EB]">AI</span>
            </span>
          )}
        </Link>

        {/* Mobile Close Icon */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close sidebar drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List links */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                isActive
                  ? "bg-blue-50/50 dark:bg-slate-800/60 text-[#2563EB] dark:text-white font-extrabold"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-white"
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer controls: Language and Logout */}
      <div className="p-3 border-t border-gray-100 dark:border-slate-800/60 space-y-2 shrink-0">
        
        {/* Language selector block */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
            title="Switch Language"
            aria-expanded={isLangOpen}
            aria-haspopup="listbox"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-4.5 h-4.5 shrink-0" />
              {!isCollapsed && <span className="truncate">{currentLang}</span>}
            </div>
            {!isCollapsed && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
          </button>

          {/* Lang Popover list */}
          <AnimatePresence>
            {isLangOpen && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className={`absolute bottom-full left-0 z-50 mb-2 w-48 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl shadow-2xl p-1.5 focus:outline-none ${
                  isCollapsed ? "left-12" : "left-0"
                }`}
                role="listbox"
              >
                {["English", "हिन्दी", "मराठी", "ಕನ್ನಡ"].map((lang) => (
                  <li key={lang} role="option" aria-selected={currentLang === lang}>
                    <button
                      onClick={() => handleLanguageSelect(lang)}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-900 rounded-lg cursor-pointer transition-colors"
                    >
                      {lang}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Sign Out"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>

      </div>
    </div>
  );

  return (
    <>
      {/* Desktop collapsible view */}
      <aside
        className={`hidden lg:block h-screen shrink-0 transition-all duration-300 relative z-30 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="h-full relative">
          {sidebarContent}
          {/* Collapse toggle pin */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-20 -right-3.5 z-40 w-7 h-7 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-full flex items-center justify-center shadow-md text-gray-500 hover:text-slate-900 dark:hover:text-white cursor-pointer focus:outline-none"
            aria-label={isCollapsed ? "Expand sidebar panel" : "Collapse sidebar panel"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            {/* Backdrop click close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              aria-hidden="true"
            />
            {/* Drawer Content */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-64 h-full z-50 flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
