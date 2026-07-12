import React from "react";
import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function SkeletonLine({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("h-4 bg-gray-200 dark:bg-slate-800 rounded-lg animate-pulse w-full", className)}
      {...props}
    />
  );
}

export function SkeletonCircle({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-800 animate-pulse shrink-0", className)}
      {...props}
    />
  );
}

export function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "p-6 border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 rounded-3xl space-y-4 shadow-sm animate-pulse w-full",
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-center">
        <SkeletonLine className="w-1/3 h-5" />
        <SkeletonLine className="w-12 h-5 rounded-full" />
      </div>
      <SkeletonLine className="w-5/6 h-4" />
      <SkeletonLine className="w-2/3 h-4" />
      <SkeletonLine className="w-full h-9 rounded-xl mt-4" />
    </div>
  );
}
