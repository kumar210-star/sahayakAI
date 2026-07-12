"use client";

import { useState, useEffect, useRef } from "react";
import { motion, LazyMotion, domAnimation, type Variants } from "framer-motion";
import { Compass, CheckCircle2, RefreshCw, Send, ChevronRight } from "lucide-react";
import { UserProfile, ChatMessage, EligibilityStep } from "@/types/eligibility";
import RecommendationCards from "@/components/recommendation-cards";

/* ─────────────────────────────────────────────
   Question data & steps
───────────────────────────────────────────── */

const steps: EligibilityStep[] = [
  {
    field: "language",
    question: "Welcome! Please select your preferred language to begin / स्वागत है! कृपया शुरू करने के लिए अपनी पसंदीदा भाषा चुनें:",
    chips: [
      "English",
      "Hindi (हिंदी)",
      "Tamil (தமிழ்)",
      "Telugu (తెలుగు)",
      "Bengali (বাংলা)",
      "Marathi (मராठी)",
      "Gujarati (ગુજરાતી)",
      "Kannada (ಕನ್ನಡ)",
      "Malayalam (മലയാളம்)",
      "Punjabi (ਪੰਜਾਬੀ)"
    ],
  },
  {
    field: "ageGroup",
    question: "First, how old are you?",
    chips: ["Under 18", "18–25", "26–35", "36–50", "51–60", "60+"],
  },
  {
    field: "gender",
    question: "Got it! What is your gender?",
    chips: ["Male", "Female", "Transgender", "Prefer not to say"],
  },
  {
    field: "state",
    question: "Which State or Union Territory do you reside in?",
    chips: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
      "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
      "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
      "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
      "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman & Nicobar", "Andaman & Nicobar Islands",
      "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu", "Delhi", "Jammu & Kashmir", 
      "Ladakh", "Lakshadweep", "Puducherry"
    ],
  },
  {
    field: "income",
    question: "What is your approximate annual household income?",
    chips: ["Below ₹1L", "₹1–3L", "₹3–6L", "₹6–10L", "Above ₹10L"],
  },
  {
    field: "occupation",
    question: "What is your current occupation?",
    chips: ["Student", "Farmer", "Self-Employed", "Salaried", "Business Owner", "Homemaker", "Unemployed"],
  },
  {
    field: "education",
    question: "What is your highest level of education?",
    chips: ["No Formal Education", "Primary", "Secondary", "Diploma", "Graduate", "Post-Graduate"],
  },
  {
    field: "category",
    question: "Which social category do you belong to?",
    chips: ["General", "OBC", "SC", "ST", "EWS", "Differently Abled"],
  },
  {
    field: "businessType",
    question: "What type of business do you run or operate?",
    chips: ["Micro", "Small", "Medium", "Not Applicable"],
    skipIf: (answers) => answers.occupation !== "Self-Employed" && answers.occupation !== "Business Owner",
    skipValue: "Not Applicable",
  }
];

/* ─────────────────────────────────────────────
   Framer Motion animations
───────────────────────────────────────────── */

const messageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const profileCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────────
   Conversational component
───────────────────────────────────────────── */

export default function EligibilityChat() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<UserProfile>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedChip, setSelectedChip] = useState<string>("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentStep = steps[currentStepIndex];

  // Initialize Chat
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang) {
      setAnswers({ language: savedLang });
      setCurrentStepIndex(1);
      
      let greet = "Welcome! Let's find government schemes that are perfect for you.";
      if (savedLang.includes("Hindi")) greet = "नमस्ते! आइए आपके लिए योजनाएं खोजें। 😊";
      else if (savedLang.includes("Tamil")) greet = "வணக்கம்! உங்களுக்கான திட்டங்களைக் கண்டறியலாம். 😊";
      else if (savedLang.includes("Telugu")) greet = "నమస్కారం! మీ కోసం ప్రభుత్వ పథకాలను కనుగొందాం. 😊";
      else if (savedLang.includes("Bengali")) greet = "নমস্কার! আসুন আপনার জন্য সরকারি প্রকল্পগুলি খুঁজি। 😊";
      else if (savedLang.includes("Marathi")) greet = "नमस्कार! तुमच्यासाठी शासकीय योजना शोधूया. 😊";
      else if (savedLang.includes("Gujarati")) greet = "નમસ્તે! ચાલો તમારા માટે સરકારી યોજનાઓ શોધીએ. 😊";
      else if (savedLang.includes("Kannada")) greet = "ನಮಸ್ಕಾರ! ನಿಮಗಾಗಿ ಸೂಕ್ತವಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕೋಣ. 😊";
      else if (savedLang.includes("Malayalam")) greet = "നമസ്കാരം! നിങ്ങൾക്കായുള്ള സർക്കാർ പദ്ധതികൾ കണ്ടെത്താം. 😊";
      else if (savedLang.includes("Punjabi")) greet = "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਆਓ ਤੁਹਾਡੇ ਲਈ ਯੋਜನಾਵਾਂ ਲੱਭੀਏ। 😊";

      setMessages([
        {
          id: "init-1",
          role: "ai",
          text: "Hi! I'm SchemeMate AI 👋",
        },
        {
          id: "init-lang-ack",
          role: "ai",
          text: `${greet} (Language: ${savedLang})`,
        },
        {
          id: "init-2",
          role: "ai",
          text: steps[1].question,
        },
      ]);
    } else {
      setMessages([
        {
          id: "init-1",
          role: "ai",
          text: "Hi! I'm SchemeMate AI 👋 Let me find government schemes that are perfect for you.",
        },
        {
          id: "init-2",
          role: "ai",
          text: steps[0].question,
        },
      ]);
    }
  }, []);

  // Scroll to bottom whenever messages list grows
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle Step progression
  const handleNextStep = (answerText: string) => {
    if (!answerText) return;

    // Add user response to message list
    const newAnswers = { ...answers, [currentStep.field]: answerText };
    setAnswers(newAnswers);

    const userMessage: ChatMessage = {
      id: `user-${currentStepIndex}-${Date.now()}`,
      role: "user",
      text: answerText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setSelectedChip("");
    setIsTyping(true);

    // AI thinking delay
    setTimeout(() => {
      setIsTyping(false);
      let nextStepIndex = currentStepIndex + 1;

      // Check if we need to skip the next step
      while (nextStepIndex < steps.length) {
        const nextStep = steps[nextStepIndex];
        if (nextStep.skipIf && nextStep.skipIf(newAnswers)) {
          // Add default skip answer
          newAnswers[nextStep.field] = nextStep.skipValue || "";
          setAnswers((prev) => ({ ...prev, [nextStep.field]: nextStep.skipValue }));
          nextStepIndex++;
        } else {
          break;
        }
      }

      if (nextStepIndex < steps.length) {
        setCurrentStepIndex(nextStepIndex);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${nextStepIndex}-${Date.now()}`,
            role: "ai",
            text: steps[nextStepIndex].question,
          },
        ]);
      } else {
        setIsComplete(true);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-complete-${Date.now()}`,
            role: "ai",
            text: "🎉 That's all the info I need! I have generated your personalized scheme eligibility profile.",
          },
        ]);
      }
    }, 600);
  };

  const handleStartOver = () => {
    setCurrentStepIndex(0);
    setAnswers({});
    setSelectedChip("");
    setIsComplete(false);
    setShowResults(false);
    setMessages([
      {
        id: `ai-reset-1-${Date.now()}`,
        role: "ai",
        text: "Let's start over! I'll guide you through finding schemes that match your profile. 😊",
      },
      {
        id: `ai-reset-2-${Date.now()}`,
        role: "ai",
        text: steps[0].question,
      },
    ]);
  };

  // Mock score calculation based on profile features
  const getMockSchemeCount = () => {
    let base = 25;
    if (answers.income === "Below ₹1L") base += 45;
    else if (answers.income === "₹1–3L") base += 30;
    else if (answers.income === "₹3–6L") base += 15;

    if (answers.occupation === "Farmer") base += 35;
    else if (answers.occupation === "Student") base += 20;
    else if (answers.occupation === "Unemployed") base += 25;
    else if (answers.occupation === "Self-Employed" || answers.occupation === "Business Owner") base += 15;

    if (answers.category !== "General") base += 20;
    if (answers.state === "Maharashtra" || answers.state === "Uttar Pradesh" || answers.state === "Tamil Nadu") base += 10;

    return base;
  };

  const progressPercentage = isComplete ? 100 : Math.round((currentStepIndex / steps.length) * 100);

  if (showResults) {
    return (
      <div className="space-y-6 w-full max-w-4xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-2xl shadow-md gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-[#2563EB]" aria-hidden="true">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h2 className="text-base font-extrabold text-[#0F172A] dark:text-white">Scheme Eligibility Results</h2>
              <p className="text-xs text-gray-500">Based on your dynamic profile credentials</p>
            </div>
          </div>
          <button
            onClick={() => setShowResults(false)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            ← Back to Chat Profile
          </button>
        </div>
        <RecommendationCards userProfile={answers} />
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col h-[80vh] max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden my-4 sm:my-8">
        
        {/* Progress header bar */}
        <div className="px-6 py-4 border-b border-gray-50 dark:border-slate-800 bg-gray-50/40 dark:bg-slate-950/20 flex-none">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {isComplete ? "Profile Completed" : `Step ${currentStepIndex + 1} of ${steps.length} — ${currentStep.field}`}
            </span>
            <span className="text-xs font-extrabold text-[#2563EB]">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
            <motion.div 
              className="h-full bg-[#2563EB]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Scrollable chat thread */}
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-white dark:bg-slate-900"
          aria-live="polite"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className={`flex items-start gap-3 max-w-[85%] ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar for AI */}
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center shrink-0 text-[#2563EB]" aria-hidden="true">
                  <Compass className="w-4.5 h-4.5" />
                </div>
              )}

              {/* Message text bubble */}
              <div
                className={`p-3.5 px-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#2563EB] text-white rounded-tr-sm"
                    : "bg-gray-100 dark:bg-slate-800 text-[#0F172A] dark:text-gray-100 rounded-tl-sm border border-gray-200/40 dark:border-slate-700/50"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Shimmer Skeleton typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center shrink-0 text-[#2563EB]" aria-hidden="true">
                <Compass className="w-4.5 h-4.5" />
              </div>
              <div className="p-3.5 px-4 bg-gray-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm border border-gray-200/40 dark:border-slate-700/50 w-48 space-y-2 animate-pulse">
                <div className="h-3.5 bg-gray-200 dark:bg-slate-700 rounded-full w-3/4" />
                <div className="h-3.5 bg-gray-200 dark:bg-slate-700 rounded-full w-5/6" />
              </div>
            </div>
          )}

          {/* Profile summary card */}
          {isComplete && (
            <motion.div
              variants={profileCardVariants}
              initial="hidden"
              animate="visible"
              className="mt-6"
            >
              <div className="brand-card p-6 border-t-4 border-t-[#2563EB] bg-white dark:bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/40 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-lg font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  Your Profile is Ready!
                </h3>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-sm border-b border-gray-100 dark:border-slate-855 pb-5 mb-5">
                  <div>
                    <span className="text-gray-400 text-xs font-semibold block uppercase tracking-wider">Preferred Language</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{answers.language}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs font-semibold block uppercase tracking-wider">Age Group</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{answers.ageGroup}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs font-semibold block uppercase tracking-wider">Gender</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{answers.gender}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400 text-xs font-semibold block uppercase tracking-wider">State / UT</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{answers.state}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs font-semibold block uppercase tracking-wider">Annual Income</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{answers.income}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs font-semibold block uppercase tracking-wider">Occupation</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{answers.occupation}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs font-semibold block uppercase tracking-wider">Education Level</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{answers.education}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs font-semibold block uppercase tracking-wider">Category</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{answers.category}</span>
                  </div>
                  {answers.businessType && answers.businessType !== "Not Applicable" && (
                    <div>
                      <span className="text-gray-400 text-xs font-semibold block uppercase tracking-wider">Business Type</span>
                      <span className="font-bold text-[#0F172A] dark:text-white">{answers.businessType}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100/50 dark:border-blue-900/30 text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                  Based on your profile details, you may qualify for approximately{" "}
                  <strong className="text-[#2563EB] text-base">{getMockSchemeCount()}+</strong> active government schemes.
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowResults(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                  >
                    Check My Schemes
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleStartOver}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Start Over
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Panel (Chips selection) */}
        <div className="border-t border-gray-100 dark:border-slate-800 p-4 bg-gray-50/50 dark:bg-slate-950/30 flex-none">
          {!isComplete ? (
            <div className="space-y-4">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                Select your answer below
              </span>

              {/* Chips container */}
              <div 
                role="group"
                aria-label={`Options for ${currentStep.field}`}
                className={`flex flex-wrap gap-2 justify-center ${
                  currentStep.field === "state" ? "max-h-36 overflow-y-auto p-1 border border-gray-100 dark:border-slate-800 rounded-xl bg-white/70 dark:bg-slate-900/70" : ""
                }`}
              >
                {currentStep.chips.map((chip) => {
                  const isSelected = selectedChip === chip;
                  return (
                    <button
                      key={chip}
                      onClick={() => setSelectedChip(chip)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all select-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 ${
                        isSelected
                          ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/10 scale-[1.02]"
                          : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              {/* Confirm submit button */}
              <button
                disabled={!selectedChip}
                onClick={() => handleNextStep(selectedChip)}
                className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  selectedChip
                    ? "bg-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 cursor-pointer"
                    : "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                }`}
              >
                Confirm Selection
                <Send className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center text-xs text-gray-400 py-2">
              Conversational wizard complete. Scroll up to review your outputs.
            </div>
          )}
        </div>
      </div>
    </LazyMotion>
  );
}
