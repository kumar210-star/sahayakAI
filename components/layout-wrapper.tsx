"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import { useAuth } from "@/context/auth-context";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Authenticated paths that render the Left Sidebar
  const authRoutes = [
    "/dashboard",
    "/assistant",
    "/eligibility",
    "/saved",
    "/tracker",
    "/notifications",
    "/profile",
    "/settings",
  ];

  const { loading } = useAuth();
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Show a loading screen while session is being resolved on protected routes
  if (loading && isAuthRoute) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Determine current page title for mobile header display
  const getMobileTitle = () => {
    if (pathname.startsWith("/dashboard")) return "Dashboard";
    if (pathname.startsWith("/assistant")) return "AI Assistant";
    if (pathname.startsWith("/eligibility")) return "Eligibility Checker";
    if (pathname.startsWith("/saved")) return "Saved Schemes";
    if (pathname.startsWith("/tracker")) return "Application Tracker";
    if (pathname.startsWith("/notifications")) return "Notifications";
    if (pathname.startsWith("/profile")) return "Profile";
    if (pathname.startsWith("/settings")) return "Settings";
    return "SahayakAI";
  };

  if (isAuthRoute) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        
        {/* Collapsible Left Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Application Container */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Mobile Top Bar (only visible on lg:hidden viewports) */}
          <header className="lg:hidden h-14 bg-white dark:bg-slate-900 border-b border-gray-150 dark:border-slate-800 flex items-center justify-between px-4 shrink-0 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="p-1.5 text-gray-500 hover:text-slate-900 dark:hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
                aria-label="Open navigation sidebar"
              >
                <Menu className="w-5.5 h-5.5" />
              </button>
              <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                {getMobileTitle()}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4 shrink-0" />
              </div>
            </div>
          </header>

          {/* Independently scrolling page workspace */}
          <main className="flex-grow overflow-y-auto relative outline-none focus:outline-none">
            {children}
          </main>
        </div>

      </div>
    );
  }

  // Public layouts wrap
  return (
    <>
      <Navbar />
      <main className="relative min-h-[90vh]">{children}</main>
    </>
  );
}
