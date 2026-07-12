"use client";

import { useState, useEffect, useRef } from "react";
import { motion, LazyMotion, domAnimation, type Variants } from "framer-motion";
import {
  Compass,
  Sparkles,
  Send,
  Plus,
  MessageSquare,
  Menu,
  X,
  User,
  ShieldAlert,
} from "lucide-react";
import { ChatMessage, ChatSession } from "@/types/assistant";

/* ─────────────────────────────────────────────
   Initial mock historical sessions
───────────────────────────────────────────── */

const initialSessions: ChatSession[] = [
  {
    id: "session-1",
    title: "PM Awas Yojana Help",
    messages: [
      { id: "1", role: "user", text: "Am I eligible for PM Awas Yojana?", timestamp: new Date() },
      {
        id: "2",
        role: "assistant",
        text: "Pradhan Mantri Awas Yojana (PMAY) provides affordable housing subsidies up to ₹2.67 Lakhs. Eligibility depends on household income: EWS (up to ₹3L), LIG (up to ₹6L), and MIG (up to ₹18L). Do you own any other pucca house in India?",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "session-2",
    title: "PM-Kisan Income Query",
    messages: [
      { id: "3", role: "user", text: "How do I register for PM-Kisan?", timestamp: new Date() },
      {
        id: "4",
        role: "assistant",
        text: "You can register on the PM-Kisan official portal using your Aadhaar number, landholding records, and bank account details. Benefits of ₹6,000/year are sent directly via DBT.",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "session-3",
    title: "Scholarship Document Checklist",
    messages: [
      { id: "5", role: "user", text: "What documents do I need for scholarships?", timestamp: new Date() },
      {
        id: "6",
        role: "assistant",
        text: "Generally, you need: 1. Previous class marksheet, 2. Income certificate, 3. Community/Category certificate, 4. Fee receipt, and 5. Bank passbook linked with Aadhaar.",
        timestamp: new Date(),
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Suggested Prompts list
───────────────────────────────────────────── */

const suggestedPrompts = [
  { text: "Am I eligible for PM Awas Yojana?", icon: Sparkles },
  { text: "What documents do I need for agricultural subsidies?", icon: MessageSquare },
  { text: "Show me scholarship schemes for graduate students.", icon: Compass },
  { text: "Explain how DBT (Direct Benefit Transfer) works.", icon: Send },
];

/* ─────────────────────────────────────────────
   Keyword match mock responses
───────────────────────────────────────────── */

const getMockResponse = (input: string): string => {
  const query = input.toLowerCase();

  if (query.includes("awas") || query.includes("housing") || query.includes("house")) {
    return "Pradhan Mantri Awas Yojana (PMAY) is a central government initiative to provide affordable housing for all in urban and rural areas. Under this scheme, eligible beneficiaries receive a interest subsidy up to ₹2.67 Lakhs on home loans depending on their income slab (EWS/LIG/MIG). To qualify, the beneficiary family must not own a pucca house anywhere in India. Would you like to check your eligibility criteria?";
  }
  if (query.includes("kisan") || query.includes("farm") || query.includes("agricultur")) {
    return "PM-Kisan Samman Nidhi is a central sector scheme that provides direct income support of ₹6,000 per year in three equal installments to all landholding farmer families across India. The benefits are directly transferred to bank accounts via Aadhaar-linked DBT. Let me know if you need help checking if your land records are successfully registered!";
  }
  if (query.includes("scholarship") || query.includes("student") || query.includes("education") || query.includes("college")) {
    return "The National Scholarship Portal (NSP) hosts central, state, and UGC schemes for students from Class 1 to Post-Graduation. Key requirements include: 1. Marksheet from previous year (often requiring >50% marks), 2. Family income certificate (typically < ₹1.5L - ₹2.5L per annum), and 3. Caste/Category certificates for specific scheme reserves. What level of education are you currently pursuing?";
  }
  if (query.includes("dbt") || query.includes("benefit") || query.includes("direct")) {
    return "Direct Benefit Transfer (DBT) is a government mechanism to transfer subsidies and financial benefits directly into the beneficiary's Aadhaar-linked bank account. This eliminates middlemen, reduces leakages, and ensures 100% transparency. Schemes like PM-Kisan, PAHAL (LPG subsidy), and MGNREGS run completely on DBT.";
  }
  return "I can guide you through central and state government schemes! Try asking about 'PM Awas', 'PM Kisan', 'scholarships', or try our Eligibility Checker in the top navigation bar.";
};

/* ─────────────────────────────────────────────
   Framer Motion animations
───────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const messageVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const promptVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function AiAssistant() {
  const [sessions, setSessions] = useState<ChatSession[]>(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState<string>("session-1");
  const [inputVal, setInputVal] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages, isLoading]);

  // Load a session
  const selectSession = (id: string) => {
    setActiveSessionId(id);
    setIsSidebarOpen(false);
  };

  // Start new session
  const handleNewChat = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: "New Query",
      messages: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setIsSidebarOpen(false);
  };

  // Send message
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date(),
    };

    // Update active session with user's message
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          const updatedMsgs = [...s.messages, userMsg];
          const newTitle = s.title === "New Query" ? text.slice(0, 24) + (text.length > 24 ? "..." : "") : s.title;
          return {
            ...s,
            title: newTitle,
            messages: updatedMsgs,
          };
        }
        return s;
      })
    );

    setInputVal("");
    setIsLoading(true);

    // AI typing response delay
    setTimeout(() => {
      setIsLoading(false);
      const aiResponse = getMockResponse(text);
      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        role: "assistant",
        text: aiResponse,
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: [...s.messages, aiMsg],
            };
          }
          return s;
        })
      );
    }, 1100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputVal);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex h-[80vh] border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xl my-4 sm:my-8 relative">
        
        {/* ── LEFT SIDEBAR (Desktop permanent / Mobile drawer) ── */}
        <aside
          className={`absolute lg:static top-0 bottom-0 left-0 z-30 w-72 bg-gray-50 dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 transition-transform duration-300 flex flex-col ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Sidebar header */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-950">
            <span className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
              Chat History
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-4 flex-none">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2563EB] text-white hover:bg-blue-700 text-sm font-semibold rounded-xl shadow-md shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              <Plus className="w-4.5 h-4.5" />
              New Chat
            </button>
          </div>

          {/* Chat Sessions list */}
          <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-1.5" aria-label="Conversation History">
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <button
                  key={session.id}
                  onClick={() => selectSession(session.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-white dark:bg-slate-900 text-[#2563EB] border border-blue-100 dark:border-slate-800 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-900/50"
                  }`}
                >
                  <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? "text-[#2563EB]" : "text-gray-400"}`} />
                  <span className="truncate">{session.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Sidebar Overlay (Mobile only) */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-xs z-20 lg:hidden"
            aria-hidden="true"
          />
        )}

        {/* ── MAIN CHAT CANVAS ── */}
        <section className="flex-1 flex flex-col bg-white dark:bg-slate-900 h-full relative" aria-label="Chat interface">
          
          {/* Header */}
          <header className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between flex-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-md relative z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none"
                aria-label="Open Sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-[#2563EB]" aria-hidden="true">
                <Compass className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <h1 className="text-sm font-bold text-[#0F172A] dark:text-white">SchemeMate AI Assistant</h1>
                <span className="text-[10px] font-semibold text-green-500 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Active Support
                </span>
              </div>
            </div>
          </header>

          {/* Chat Messages / Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4" aria-live="polite">
            {activeSession.messages.length === 0 ? (
              /* Welcome Screen */
              <motion.div
                className="h-full flex flex-col justify-center items-center max-w-xl mx-auto text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* AI Assistant Icon */}
                <motion.div
                  variants={promptVariants}
                  className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-[#2563EB] mb-4 shadow-sm"
                >
                  <Sparkles className="w-7 h-7" />
                </motion.div>

                <motion.h2
                  variants={promptVariants}
                  className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white"
                >
                  Ask SchemeMate AI
                </motion.h2>

                <motion.p
                  variants={promptVariants}
                  className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm"
                >
                  Ask any questions about eligibility, schemes, documents, or registration processes in simple language.
                </motion.p>

                {/* Suggested Prompts Grid */}
                <motion.div
                  variants={promptVariants}
                  className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
                >
                  {suggestedPrompts.map((prompt) => {
                    const Icon = prompt.icon;
                    return (
                      <button
                        key={prompt.text}
                        onClick={() => handleSendMessage(prompt.text)}
                        className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 hover:border-blue-200 dark:hover:border-blue-900 hover:bg-blue-50/20 dark:hover:bg-blue-950/20 text-left text-xs font-semibold text-[#0F172A] dark:text-gray-300 transition-all flex justify-between items-center group focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <span className="max-w-[85%]">{prompt.text}</span>
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#2563EB] shrink-0 transition-colors ml-2" />
                      </button>
                    );
                  })}
                </motion.div>
              </motion.div>
            ) : (
              /* Message Thread */
              <div className="space-y-4">
                {activeSession.messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={msg.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className={`flex items-start gap-3 max-w-[85%] ${
                        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                          isUser
                            ? "bg-[#2563EB] text-white border-blue-600"
                            : "bg-gray-50 dark:bg-slate-800 text-[#2563EB] border-gray-100 dark:border-slate-700"
                        }`}
                        aria-hidden="true"
                      >
                        {isUser ? <User className="w-4.5 h-4.5" /> : <Compass className="w-4.5 h-4.5" />}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`p-3.5 px-4 rounded-2xl text-sm leading-relaxed ${
                          isUser
                            ? "bg-[#2563EB] text-white rounded-tr-sm"
                            : "bg-gray-100 dark:bg-slate-800 text-[#0F172A] dark:text-gray-200 rounded-tl-sm border border-gray-200/40 dark:border-slate-700/50"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Typing/Loading Animation */}
                {isLoading && (
                  <div className="flex items-start gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-[#2563EB] flex items-center justify-center shrink-0" aria-hidden="true">
                      <Compass className="w-4.5 h-4.5" />
                    </div>
                    <div className="p-3.5 px-4 bg-gray-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm border border-gray-200/40 dark:border-slate-700/50 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex-none relative z-10">
            <div className="max-w-2xl mx-auto flex items-center gap-2 relative">
              <input
                type="text"
                placeholder="Ask SchemeMate AI..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full pl-4 pr-12 py-3.5 border border-gray-200 dark:border-slate-800 rounded-xl text-sm bg-white dark:bg-slate-950 text-[#0F172A] dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all"
                aria-label="Query input"
              />
              <button
                onClick={() => handleSendMessage(inputVal)}
                disabled={!inputVal.trim() || isLoading}
                className={`absolute right-2 p-2 rounded-lg transition-all ${
                  inputVal.trim() && !isLoading
                    ? "bg-[#2563EB] text-white hover:bg-blue-700 cursor-pointer"
                    : "text-gray-300 dark:text-slate-700 cursor-not-allowed"
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Disclaimer */}
            <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] text-gray-400 font-medium">
              <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
              <span>AI can make mistakes. Verify critical scheme details from official sources.</span>
            </div>
          </div>

        </section>

      </div>
    </LazyMotion>
  );
}
