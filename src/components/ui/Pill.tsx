import React from 'react';
import { cn } from './Button';

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  active?: boolean;
}

export function Pill({ children, active, className, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-label-sm uppercase font-semibold border transition-colors",
        active 
          ? "bg-accent-primary text-white border-transparent" 
          : "bg-transparent text-ink-subdued border-accent-muted-tint",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
