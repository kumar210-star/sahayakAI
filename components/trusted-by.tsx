"use client";

import { motion, LazyMotion, domAnimation, type Variants } from "framer-motion";
import { BookOpen, Map, Users, IndianRupee } from "lucide-react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface Stat {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
}

/* ─────────────────────────────────────────────
   Stat data
───────────────────────────────────────────── */

const stats: Stat[] = [
  {
    icon: BookOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-[#2563EB]",
    value: "1,200+",
    label: "Government Schemes",
  },
  {
    icon: Map,
    iconBg: "bg-green-50",
    iconColor: "text-[#16A34A]",
    value: "36",
    label: "States & Union Territories",
  },
  {
    icon: Users,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    value: "50 Lakh+",
    label: "Verified Users",
  },
  {
    icon: IndianRupee,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    value: "₹2.5L Cr+",
    label: "DBT Benefits Disbursed",
  },
];

/* ─────────────────────────────────────────────
   Framer Motion variants — module scope
───────────────────────────────────────────── */

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const statCardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function TrustedBy() {
  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-labelledby="trustedby-heading"
        className="relative bg-gray-50/60 py-16 sm:py-20 border-y border-gray-100"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Label */}
          <motion.div
            className="mb-10 text-center"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Powering Scheme Discovery For
            </p>
            <h2
              id="trustedby-heading"
              className="sr-only"
            >
              Platform Statistics
            </h2>
          </motion.div>

          {/* Stat cards grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={statCardVariants}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
                >
                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
                    aria-hidden="true"
                  >
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>

                  {/* Value */}
                  <span className="text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
                    {stat.value}
                  </span>

                  {/* Label */}
                  <span className="text-xs font-medium text-gray-500 sm:text-sm">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>
    </LazyMotion>
  );
}
