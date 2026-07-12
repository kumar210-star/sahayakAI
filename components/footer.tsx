import Link from "next/link";
import { Compass } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Eligibility Checker", href: "/eligibility" },
  { name: "AI Assistant", href: "/assistant" },
  { name: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white" role="contentinfo">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="group inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white transition-transform group-hover:scale-105">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-[#0F172A]">
                SchemeMate <span className="text-[#2563EB]">AI</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              AI-powered government scheme discovery for every Indian. Find, verify,
              and apply — all in one place.
            </p>
            <p className="text-sm font-medium text-gray-400">
              Made with{" "}
              <span role="img" aria-label="love">
                ❤️
              </span>{" "}
              for India
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-gray-600 transition-colors hover:text-[#2563EB]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Contact / Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Contact
            </h3>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p>support@schememateai.in</p>
              <p>Available Mon – Sat, 10AM – 6PM IST</p>
            </div>
            <div className="mt-2 flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-600">
                🔒 Official Sources Only
              </p>
              <p className="text-xs text-gray-400">
                All scheme data is sourced directly from government portals and
                updated in real-time.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 sm:flex-row">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} SchemeMate AI. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-[#2563EB] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#2563EB] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
