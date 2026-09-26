import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import { RiskChip } from '../components/ui/RiskChip';
import { PaperSheet } from '../components/ui/PaperSheet';
import { useAppContext } from '../context/AppContext';

export default function Documents() {
  const { openRiskDigestModal } = useAppContext();

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-73px)]">
      {/* Header Bar */}
      <div className="px-6 py-4 border-b border-gray-100 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0 z-10" style={{ boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04)' }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-surface-container-low rounded-xl flex items-center justify-center text-accent-primary">
            <span className="material-symbols-outlined">description</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-headline-sm text-ink-heavy">Independent Contractor Agreement</h1>
              <span className="text-label-sm text-ink-subdued">— Zenith Digital Inc.</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider font-semibold">
              <span className="bg-surface-container-high text-ink-subdued px-2 py-0.5 rounded">v2 Redline</span>
              <span className="text-ink-subdued">Original (Draft 1.0)</span>
              <span className="text-ink-subdued flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">schedule</span> 14 mins ago</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3 text-label-sm font-semibold border-r border-gray-200 pr-4">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-ink-subdued"></span> All Flags 5</span>
            <span className="flex items-center gap-1.5 text-risk-high-text"><span className="w-1.5 h-1.5 rounded-full bg-risk-high-text"></span> High Risk 2</span>
            <span className="flex items-center gap-1.5 text-risk-medium-text"><span className="w-1.5 h-1.5 rounded-full bg-risk-medium-text"></span> Medium 2</span>
            <span className="flex items-center gap-1.5 text-risk-low-text"><span className="w-1.5 h-1.5 rounded-full bg-risk-low-text"></span> Low 1</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden lg:inline-flex text-risk-low-text border-risk-low-outline hover:bg-risk-low-surface">✓ Accept Safe Edits</Button>
            <Button variant="ghost" size="sm" onClick={openRiskDigestModal}>⬇ Export Digest</Button>
            <Button variant="ghost" size="sm">⬇ Redlined DOCX</Button>
            <Button variant="primary" size="sm" className="bg-accent-deep hover:bg-ink-heavy">▷ Send Counter-Draft</Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative bg-canvas-ground">
        {/* Left: Document Sheet (Fluid) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
          <PaperSheet className="w-full max-w-[820px] p-10 md:p-16 min-h-[1056px] relative">
            <div className="absolute top-8 right-8 text-[10px] font-bold uppercase tracking-widest text-accent-primary bg-accent-faint-wash px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">shield</span> Verified Agent Redline
            </div>

            <div className="text-center mb-12">
              <div className="text-[10px] text-ink-subdued font-bold uppercase tracking-widest mb-4">STANDARD PROFESSIONAL SERVICES CONTRACT</div>
              <h2 className="text-headline-md font-serif text-ink-heavy underline underline-offset-8 decoration-1">SCHEDULE A: INTELLECTUAL PROPERTY & PAYMENT TERMS</h2>
            </div>

            <div className="text-legal-contract text-ink-body space-y-8">
              <p>
                This Schedule A amends and modifies the Master Services Agreement executed between <strong>Zenith Digital Inc.</strong> ("Client") and <strong>Studio North Operations LLC</strong> ("Contractor"). Bold underlined sections indicate Redline Agent revisions; struck out segments indicate flagged vendor clauses.
              </p>

              {/* Clause 4.1 */}
              <div className="relative group">
                <div className="absolute -left-16 top-0 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                  <RiskChip level="medium" label="⚠ Net 60 Late Payment Risk" className="text-[9px] h-5 py-0 px-2" />
                </div>
                <h3 className="font-bold mb-2">Clause 4.1 — Invoicing and Payment Terms</h3>
                <p className="leading-loose">
                  <span className="bg-risk-high-surface text-risk-high-text line-through mr-1">Net 60 (sixty) calendar days</span>
                  <span className="bg-risk-low-surface text-risk-low-text underline decoration-2 underline-offset-4 font-medium mr-1">Net 15 (fifteen) business days, with an accrued 1.5% monthly late finance fee on outstanding balances</span>
                  from receipt of formal statement. Should payment remain delinquent past thirty (30) days, Contractor reserves unconditional entitlement to pause active deliverables.
                </p>
              </div>

              {/* Clause 7.3 */}
              <div className="relative group bg-risk-high-surface/30 -mx-4 px-4 py-3 rounded-lg border border-risk-high-outline/50 shadow-sm cursor-pointer">
                <div className="absolute -left-16 top-3 hidden lg:flex flex-col gap-1 items-end">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-ink-subdued bg-white px-2 py-0.5 rounded shadow-sm border border-gray-200">ACTIVE INSPECTION</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold flex items-center gap-2">Clause 7.3 — Ownership of Inventions & Work Product <RiskChip level="high" label="HIGH RISK: Pre-Payment Transfer" className="text-[9px] h-5 py-0 px-2 ml-2" /></h3>
                </div>
                <p className="leading-loose">
                  All original work product, proprietary designs, source code, visual design assets, and patentable inventions developed under this Agreement 
                  <span className="bg-risk-low-surface text-risk-low-text underline decoration-2 underline-offset-4 font-medium mx-1">shall become the sole and exclusive property of Client immediately upon creation, regardless of invoicing status or milestone approval.</span>
                  Contractor hereby waives any moral rights or withholding liens arising out of unpaid work stages.
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-risk-high-outline/30 pt-2 text-[10px] font-bold uppercase tracking-wider text-risk-high-text">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">flag</span> Flagged for immediate counter-proposal</span>
                  <span className="flex items-center gap-1 cursor-pointer hover:underline">Review Suggestion &rarr;</span>
                </div>
              </div>

              {/* Clause 8.2 */}
              <div className="relative group">
                <div className="absolute -left-16 top-0 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                  <RiskChip level="high" label="HIGH RISK: One-Sided Indemnity" className="text-[9px] h-5 py-0 px-2" />
                </div>
                <h3 className="font-bold mb-2">Clause 8.2 — Indemnification & Liability Cap</h3>
                <p className="leading-loose bg-risk-high-surface text-risk-high-text line-through p-1 rounded mb-2">
                  Contractor agrees to defend, indemnify, and hold harmless Client and its affiliates against any and all claims, unlimited damages, legal fees, and operational losses arising directly or indirectly from Contractor's deliverables.
                </p>
                <p className="leading-loose bg-risk-low-surface text-risk-low-text underline decoration-2 underline-offset-4 p-1 rounded font-medium">
                  Each party agrees to mutually defend, indemnify, and hold harmless the other from third-party claims resulting solely from gross negligence or willful misconduct. In no event shall either party's cumulative liability under this Agreement exceed the total aggregate fees received by Contractor in the six (6) months preceding the claim.
                </p>
              </div>

              {/* Clause 11.4 */}
              <div className="relative group">
                <div className="absolute -left-16 top-0 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                  <RiskChip level="low" label="✓ SAFE: 50% Kill Fee Secured" className="text-[9px] h-5 py-0 px-2" />
                </div>
                <h3 className="font-bold mb-2">Clause 11.4 — Convenience Termination & Cancellation Fee</h3>
                <p className="leading-loose">
                  In the event that Client elects to terminate this project for convenience prior to completion of the designated scope, Client shall remit payment for all hours worked to date, plus an 
                  <span className="bg-risk-low-surface text-risk-low-text underline decoration-2 underline-offset-4 font-medium mx-1">equitable cancellation kill fee equivalent to 50% of the remaining contract balance</span>
                  to compensate for reserved studio capacity and foregone opportunities.
                </p>
              </div>
            </div>
            
            {/* Bottom Bar on PaperSheet */}
            <div className="absolute bottom-0 left-0 right-0 bg-surface-container-low border-t border-gray-200 p-4 rounded-b-2xl flex items-center justify-between text-body-sm">
              <div className="font-medium text-ink-body">EXECUTION READINESS — 3 recommended amendments remain unapplied.</div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="bg-white">Compare Diff</Button>
                <Button variant="primary" size="sm" className="bg-accent-deep hover:bg-ink-heavy">Lock Redline Draft</Button>
              </div>
            </div>
          </PaperSheet>
        </div>

        {/* Right: Agent Inspector Panel (Fixed) */}
        <div className="w-full md:w-[380px] bg-white border-l border-gray-200 overflow-y-auto flex flex-col flex-shrink-0" style={{ boxShadow: '-4px 0 16px -4px rgba(31,36,33,0.04)' }}>
          <div className="p-6 pb-4 border-b border-gray-100 bg-surface-bright sticky top-0 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-label-sm font-bold tracking-widest text-ink-heavy">
              <span className="material-symbols-outlined text-[18px]">plumbing</span> AGENT INSPECTOR
            </div>
            <Pill className="text-[10px] bg-risk-high-surface text-risk-high-text border-transparent h-5 py-0 px-2 flex items-center gap-1">
              <span>❗ High Risk</span>
            </Pill>
          </div>
          
          <div className="p-6 space-y-6">
            <h2 className="text-headline-sm text-ink-heavy">Clause 7.3: Intellectual Property Assignment</h2>
            
            {/* Plain-language breakdown */}
            <div className="border border-risk-high-outline/50 bg-risk-high-surface/30 rounded-xl p-4 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-risk-high-text mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lightbulb</span> PLAIN-LANGUAGE BREAKDOWN
              </div>
              <p className="text-body-sm text-ink-body leading-relaxed">
                As written, the client owns your design files and source code before they pay you. If they dispute or cancel unilaterally, you surrender all commercial leverage.
              </p>
            </div>

            {/* Suggested Safe Replacement */}
            <div className="border border-accent-pale-wash bg-accent-faint-wash rounded-xl p-4 shadow-sm relative">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-accent-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">build</span> SUGGESTED SAFE REPLACEMENT
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-primary bg-white px-2 py-0.5 rounded shadow-sm">Market Standard (98%)</span>
              </div>
              <div className="bg-white border border-accent-muted-tint p-3 rounded-lg text-legal-contract text-ink-body mb-4 leading-relaxed">
                <span className="font-semibold underline decoration-accent-primary underline-offset-2">Transfer upon full and final payment:</span> All assigned rights, titles, and intellectual properties shall vest in Client only upon Contractor's receipt of payment in full for the corresponding billing phase.
              </div>
              
              <div className="flex flex-col gap-2">
                <Button variant="primary" className="w-full">✓ Apply Suggested Clause</Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" className="bg-white">✏ Customize</Button>
                  <Button variant="ghost" className="bg-white">✕ Dismiss</Button>
                </div>
              </div>
            </div>

            {/* Client counter-note script */}
            <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-body flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">mail</span> CLIENT COUNTER-NOTE SCRIPT
                </div>
                <button className="text-label-sm font-semibold text-accent-primary hover:underline">Copy</button>
              </div>
              <p className="text-body-sm italic text-ink-subdued leading-relaxed bg-surface-container-low p-3 rounded-lg">
                "Hey Sarah, our standard studio policy keeps final IP transfer tied directly to final invoice payment. Happy to update Section 7.3 to vest rights immediately once settlement is confirmed!"
              </p>
            </div>

            {/* Contract Health Score */}
            <div className="bg-surface-bright border border-gray-200 rounded-xl p-6 text-center mt-8">
              <div className="text-[10px] font-bold uppercase tracking-wider text-ink-subdued mb-2">CONTRACT HEALTH SCORE</div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="text-display text-accent-primary">84<span className="text-headline-md text-ink-subdued">/100</span></div>
                <Pill className="text-[10px] bg-accent-faint-wash text-accent-primary border-transparent font-bold tracking-wider">+18 pts vs Draft 1</Pill>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden flex mb-3">
                <div className="bg-risk-low-text h-full" style={{ width: '70%' }}></div>
                <div className="bg-risk-medium-text h-full" style={{ width: '20%' }}></div>
                <div className="bg-risk-high-text h-full" style={{ width: '10%' }}></div>
              </div>
              <div className="text-label-sm font-semibold text-ink-subdued flex justify-center gap-3">
                <span className="text-risk-low-text">Safe: 14 terms</span>
                <span className="text-risk-medium-text">Amended: 4 terms</span>
                <span className="text-risk-high-text">Critical: 2 terms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
