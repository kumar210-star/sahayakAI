"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Menu, X, ArrowRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { name: "English", native: "English" },
  { name: "Hindi (हिंदी)", native: "हिंदी" },
  { name: "Tamil (தமிழ்)", native: "தமிழ்" },
  { name: "Telugu (తెలుగు)", native: "తెలుగు" },
  { name: "Bengali (বাংলা)", native: "বাংলা" },
  { name: "Marathi (मराठी)", native: "मராठी" },
  { name: "Gujarati (ગુજરાતી)", native: "ગુજરાતી" },
  { name: "Kannada (ಕನ್ನಡ)", native: "ಕನ್ನಡ" },
  { name: "Malayalam (മലയാളம்)", native: "മലയാളம்" },
  { name: "Punjabi (ਪੰਜਾਬੀ)", native: "ਪੰਜਾਬੀ" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const loadLang = () => {
      const saved = localStorage.getItem("preferredLanguage");
      if (saved) {
        setCurrentLang(saved);
      }
    };

    window.addEventListener("scroll", handleScroll);
    loadLang();

    // Listen to changes from homepage modal
    window.addEventListener("languageChanged", loadLang);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("languageChanged", loadLang);
    };
  }, []);

  const selectLanguage = (lang: string) => {
    localStorage.setItem("preferredLanguage", lang);
    setCurrentLang(lang);
    setIsLangOpen(false);
    window.dispatchEvent(new Event("languageChanged"));
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Eligibility Checker", href: "/eligibility" },
    { name: "AI Assistant", href: "/assistant" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm"
          : "bg-white dark:bg-slate-900 border-b border-transparent"
      )}
    >
      <div className="container-layout flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#2563EB] text-white transition-transform group-hover:scale-105">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-[#0F172A] dark:text-white">
            SchemeMate <span className="text-[#2563EB]">AI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#2563EB] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4 relative">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-white border border-gray-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 focus:outline-none transition-all"
              aria-label="Select preferred language"
            >
              <Globe className="w-4 h-4" />
              <span>{languages.find(l => l.name === currentLang)?.native || currentLang}</span>
            </button>
            
            {isLangOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-50 max-h-64 overflow-y-auto"
                role="menu"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.name}
                    onClick={() => selectLanguage(lang.name)}
                    className={cn(
                      "w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors block",
                      currentLang === lang.name
                        ? "text-[#2563EB] bg-blue-50/50 dark:bg-slate-800"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                    role="menuitem"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-[#2563EB] border border-blue-200 dark:border-slate-800 hover:border-[#2563EB] rounded-lg hover:bg-blue-50/50 dark:hover:bg-slate-800/40 transition-all flex items-center justify-center"
          >
            Login
          </Link>
          <Link
            href="/get-started"
            className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-blue-700 shadow-sm rounded-lg transition-all flex items-center justify-center gap-1 group"
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-[#0F172A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-[#2563EB] hover:bg-gray-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Language Switcher List */}
            <div className="pt-2 border-t border-gray-100 dark:border-slate-800">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Preferred Language
              </span>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.name}
                    onClick={() => selectLanguage(lang.name)}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-[10px] font-semibold border transition-all",
                      currentLang === lang.name
                        ? "bg-[#2563EB] text-white border-[#2563EB]"
                        : "bg-white dark:bg-slate-850 text-gray-600 dark:text-gray-400 border-gray-250 dark:border-slate-800"
                    )}
                  >
                    {lang.native}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100 dark:border-slate-800 my-2" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-medium text-[#2563EB] border border-blue-200 dark:border-slate-800 rounded-lg hover:bg-blue-50/50 dark:hover:bg-slate-800/40 transition-all"
              >
                Login
              </Link>
              <Link
                href="/get-started"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-medium text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
