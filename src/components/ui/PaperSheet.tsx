import React from 'react';
import { cn } from './Button';

interface PaperSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PaperSheet({ children, className, ...props }: PaperSheetProps) {
  return (
    <div
      className={cn(
        "bg-sheet-surface rounded-2xl border border-gray-200", // 16px radius
        className
      )}
      style={{
        boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04), 0 6px 16px -4px rgba(31,36,33,0.06)'
      }}
      {...props}
    >
      {children}
    </div>
  );
}
