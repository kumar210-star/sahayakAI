"use client";

import { motion, LazyMotion, domAnimation, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/* ─────────────────────────────────────────────
   Framer Motion variants — module scope
───────────────────────────────────────────── */

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function CtaBanner() {
  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-labelledby="cta-heading"
        className="relative overflow-hidden bg-gradient-to-r from-[#2563EB] to-blue-700 py-20 sm:py-24"
      >
        {/* Decorative background blobs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-2xl" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col items-center gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Eyebrow badge */}
            <motion.div variants={fadeUpVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Join Lakhs of Indians
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              id="cta-heading"
              variants={fadeUpVariants}
              className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Ready to Discover Schemes{" "}
              <span className="text-blue-200">Made for You?</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              variants={fadeUpVariants}
              className="max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg"
            >
              Join lakhs of Indians who found their government benefits using
              SchemeMate AI — in minutes, not months.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              {/* Primary */}
              <Link
                href="/eligibility"
                aria-label="Check your eligibility for government schemes"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-[#2563EB] shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                Check My Eligibility
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              {/* Secondary */}
              <Link
                href="/assistant"
                aria-label="Talk to the SchemeMate AI assistant"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                Talk to AI Assistant
              </Link>
            </motion.div>

            {/* Trust note */}
            <motion.p variants={fadeUpVariants} className="text-xs text-blue-200">
              Free to use · No registration required to explore · 100% official sources
            </motion.p>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
}
