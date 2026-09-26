import React from 'react';
import { cn } from './Button';

interface RiskChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  level: 'low' | 'medium' | 'high' | 'neutral';
  label: string;
}

export function RiskChip({ level, label, className, ...props }: RiskChipProps) {
  const styles = {
    low: "bg-risk-low-surface text-risk-low-text border-risk-low-outline",
    medium: "bg-risk-medium-surface text-risk-medium-text border-risk-medium-outline",
    high: "bg-risk-high-surface text-risk-high-text border-risk-high-outline",
    neutral: "bg-surface-variant text-on-surface-variant border-outline-variant"
  };

  const dotColors = {
    low: "bg-risk-low-text",
    medium: "bg-risk-medium-text",
    high: "bg-risk-high-text",
    neutral: "bg-on-surface-variant"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center h-6 px-3 rounded-full text-label-sm uppercase font-semibold border",
        styles[level],
        className
      )}
      {...props}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full mr-2", dotColors[level])} />
      {label}
    </span>
  );
}
