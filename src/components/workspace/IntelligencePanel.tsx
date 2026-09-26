
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldAlert, Target, ArrowUp, Loader2 } from 'lucide-react';

interface IntelligencePanelProps {
  status: string;
  riskData: any;
  negotiateData: any;
  explainData: any;
  explanationPrompt: string;
  setExplanationPrompt: (val: string) => void;
  isExplaining: boolean;
  handleExplain: () => void;
  errorMsg: string | null;
}

export function IntelligencePanel({
  status,
  riskData,
  negotiateData,
  explainData,
  explanationPrompt,
  setExplanationPrompt,
  isExplaining,
  handleExplain,
  errorMsg
}: IntelligencePanelProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-white/60 backdrop-blur-2xl relative">
      <div className="h-14 flex items-center px-6 border-b border-white/40 bg-white/30 backdrop-blur-md flex-shrink-0 z-10">
        <h2 className="text-sm font-semibold text-ink-heavy flex items-center gap-2">
          <Sparkles size={16} className="text-accent-primary" />
          Intelligence Panel
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide pb-32">
        <AnimatePresence>
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50/80 backdrop-blur-md text-red-600 p-4 rounded-xl border border-red-100 shadow-sm"
            >
              {errorMsg}
            </motion.div>
          )}

          {riskData && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink-subdued uppercase tracking-widest">
                <ShieldAlert size={14} className="text-risk-high-text" />
                Risk Analysis
              </div>
              <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="bg-risk-high-surface/50 border border-risk-high-outline/50 p-4 rounded-xl flex gap-3 mb-4">
                  <div>
                    <div className="font-bold text-xs text-risk-high-text uppercase tracking-widest mb-1">
                      Risk Score: {riskData.risk_score || riskData.score || 'Unknown'}
                    </div>
                  </div>
                </div>
                
                {riskData.high_risk_clauses?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-ink-heavy">High Risk Clauses</h4>
                    <ul className="space-y-2">
                      {riskData.high_risk_clauses.map((c: any, i: number) => (
                        <li key={i} className="text-xs text-ink-body bg-gray-50/50 p-2 rounded-lg border border-gray-100">
                          {typeof c === 'string' ? c : (c.text || c.name || JSON.stringify(c))}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {negotiateData && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink-subdued uppercase tracking-widest">
                <Target size={14} className="text-accent-primary" />
                Negotiation Strategy
              </div>
              <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
                <div className="text-sm text-ink-body leading-relaxed">
                  {typeof negotiateData.strategy === 'string' ? negotiateData.strategy : (negotiateData.points?.join(', ') || 'Strategy generated.')}
                </div>
                {negotiateData.suggested_edits?.length > 0 && (
                  <div className="space-y-3">
                    {negotiateData.suggested_edits.map((edit: any, idx: number) => (
                      <div key={idx} className="border border-accent-pale-wash bg-surface-bright/50 rounded-xl p-3">
                        <div className="text-xs font-semibold uppercase tracking-wider text-ink-subdued mb-2">Suggested Edit</div>
                        <div className="text-sm space-y-2">
                          {edit.original && <div className="bg-risk-high-surface/50 text-risk-high-text line-through p-2 rounded-md">{edit.original}</div>}
                          {edit.proposed && <div className="bg-risk-low-surface/50 text-risk-low-text p-2 rounded-md font-medium">{edit.proposed}</div>}
                          {typeof edit === 'string' && <div>{edit}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {explainData && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink-subdued uppercase tracking-widest">
                <Sparkles size={14} className="text-accent-primary" />
                Explanation
              </div>
              <div className="bg-gradient-to-br from-accent-primary/5 to-accent-primary/10 border border-accent-primary/10 p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="text-sm text-ink-body leading-relaxed">
                  {typeof explainData.explanation === 'string' ? explainData.explanation : JSON.stringify(explainData)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Input Floating */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/80 backdrop-blur-2xl border border-white shadow-[0_12px_40px_rgb(0,0,0,0.08)] rounded-2xl p-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-accent-primary/30 transition-all">
          <input 
            type="text" 
            placeholder="Ask AI to explain any clause..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-ink-body placeholder-ink-subdued/50 px-3 py-2"
            value={explanationPrompt}
            onChange={(e) => setExplanationPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExplain()}
            disabled={isExplaining || status === 'idle'}
          />
          <button 
            className="w-10 h-10 rounded-xl bg-accent-primary hover:bg-accent-deep text-white flex items-center justify-center transition-colors shadow-sm disabled:opacity-50 flex-shrink-0"
            onClick={handleExplain}
            disabled={isExplaining || !explanationPrompt.trim() || status === 'idle'}
          >
            {isExplaining ? <Loader2 size={16} className="animate-spin" /> : <ArrowUp size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
