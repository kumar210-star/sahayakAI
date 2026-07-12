"use client";

import { useState } from "react";
import { motion, LazyMotion, domAnimation, AnimatePresence, type Variants } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  Briefcase,
  IndianRupee,
  GraduationCap,
  Users,
  CheckCircle,
  Camera,
  Loader2,
  Heart,
} from "lucide-react";
import { UserProfileData } from "@/types/profile";

/* ─────────────────────────────────────────────
   Mock Avatars (preset color states)
───────────────────────────────────────────── */

const presets = [
  { id: "p-blue", color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400" },
  { id: "p-green", color: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400" },
  { id: "p-purple", color: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400" },
];

/* ─────────────────────────────────────────────
   Framer Motion animations
───────────────────────────────────────────── */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
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
   Dropdown options
───────────────────────────────────────────── */

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const occupations = ["Student", "Farmer", "Self-Employed", "Salaried", "Business Owner", "Homemaker", "Unemployed"];
const incomes = ["Below ₹1L", "₹1–3L", "₹3–6L", "₹6–10L", "Above ₹10L"];
const educations = ["No Formal Education", "Primary", "Secondary", "Diploma", "Graduate", "Post-Graduate"];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function UserProfile() {
  const [profile, setProfile] = useState<UserProfileData>({
    avatarUrl: "p-blue",
    fullName: "Rajesh Kumar",
    mobileNumber: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    aadhaarMasked: "•••• •••• 4920",
    state: "Maharashtra",
    district: "Pune",
    occupation: "Farmer",
    income: "₹1–3L",
    education: "Graduate",
    familyMembers: 4,
    dependents: 2,
    isPrimaryEarner: true,
  });

  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Validation States
  const [fullNameError, setFullNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChangeAvatar = () => {
    const nextIdx = (activePresetIndex + 1) % presets.length;
    setActivePresetIndex(nextIdx);
    setProfile((prev) => ({ ...prev, avatarUrl: presets[nextIdx].id }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!profile.fullName.trim()) {
      setFullNameError("Full Name is required");
      valid = false;
    } else {
      setFullNameError("");
    }

    if (!profile.mobileNumber.trim()) {
      setMobileError("Mobile Number is required");
      valid = false;
    } else {
      setMobileError("");
    }

    if (!profile.email.trim()) {
      setEmailError("Email Address is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (valid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowToast(true);
        // Hide toast after 3 seconds
        setTimeout(() => setShowToast(false), 3000);
      }, 1000);
    }
  };

  const currentAvatar = presets[activePresetIndex];

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full relative">
        
        {/* Success Alert Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              variants={toastVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-20 right-4 z-50 max-w-sm w-full bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-xl shadow-xl p-4 flex gap-3 items-start"
              role="alert"
            >
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="block text-xs font-bold text-green-800 dark:text-green-300">
                  Profile Saved Successfully!
                </span>
                <span className="block text-[10px] text-green-700 dark:text-green-400">
                  All eligibility attributes updated on local profile.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">

          {/* ── LEFT COLUMN: Profile Card & Shortcuts ── */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center text-center space-y-6 self-start"
          >
            {/* Avatar & Hover picker overlay */}
            <div className="relative group shrink-0">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold ${currentAvatar.color} border-2 border-white dark:border-slate-850 shadow-md transition-all group-hover:scale-102`}>
                {profile.fullName.split(" ").map(n => n[0]).join("") || "U"}
              </div>
              <button
                type="button"
                onClick={handleChangeAvatar}
                className="absolute bottom-0 right-0 p-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-full shadow-md focus:outline-none transition-colors border border-white dark:border-slate-900 cursor-pointer"
                aria-label="Change profile avatar preset color"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="space-y-1">
              <h2 className="text-base font-extrabold text-[#0F172A] dark:text-white leading-tight">
                {profile.fullName || "User Profile"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {profile.state}, India
              </p>
              <div className="pt-2 flex justify-center">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest border border-blue-100/30 dark:border-blue-900/30">
                  Verified Profile
                </span>
              </div>
            </div>

            {/* Navigation links placeholder */}
            <nav className="w-full border-t border-gray-100 dark:border-slate-800/80 pt-4 space-y-1" aria-label="Profile section shortcuts">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50/50 dark:bg-slate-800 text-xs font-bold text-[#2563EB]">
                <User className="w-4 h-4" />
                Personal Details
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <MapPin className="w-4 h-4" />
                Socio-Economic &amp; Location
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <Users className="w-4 h-4" />
                Family Information
              </div>
            </nav>
          </motion.div>

          {/* ── RIGHT COLUMN: Main Edit Forms (col-span-2) ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Panel 1: Personal Details */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
            >
              <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-slate-800 pb-2">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="fullName" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all ${
                      fullNameError ? "border-red-500" : "border-gray-250 dark:border-slate-800"
                    }`}
                  />
                  {fullNameError && <span className="block text-[9px] font-bold text-red-500 mt-1">⚠️ {fullNameError}</span>}
                </div>

                {/* Mobile Number */}
                <div className="space-y-1">
                  <label htmlFor="mobile" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="text"
                    value={profile.mobileNumber}
                    onChange={(e) => setProfile(prev => ({ ...prev, mobileNumber: e.target.value }))}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all ${
                      mobileError ? "border-red-500" : "border-gray-250 dark:border-slate-800"
                    }`}
                  />
                  {mobileError && <span className="block text-[9px] font-bold text-red-500 mt-1">⚠️ {mobileError}</span>}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all ${
                      emailError ? "border-red-500" : "border-gray-250 dark:border-slate-800"
                    }`}
                  />
                  {emailError && <span className="block text-[9px] font-bold text-red-500 mt-1">⚠️ {emailError}</span>}
                </div>

                {/* Aadhaar Number Placeholder */}
                <div className="space-y-1 relative">
                  <label htmlFor="aadhaar" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Aadhaar Card
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="aadhaar"
                      type="text"
                      disabled
                      value={profile.aadhaarMasked}
                      className="w-full pl-3.5 pr-8 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl text-xs bg-gray-50 dark:bg-slate-950/40 text-gray-400 select-none cursor-not-allowed"
                    />
                    <Lock className="w-3.5 h-3.5 text-gray-400 absolute right-3" aria-hidden="true" />
                  </div>
                  <span className="block text-[9px] font-semibold text-gray-400 mt-1">
                    Masked for security. Aadhaar details are locked.
                  </span>
                </div>

              </div>
            </motion.div>

            {/* Panel 2: Socio-Economic & Address details */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
            >
              <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-slate-800 pb-2">
                Socio-Economic &amp; Demographics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* State Dropdown */}
                <div className="space-y-1">
                  <label htmlFor="state" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> State / UT
                  </label>
                  <select
                    id="state"
                    value={profile.state}
                    onChange={(e) => setProfile(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                  >
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* District */}
                <div className="space-y-1">
                  <label htmlFor="district" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    District
                  </label>
                  <input
                    id="district"
                    type="text"
                    value={profile.district}
                    onChange={(e) => setProfile(prev => ({ ...prev, district: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                  />
                </div>

                {/* Occupation Dropdown */}
                <div className="space-y-1">
                  <label htmlFor="occupation" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> Occupation
                  </label>
                  <select
                    id="occupation"
                    value={profile.occupation}
                    onChange={(e) => setProfile(prev => ({ ...prev, occupation: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                  >
                    {occupations.map(occ => <option key={occ} value={occ}>{occ}</option>)}
                  </select>
                </div>

                {/* Income Slabs Dropdown */}
                <div className="space-y-1">
                  <label htmlFor="income" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" /> Annual Family Income
                  </label>
                  <select
                    id="income"
                    value={profile.income}
                    onChange={(e) => setProfile(prev => ({ ...prev, income: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                  >
                    {incomes.map(inc => <option key={inc} value={inc}>{inc}</option>)}
                  </select>
                </div>

                {/* Education Levels Dropdown */}
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="education" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" /> Education Level
                  </label>
                  <select
                    id="education"
                    value={profile.education}
                    onChange={(e) => setProfile(prev => ({ ...prev, education: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                  >
                    {educations.map(edu => <option key={edu} value={edu}>{edu}</option>)}
                  </select>
                </div>

              </div>
            </motion.div>

            {/* Panel 3: Family Details */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="brand-card p-6 border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
            >
              <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-slate-800 pb-2">
                Family Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Family Members Count */}
                <div className="space-y-1">
                  <label htmlFor="members" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Users className="w-3 h-3" /> Family Members Count
                  </label>
                  <input
                    id="members"
                    type="number"
                    min="1"
                    max="20"
                    value={profile.familyMembers}
                    onChange={(e) => setProfile(prev => ({ ...prev, familyMembers: Math.max(1, parseInt(e.target.value) || 1) }))}
                    className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                  />
                </div>

                {/* Dependents Count */}
                <div className="space-y-1">
                  <label htmlFor="dependents" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Heart className="w-3 h-3" /> Dependents Count
                  </label>
                  <input
                    id="dependents"
                    type="number"
                    min="0"
                    max="20"
                    value={profile.dependents}
                    onChange={(e) => setProfile(prev => ({ ...prev, dependents: Math.max(0, parseInt(e.target.value) || 0) }))}
                    className="w-full px-3.5 py-2.5 border border-gray-250 dark:border-slate-800 rounded-xl text-xs bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 dark:focus:ring-offset-slate-900 transition-all"
                  />
                </div>

                {/* Earner Status Checkbox */}
                <div className="flex items-center sm:col-span-2 pt-1">
                  <input
                    id="earner"
                    type="checkbox"
                    checked={profile.isPrimaryEarner}
                    onChange={(e) => setProfile(prev => ({ ...prev, isPrimaryEarner: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                  />
                  <label htmlFor="earner" className="ml-2 text-xs font-semibold text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                    I am the primary earning member of the family
                  </label>
                </div>

              </div>
            </motion.div>

            {/* Save Button Row */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  isLoading
                    ? "bg-blue-300 dark:bg-blue-900 text-white cursor-not-allowed"
                    : "bg-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>

          </div>

        </form>
      </div>
    </LazyMotion>
  );
}
