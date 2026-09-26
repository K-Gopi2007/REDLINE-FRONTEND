import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'critical';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-3 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99]";
    
    const variants = {
      primary: "bg-accent-primary text-white hover:bg-accent-deep focus:ring-accent-muted-tint",
      ghost: "bg-transparent hover:bg-accent-pale-wash text-accent-primary border border-accent-muted-tint",
      critical: "bg-transparent text-risk-high-text border border-risk-high-outline hover:bg-risk-high-surface"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg" // For hero CTAs
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
