import React from 'react';
import { cn } from './Button';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl", // 24px radius
        className
      )}
      style={{
        background: 'rgba(255,255,255,0.70)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.65)',
        boxShadow: 'inset 0 1px 1px 0 rgba(255,255,255,0.8)'
      }}
      {...props}
    >
      {children}
    </div>
  );
}
