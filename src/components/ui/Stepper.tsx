import React from 'react';
import { cn } from './Button';

export interface Step {
  id: string;
  status: 'done' | 'active' | 'pending' | 'warning';
  title: string;
  time?: string;
  description: React.ReactNode;
  tags?: string[];
  pill?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  className?: string;
}

export function Stepper({ steps, className }: StepperProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {steps.map((step, idx) => (
        <div key={step.id} className="relative flex pb-6 last:pb-0">
          {/* Vertical Line */}
          {idx !== steps.length - 1 && (
            <div className="absolute left-3 top-7 bottom-0 w-px bg-gray-200" />
          )}
          
          {/* Icon */}
          <div className="relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-surface-variant z-10 mt-0.5">
            {step.status === 'done' && <span className="material-symbols-outlined text-[14px] text-accent-primary">check</span>}
            {step.status === 'active' && <span className="material-symbols-outlined text-[14px] text-accent-primary animate-spin">sync</span>}
            {step.status === 'warning' && <span className="material-symbols-outlined text-[14px] text-risk-high-text">warning</span>}
            {step.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />}
          </div>
          
          {/* Content */}
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-body-sm">{step.title}</span>
                {step.time && <span className="text-label-sm text-ink-subdued">{step.time}</span>}
              </div>
              {step.pill}
            </div>
            <div className="mt-1 text-body-sm text-ink-subdued leading-relaxed">
              {step.description}
            </div>
            {step.tags && step.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {step.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold bg-gray-100 text-ink-subdued px-2 py-0.5 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
