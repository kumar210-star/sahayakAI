import React from "react";
import { Inbox, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="brand-card py-16 px-6 border border-gray-150 dark:border-slate-800/85 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center space-y-4 w-full">
      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-slate-850 text-[#2563EB] flex items-center justify-center" aria-hidden="true">
        <Icon className="w-8 h-8 shrink-0" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white leading-tight">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
