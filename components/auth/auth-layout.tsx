"use client";

import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-12">
      {/* Decorative ambient blur background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20" aria-hidden="true">
        <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-blue-200/50 dark:bg-blue-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-green-100/50 dark:bg-green-900/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Glassmorphic Wrapper */}
        <div className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-md border border-white/70 dark:border-slate-800/70 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col space-y-6">
          
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 group justify-center">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#2563EB] text-white transition-transform group-hover:scale-105">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg tracking-tight text-[#0F172A] dark:text-white">
                SchemeMate <span className="text-[#2563EB]">AI</span>
              </span>
            </Link>
            
            <h2 className="text-xl font-extrabold text-[#0F172A] dark:text-white pt-2 leading-tight">
              {title}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          </div>

          {children}

        </div>
      </div>
    </div>
  );
}
