import { useAppContext } from '../../context/AppContext';
import { Button } from '../ui/Button';

export default function RiskDigestModal() {
  const { isRiskDigestModalOpen, closeRiskDigestModal } = useAppContext();

  if (!isRiskDigestModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink-heavy/35"
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={closeRiskDigestModal}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{ boxShadow: '0 20px 32px -8px rgba(31,36,33,0.12)' }}
      >
        <div className="flex flex-col p-8 bg-surface-bright border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[18px]">article</span>
              </div>
              <span className="font-bold tracking-tight text-lg text-ink-heavy">REDLINE</span>
            </div>
            <button onClick={closeRiskDigestModal} className="text-ink-subdued hover:text-ink-heavy">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <h1 className="text-headline-md mb-1">Independent Contractor Agreement</h1>
          <p className="text-body-md text-ink-subdued">Zenith Digital Inc. · Reviewed Today, 11:24 AM</p>
        </div>

        <div className="p-8 overflow-y-auto">
          {/* Summary Stats */}
          <div className="flex items-center gap-8 mb-8">
            <div>
              <div className="text-label-sm uppercase text-ink-subdued mb-1">Clauses Reviewed</div>
              <div className="text-headline-md">34</div>
            </div>
            <div>
              <div className="text-label-sm uppercase text-ink-subdued mb-1">Risk Profile</div>
              <div className="flex items-center gap-2 text-body-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-risk-high-text"></span> 2 High
                <span className="w-2 h-2 rounded-full bg-risk-medium-text ml-2"></span> 2 Med
                <span className="w-2 h-2 rounded-full bg-risk-low-text ml-2"></span> 1 Low
              </div>
            </div>
            <div>
              <div className="text-label-sm uppercase text-ink-subdued mb-1">Contract Health Score</div>
              <div className="text-headline-md text-accent-primary">84/100</div>
            </div>
          </div>

          {/* Dollar Impact */}
          <div className="bg-accent-deep text-white rounded-xl p-6 mb-8 flex items-center justify-between">
            <div>
              <div className="text-display">$85,000</div>
              <div className="text-body-sm text-accent-muted-tint mt-1">Estimated Potential Liability Reduction</div>
            </div>
            <span className="material-symbols-outlined text-4xl text-accent-primary">shield</span>
          </div>

          {/* What Changed */}
          <h3 className="text-headline-sm mb-4">What changed</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-risk-high-text mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-body-md block mb-1">Sec 8.2 Indemnity Ceiling — Uncapped</strong>
                <p className="text-body-sm text-ink-subdued">As written, the clause created unlimited financial exposure for your freelance studio. Replaced with a mutual fixed liability ceiling for both parties.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-risk-high-text mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-body-md block mb-1">Sec 7.3 Intellectual Property Assignment</strong>
                <p className="text-body-sm text-ink-subdued">The client owned your design files before they paid you. Updated to ensure rights transfer only upon final payment.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-risk-medium-text mt-2 flex-shrink-0"></span>
              <div>
                <strong className="text-body-md block mb-1">Sec 4.1 Invoicing and Payment Terms</strong>
                <p className="text-body-sm text-ink-subdued">Net 60 payment interval creates unacceptable cash flow risk. Amended to Net 15 business days with a 1.5% late fee.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-surface-bright">
          <Button variant="ghost">Copy Share Link</Button>
          <Button variant="primary">Download PDF</Button>
        </div>
      </div>
    </div>
  );
}
