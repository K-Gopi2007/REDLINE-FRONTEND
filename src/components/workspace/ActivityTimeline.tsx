
import { motion } from 'framer-motion';
import { Check, Loader2, AlertTriangle, Circle } from 'lucide-react';
import { Pill } from '../ui/Pill';

export interface PipelineStep {
  id: string;
  status: 'idle' | 'active' | 'done' | 'error';
  title: string;
  description: string;
  riskPill?: boolean;
}

export function ActivityTimeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <div className="flex flex-col h-full bg-white/40 backdrop-blur-xl border-r border-white/20">
      <div className="h-14 flex items-center px-6 border-b border-white/40 bg-white/30 backdrop-blur-md flex-shrink-0">
        <h2 className="text-sm font-semibold text-ink-heavy flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
          Live Agent Pipeline
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-accent-primary/20 via-gray-200 to-transparent" />
          
          <div className="space-y-8 relative">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 relative"
              >
                <div className="relative z-10 bg-white/50 p-1 rounded-full backdrop-blur-sm mt-0.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm border ${
                    step.status === 'done' ? 'bg-accent-primary border-accent-primary text-white' :
                    step.status === 'active' ? 'bg-white border-accent-primary text-accent-primary' :
                    step.status === 'error' ? 'bg-risk-high-surface border-risk-high-outline text-risk-high-text' :
                    'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    {step.status === 'done' && <Check size={12} strokeWidth={3} />}
                    {step.status === 'active' && <Loader2 size={12} className="animate-spin" />}
                    {step.status === 'error' && <AlertTriangle size={12} />}
                    {step.status === 'idle' && <Circle size={8} className="fill-current" />}
                  </div>
                </div>
                
                <div className="flex-1 pb-2">
                  <div className="flex flex-col mb-1">
                    <span className={`text-sm font-semibold ${step.status === 'active' ? 'text-accent-primary' : 'text-ink-heavy'}`}>
                      {step.title}
                    </span>
                    {step.riskPill && (
                      <Pill className="text-[10px] bg-risk-high-surface text-risk-high-text border-transparent h-5 py-0 px-2 mt-1 w-fit">
                        High Risk Found
                      </Pill>
                    )}
                  </div>
                  <p className="text-xs text-ink-subdued leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
