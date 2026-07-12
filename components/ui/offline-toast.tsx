"use client";

import { useState, useEffect } from "react";
import { motion, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi, X } from "lucide-react";

export default function OfflineToast() {
  const [isOffline, setIsOffline] = useState(false);
  const [showOnlineNotification, setShowOnlineNotification] = useState(false);

  useEffect(() => {
    // Check initial state
    if (typeof window !== "undefined") {
      setIsOffline(!window.navigator.onLine);
    }

    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineNotification(true);
      const timer = setTimeout(() => setShowOnlineNotification(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowOnlineNotification(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {/* Offline Warning Banner */}
          {isOffline && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="pointer-events-auto bg-red-600 text-white rounded-2xl shadow-2xl p-4 flex gap-3 items-center border border-red-500/30"
              role="alert"
            >
              <WifiOff className="w-5 h-5 shrink-0 animate-pulse" />
              <div className="leading-tight flex-1 text-left">
                <span className="block text-xs font-bold">You are Offline</span>
                <span className="block text-[10px] text-red-100 font-medium">
                  Please check your connection. Reconnecting...
                </span>
              </div>
            </motion.div>
          )}

          {/* Restored Connection Toast */}
          {showOnlineNotification && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="pointer-events-auto bg-green-600 text-white rounded-2xl shadow-2xl p-4 flex gap-3 items-center border border-green-500/30"
              role="alert"
            >
              <Wifi className="w-5 h-5 shrink-0" />
              <div className="leading-tight flex-1 text-left">
                <span className="block text-xs font-bold">Connection Restored</span>
                <span className="block text-[10px] text-green-100 font-medium">
                  You are back online. All features synced.
                </span>
              </div>
              <button
                onClick={() => setShowOnlineNotification(false)}
                className="p-1 hover:bg-white/10 rounded-lg text-white/80 hover:text-white"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
