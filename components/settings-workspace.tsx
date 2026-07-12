"use client";

import { useState, useEffect } from "react";
import { motion, LazyMotion, domAnimation, AnimatePresence, type Variants } from "framer-motion";
import {
  Sun,
  Moon,
  Laptop,
  Globe,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Accessibility,
  User,
  Link2,
  Trash2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { UserSettings } from "@/types/settings";

/* ─────────────────────────────────────────────
   Dropdown & Select Options
───────────────────────────────────────────── */

const languages = [
  "English", "Hindi (हिंदी)", "Tamil (தமிழ்)", "Telugu (తెలుగు)", 
  "Bengali (বাংলা)", "Marathi (मराठी)", "Gujarati (ગુજરાતી)", 
  "Kannada (ಕನ್ನಡ)", "Malayalam (മലയാളം)", "Punjabi (ਪੰਜਾਬੀ)"
];

/* ─────────────────────────────────────────────
   Framer Motion Variants (module scope)
───────────────────────────────────────────── */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
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

const toastVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 25 },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function SettingsWorkspace() {
  const [settings, setSettings] = useState<UserSettings>({
    theme: "light",
    language: "English",
    emailAlerts: true,
    smsAlerts: false,
    whatsappAlerts: true,
    twoFactorAuth: false,
    dataSharing: true,
    highContrast: false,
    fontSize: "medium",
    googleConnected: true,
    githubConnected: false,
  });

  const [activeSection, setActiveSection] = useState("appearance");
  
  // Dialog modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sync state language with localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang) {
      setSettings((prev) => ({ ...prev, language: savedLang }));
    }
  }, []);

  const handleSaveSettings = (updated: Partial<UserSettings>) => {
    const nextSettings = { ...settings, ...updated };
    setSettings(nextSettings);

    // Sync language selection globally if changed
    if (updated.language) {
      localStorage.setItem("preferredLanguage", updated.language);
      window.dispatchEvent(new Event("languageChanged"));
    }

    setTimeout(() => {
      setToastMessage("Settings updated successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }, 800);
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    setToastMessage("Account deletion requested. This action is irreversible.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const navItems = [
    { id: "appearance", label: "Appearance", icon: Sun },
    { id: "language", label: "Language Preferences", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Lock },
    { id: "accessibility", label: "Accessibility", icon: Accessibility },
    { id: "account", label: "Account Settings", icon: User },
    { id: "connections", label: "Connected Accounts", icon: Link2 },
    { id: "danger", label: "Danger Zone", icon: Trash2 },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full relative">
        
        {/* Toast Alert Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              variants={toastVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-20 right-4 z-50 max-w-sm w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-xl p-4 flex gap-3 items-start"
              role="alert"
            >
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="block text-xs font-bold text-gray-800 dark:text-white">
                  {toastMessage}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal Overlay */}
        <AnimatePresence>
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-md p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="brand-card p-6 max-w-md w-full bg-white dark:bg-slate-900 border border-red-100 dark:border-red-950 rounded-2xl shadow-2xl relative space-y-5"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center shrink-0" aria-hidden="true">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 id="delete-modal-title" className="text-base font-extrabold text-[#0F172A] dark:text-white">
                    Delete Account Permanently?
                  </h3>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  This action is irreversible. All your profile attributes, saved schemes, and application progress history records will be deleted forever.
                </p>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-xs font-semibold border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-gray-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md shadow-red-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Yes, Delete My Account
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          
          {/* ── LEFT NAVIGATION SIDEBAR (1 Column) ── */}
          <nav 
            className="brand-card p-3 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1"
            aria-label="Settings section navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-xs font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                    isActive
                      ? "bg-blue-50/50 dark:bg-slate-800 text-[#2563EB] border border-blue-100/30 dark:border-slate-700/30 font-bold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-900/50"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-[#2563EB]" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── RIGHT PANEL EDIT WORKSPACE (3 Columns) ── */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              
              {/* 1. Appearance Panel */}
              {activeSection === "appearance" && (
                <motion.div
                  key="appearance"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
                      Theme Theme Preferences
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">Select the interface color scale theme</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Laptop },
                    ].map((t) => {
                      const Icon = t.icon;
                      const isSel = settings.theme === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => handleSaveSettings({ theme: t.id as "light" | "dark" | "system" })}
                          className={`flex flex-col items-center gap-2 p-4 border rounded-2xl transition-all focus:outline-none ${
                            isSel
                              ? "bg-blue-50/50 dark:bg-slate-800 border-[#2563EB] text-[#2563EB] font-bold"
                              : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs">{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* 2. Language preferences */}
              {activeSection === "language" && (
                <motion.div
                  key="language"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
                      Language Settings
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">Select preferred interface translate language</p>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="lang-select" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                      Select Language
                    </label>
                    <select
                      id="lang-select"
                      value={settings.language}
                      onChange={(e) => handleSaveSettings({ language: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                    >
                      {languages.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {/* 3. Notification Toggles */}
              {activeSection === "notifications" && (
                <motion.div
                  key="notifications"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
                      Notification Rules
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">Choose how you wish to receive matching scheme updates</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: "emailAlerts", label: "Email Notifications", desc: "Receive real-time match records in your inbox" },
                      { key: "smsAlerts", label: "SMS Alerts", desc: "Get text messages for critical deadline updates" },
                      { key: "whatsappAlerts", label: "WhatsApp Updates", desc: "Direct messages via WhatsApp for application step approvals" },
                    ].map((notif) => {
                      const notifKey = notif.key as "emailAlerts" | "smsAlerts" | "whatsappAlerts";
                      return (
                        <div key={notif.key} className="flex items-start justify-between p-3 rounded-xl border border-gray-50 dark:border-slate-800/40 bg-gray-50/20 dark:bg-slate-900/40">
                          <div className="space-y-0.5 pr-4">
                            <span className="block text-xs font-bold text-gray-700 dark:text-gray-200">{notif.label}</span>
                            <span className="block text-[10px] text-gray-400">{notif.desc}</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings[notifKey]}
                            onChange={(e) => handleSaveSettings({ [notifKey]: e.target.checked })}
                            className="w-4.5 h-4.5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer shrink-0 mt-1"
                          />
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* 4. Privacy & Security */}
              {activeSection === "privacy" && (
                <motion.div
                  key="privacy"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
                      Privacy &amp; Data sharing
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">Configure security authorizations</p>
                  </div>

                  <div className="space-y-4">
                    {/* 2FA Toggle */}
                    <div className="flex items-start justify-between p-3 rounded-xl border border-gray-50 dark:border-slate-800/40 bg-gray-50/20 dark:bg-slate-900/40">
                      <div className="space-y-0.5 pr-4">
                        <span className="block text-xs font-bold text-gray-700 dark:text-gray-200">Two-Factor Authentication</span>
                        <span className="block text-[10px] text-gray-400">Request mobile verification code on login</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => handleSaveSettings({ twoFactorAuth: e.target.checked })}
                        className="w-4.5 h-4.5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer shrink-0 mt-1"
                      />
                    </div>

                    {/* Data sharing Toggle */}
                    <div className="flex items-start justify-between p-3 rounded-xl border border-gray-50 dark:border-slate-800/40 bg-gray-50/20 dark:bg-slate-900/40">
                      <div className="space-y-0.5 pr-4">
                        <span className="block text-xs font-bold text-gray-700 dark:text-gray-200">Anonymous Data Sharing</span>
                        <span className="block text-[10px] text-gray-400">Share demographic aggregates to improve match algorithms</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.dataSharing}
                        onChange={(e) => handleSaveSettings({ dataSharing: e.target.checked })}
                        className="w-4.5 h-4.5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer shrink-0 mt-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 5. Accessibility settings */}
              {activeSection === "accessibility" && (
                <motion.div
                  key="accessibility"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
                      Accessibility Configuration
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">Enhance interface accessibility settings</p>
                  </div>

                  <div className="space-y-4">
                    {/* High contrast */}
                    <div className="flex items-start justify-between p-3 rounded-xl border border-gray-50 dark:border-slate-800/40 bg-gray-50/20 dark:bg-slate-900/40">
                      <div className="space-y-0.5 pr-4">
                        <span className="block text-xs font-bold text-gray-700 dark:text-gray-200">High Contrast Mode</span>
                        <span className="block text-[10px] text-gray-400">Increase visual elements outline and color weights</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.highContrast}
                        onChange={(e) => handleSaveSettings({ highContrast: e.target.checked })}
                        className="w-4.5 h-4.5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer shrink-0 mt-1"
                      />
                    </div>

                    {/* Font sizes dropdown */}
                    <div className="space-y-1 pt-1.5">
                      <label htmlFor="font-size" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Interface Font Scale
                      </label>
                      <select
                        id="font-size"
                        value={settings.fontSize}
                        onChange={(e) => handleSaveSettings({ fontSize: e.target.value as "small" | "medium" | "large" })}
                        className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                      >
                        <option value="small">Small (Readable layout)</option>
                        <option value="medium">Medium (Standard layout)</option>
                        <option value="large">Large (Increased readability)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 6. Account settings (Password change) */}
              {activeSection === "account" && (
                <motion.div
                  key="account"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
                      Account Security Setup
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">Configure account password rules</p>
                  </div>

                  <div className="space-y-4">
                    {/* Current Password */}
                    <div className="space-y-1">
                      <label htmlFor="curr-pass" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Current Password
                      </label>
                      <input
                        id="curr-pass"
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                      />
                    </div>

                    {/* New Password */}
                    <div className="space-y-1">
                      <label htmlFor="new-pass" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        New Password
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="new-pass"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 8 characters"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-3.5 pr-10 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Update CTA */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentPassword("");
                          setNewPassword("");
                          setToastMessage("Password updated successfully!");
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        }}
                        className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all focus:outline-none"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 7. Connected Accounts */}
              {activeSection === "connections" && (
                <motion.div
                  key="connections"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
                      Connected Platforms
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">Manage linked third party connections</p>
                  </div>

                  <div className="space-y-3.5">
                    {/* Google */}
                    <div className="flex justify-between items-center p-3 rounded-xl border border-gray-50 dark:border-slate-800/40 bg-gray-50/20 dark:bg-slate-900/40">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                        <div className="leading-tight text-xs">
                          <span className="block font-bold text-gray-700 dark:text-gray-200">Google Account</span>
                          <span className="block text-[9px] text-green-500 font-bold">Connected (rajesh.kumar@email.com)</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSaveSettings({ googleConnected: false })}
                        disabled={!settings.googleConnected}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                          settings.googleConnected
                            ? "border-red-200 text-red-500 hover:bg-red-50/20"
                            : "border-gray-100 text-gray-300"
                        }`}
                      >
                        Disconnect
                      </button>
                    </div>

                    {/* GitHub */}
                    <div className="flex justify-between items-center p-3 rounded-xl border border-gray-50 dark:border-slate-800/40 bg-gray-50/20 dark:bg-slate-900/40">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 fill-current text-[#0F172A] dark:text-white" viewBox="0 0 24 24">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        <div className="leading-tight text-xs">
                          <span className="block font-bold text-gray-700 dark:text-gray-200">GitHub Account</span>
                          <span className="block text-[9px] text-gray-400">Not linked</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSaveSettings({ githubConnected: true })}
                        disabled={settings.githubConnected}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                          !settings.githubConnected
                            ? "bg-[#2563EB] text-white hover:bg-blue-700 shadow-sm shadow-blue-500/10 cursor-pointer"
                            : "border-gray-100 text-gray-300"
                        }`}
                      >
                        Link Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 8. Danger Zone (Delete account placeholder) */}
              {activeSection === "danger" && (
                <motion.div
                  key="danger"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="brand-card p-6 border border-red-200 dark:border-red-950 bg-white dark:bg-slate-900 space-y-5"
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-red-500 uppercase tracking-wider">
                      Danger Zone
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">Irreversible account modifications</p>
                  </div>

                  <div className="p-4 bg-red-50/50 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900/30 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-0.5 leading-relaxed text-xs">
                      <span className="block font-bold text-red-800 dark:text-red-300">
                        Deactivating or Deleting your Account
                      </span>
                      <span className="block text-red-700 dark:text-red-400 font-medium">
                        Deleting the profile clears all match calculations. You will not receive updates.
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(true)}
                      className="px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow-md shadow-red-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete Account...
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </LazyMotion>
  );
}
