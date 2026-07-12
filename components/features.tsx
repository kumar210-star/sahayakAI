"use client";

import { motion, LazyMotion, domAnimation, type Variants } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  ClipboardList,
  GitCompare,
  Languages,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface Feature {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  accentBorder: string;
  title: string;
  description: string;
}

/* ─────────────────────────────────────────────
   Feature data
───────────────────────────────────────────── */

const features: Feature[] = [
  {
    icon: Sparkles,
    iconBg: "bg-blue-50",
    iconColor: "text-[#2563EB]",
    accentBorder: "hover:border-blue-200",
    title: "AI Eligibility Matching",
    description:
      "Instantly matches your profile against 1,200+ central and state government schemes using advanced AI — no manual searching required.",
  },
  {
    icon: MessageSquare,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    accentBorder: "hover:border-indigo-200",
    title: "AI Assistant",
    description:
      "Chat with our AI in plain language to get personalized scheme recommendations, guidance, and step-by-step application support.",
  },
  {
    icon: ClipboardList,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    accentBorder: "hover:border-teal-200",
    title: "Document Checklist",
    description:
      "Get a precise, auto-generated list of documents required for each scheme you qualify for — no surprises at the application stage.",
  },
  {
    icon: GitCompare,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    accentBorder: "hover:border-orange-200",
    title: "Compare Schemes",
    description:
      "Side-by-side comparison of benefits, eligibility criteria, and deadlines so you can pick the best scheme for your situation.",
  },
  {
    icon: Languages,
    iconBg: "bg-green-50",
    iconColor: "text-[#16A34A]",
    accentBorder: "hover:border-green-200",
    title: "Multilingual Support",
    description:
      "Access full scheme information in 10+ Indian regional languages including Hindi, Tamil, Telugu, Bengali, and more.",
  },
  {
    icon: LayoutDashboard,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    accentBorder: "hover:border-purple-200",
    title: "Personalized Dashboard",
    description:
      "Track your saved schemes, application statuses, and upcoming deadlines — all in one clean, personalized dashboard.",
  },
];

/* ─────────────────────────────────────────────
   Framer Motion variants — module scope
───────────────────────────────────────────── */

const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const cardEntryVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────────
   Feature Card sub-component
───────────────────────────────────────────── */

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <motion.div
      variants={cardEntryVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative flex flex-col gap-4 rounded-2xl border border-gray-100/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-xl sm:p-7 ${feature.accentBorder}`}
    >
      {/* Subtle top-right glow on hover */}
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-current opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-5"
        aria-hidden="true"
      />

      {/* Icon block */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
        aria-hidden="true"
      >
        <Icon className={`h-6 w-6 ${feature.iconColor}`} />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-[#0F172A]">{feature.title}</h3>

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed text-gray-500">
        {feature.description}
      </p>

      {/* Hover arrow indicator */}
      <div className="flex items-center gap-1 text-xs font-semibold text-gray-300 transition-all duration-300 group-hover:text-[#2563EB]">
        <span>Learn more</span>
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Features Section Component
───────────────────────────────────────────── */

export default function Features() {
  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-labelledby="features-heading"
        className="relative bg-white py-20 sm:py-28"
      >
        {/* Subtle background texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.04),transparent)]" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            className="mx-auto mb-14 max-w-2xl text-center"
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              Platform Features
            </span>
            <h2
              id="features-heading"
              className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl"
            >
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-blue-700 bg-clip-text text-transparent">
                Discover &amp; Apply
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500 sm:text-lg">
              From AI matching to one-click applications — SchemeMate AI handles
              it all so you can focus on what matters.
            </p>
          </motion.div>

          {/* 6-card responsive grid */}
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </motion.div>

        </div>
      </section>
    </LazyMotion>
  );
}
