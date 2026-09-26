import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Pill } from '../components/ui/Pill';
import { Stepper } from '../components/ui/Stepper';
import type { Step } from '../components/ui/Stepper';
import { Button } from '../components/ui/Button';
import { apiFetch } from '../api/api';
import { useAppContext } from '../context/AppContext';

export default function Workspace() {
  const [searchParams] = useSearchParams();
  const contractId = searchParams.get('contractId');
  const navigate = useNavigate();
  const { openNewContractModal } = useAppContext();
  
  const [status, setStatus] = useState<'idle' | 'reviewing' | 'analyzing' | 'negotiating' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [reviewData, setReviewData] = useState<any>(null);
  const [riskData, setRiskData] = useState<any>(null);
  const [negotiateData, setNegotiateData] = useState<any>(null);
  const [explainData, setExplainData] = useState<any>(null);
  
  const [explanationPrompt, setExplanationPrompt] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  useEffect(() => {
    if (!contractId) return;

    const runWorkflow = async () => {
      try {
        // Step 1: Review
        setStatus('reviewing');
        const reviewRes = await apiFetch(`/api/v1/contracts/review?contract_id=${contractId}`, {
          method: 'POST'
        });
        if (!reviewRes.ok) {
          let errorMsg = `Failed to review contract (${reviewRes.status}).`;
          try {
            const errData = await reviewRes.json();
            if (errData.detail) errorMsg = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
            else if (errData.message) errorMsg = errData.message;
          } catch (e) {}
          throw new Error(errorMsg);
        }
        const review = await reviewRes.json();
        setReviewData(review);

        // Step 2: Risk Analysis
        setStatus('analyzing');
        const riskRes = await apiFetch(`/api/v1/contracts/analyze-risk?contract_id=${contractId}`, {
          method: 'POST'
        });
        if (!riskRes.ok) {
          let errorMsg = `Risk analysis failed (${riskRes.status}).`;
          try {
            const errData = await riskRes.json();
            if (errData.detail) errorMsg = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
            else if (errData.message) errorMsg = errData.message;
          } catch (e) {}
          throw new Error(errorMsg);
        }
        const risk = await riskRes.json();
        setRiskData(risk);

        // Step 3: Negotiate
        setStatus('negotiating');
        const negRes = await apiFetch(`/api/v1/contracts/negotiate?contract_id=${contractId}`, {
          method: 'POST'
        });
        if (!negRes.ok) {
          let errorMsg = `Negotiation generation failed (${negRes.status}).`;
          try {
            const errData = await negRes.json();
            if (errData.detail) errorMsg = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
            else if (errData.message) errorMsg = errData.message;
          } catch (e) {}
          throw new Error(errorMsg);
        }
        const negotiate = await negRes.json();
        setNegotiateData(negotiate);
        
        setStatus('done');
      } catch (err: any) {
        console.error(err);
        setStatus('error');
        setErrorMsg(err.message || 'Workflow failed.');
      }
    };
    runWorkflow();
  }, [contractId]);

  const handleExplain = async () => {
    if (!contractId || !explanationPrompt.trim()) return;
    setIsExplaining(true);
    try {
      const res = await apiFetch(`/api/v1/contracts/explain?contract_id=${contractId}`, {
        method: 'POST',
        body: JSON.stringify({ query: explanationPrompt })
      });
      if (!res.ok) throw new Error('Explanation failed.');
      const data = await res.json();
      setExplainData(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsExplaining(false);
      setExplanationPrompt('');
    }
  };

  const steps: Step[] = [
    {
      id: '1',
      status: status === 'idle' || status === 'reviewing' ? 'active' : 'done',
      title: 'Contract Review',
      description: status === 'reviewing' ? 'Processing contract...' : (reviewData ? 'Review complete.' : 'Waiting to start...'),
    },
    {
      id: '2',
      status: status === 'analyzing' ? 'active' : (riskData ? 'done' : 'pending'),
      title: 'Risk Assessment',
      pill: riskData && riskData.risk_score === 'high' ? <Pill className="text-[10px] bg-risk-high-surface text-risk-high-text border-transparent h-5 py-0 px-2">High Risk</Pill> : undefined,
      description: status === 'analyzing' ? 'Generating risk report...' : (riskData ? `${riskData.high_risk_clauses?.length || 0} high-risk clauses found.` : ''),
    },
    {
      id: '3',
      status: status === 'negotiating' ? 'active' : (negotiateData ? 'done' : 'pending'),
      title: 'Negotiation Strategy',
      description: status === 'negotiating' ? 'Building negotiation strategy...' : (negotiateData ? 'Strategy built.' : ''),
    }
  ];

  if (!contractId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-73px)] text-center p-6 bg-surface-bright">
        <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center text-ink-subdued mb-4">
          <span className="material-symbols-outlined text-3xl">description</span>
        </div>
        <h2 className="text-headline-sm font-semibold mb-2">No Contract Selected</h2>
        <p className="text-body-md text-ink-subdued max-w-md mb-6">
          Upload a new contract or select an existing one from your dashboard to begin the review process.
        </p>
        <div className="flex gap-4">
          <Button variant="primary" onClick={openNewContractModal}>
            + New Contract
          </Button>
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-73px)]">
      <div className="px-6 py-4 border-b border-gray-100 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0 z-10" style={{ boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04)' }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-surface-container-low rounded-xl flex items-center justify-center text-accent-primary">
            <span className="material-symbols-outlined">description</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-headline-sm text-ink-heavy">Contract {contractId || 'Workspace'}</h1>
              {status !== 'done' && status !== 'error' && (
                <Pill className="text-[10px] h-5 py-0 px-2 border-none shadow-sm animate-pulse">
                  <span className="w-1.5 h-1.5 bg-accent-primary rounded-full mr-1.5 inline-block" /> PROCESSING
                </Pill>
              )}
            </div>
            <div className="text-label-sm text-ink-subdued uppercase tracking-wider">
              {status === 'error' ? 'Error processing contract' : 'Session Active'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">⬇ Download Redline</Button>
          <Button variant="primary" size="sm">↗ Share with Client</Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        <div className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
          <div className="flex-shrink-0 px-6 py-3 flex items-center justify-between text-label-sm font-semibold border-b border-gray-200/50 bg-white/50 backdrop-blur-sm z-10">
            <span className="flex items-center gap-2 text-ink-body"><span className="material-symbols-outlined text-[16px]">lock</span> Encrypted Legal Agent Thread (Model: Redline-v3-Core)</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {status === 'error' && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
                {errorMsg}
              </div>
            )}

            {riskData && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-accent-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[14px]">smart_toy</span>
                  </div>
                  <span className="text-label-sm font-semibold text-ink-heavy">REDLINE Counsel AI — Risk Analysis</span>
                </div>
                <div className="bg-white border border-gray-200 p-5 rounded-2xl rounded-tl-sm max-w-3xl shadow-sm space-y-4 w-full">
                  <div className="bg-risk-high-surface border border-risk-high-outline p-4 rounded-xl flex gap-3">
                    <span className="material-symbols-outlined text-risk-high-text flex-shrink-0">warning</span>
                    <div>
                      <div className="font-bold text-label-sm text-risk-high-text uppercase tracking-widest mb-1">Risk Score: {riskData.risk_score || riskData.score || 'Unknown'}</div>
                    </div>
                  </div>
                  
                  {riskData.high_risk_clauses && riskData.high_risk_clauses.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-body-md text-ink-heavy mb-2">High Risk Clauses</h4>
                      <ul className="list-disc pl-5 space-y-1 text-body-sm text-ink-body">
                        {riskData.high_risk_clauses.map((c: any, i: number) => (
                          <li key={i}>{typeof c === 'string' ? c : (c.text || c.name || JSON.stringify(c))}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {riskData.recommendations && (
                    <div>
                      <h4 className="font-semibold text-body-md text-ink-heavy mb-2">Recommendations</h4>
                      <div className="text-body-sm text-ink-body">
                        {typeof riskData.recommendations === 'string' ? riskData.recommendations : JSON.stringify(riskData.recommendations)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {negotiateData && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-accent-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[14px]">smart_toy</span>
                  </div>
                  <span className="text-label-sm font-semibold text-ink-heavy">REDLINE Counsel AI — Negotiation Strategy</span>
                </div>
                <div className="bg-white border border-gray-200 p-5 rounded-2xl rounded-tl-sm max-w-3xl shadow-sm space-y-4 w-full">
                  <div className="text-body-md text-ink-body leading-relaxed">
                    {typeof negotiateData.strategy === 'string' ? negotiateData.strategy : (negotiateData.points ? negotiateData.points.join(', ') : 'Generated negotiation points.')}
                  </div>
                  {negotiateData.suggested_edits && Array.isArray(negotiateData.suggested_edits) && (
                    <div className="grid grid-cols-1 gap-4">
                      {negotiateData.suggested_edits.map((edit: any, idx: number) => (
                         <div key={idx} className="border border-accent-pale-wash bg-surface-bright rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                              <span className="font-semibold text-body-sm uppercase tracking-wider text-ink-body">Suggested Edit</span>
                            </div>
                            <div className="text-body-sm text-ink-body space-y-2 mb-4">
                              {edit.original && <div className="bg-risk-high-surface text-risk-high-text line-through p-1">{edit.original}</div>}
                              {edit.proposed && <div className="bg-risk-low-surface text-risk-low-text p-1 font-medium">{edit.proposed}</div>}
                              {typeof edit === 'string' && <div>{edit}</div>}
                            </div>
                         </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {explainData && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-accent-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[14px]">smart_toy</span>
                  </div>
                  <span className="text-label-sm font-semibold text-ink-heavy">REDLINE Counsel AI — Explanation</span>
                </div>
                <div className="bg-white border border-gray-200 p-5 rounded-2xl rounded-tl-sm max-w-3xl shadow-sm space-y-4 w-full">
                   <div className="text-body-md text-ink-body leading-relaxed">
                     {typeof explainData.explanation === 'string' ? explainData.explanation : JSON.stringify(explainData)}
                   </div>
                </div>
              </div>
            )}
            
            <div className="h-4"></div>
          </div>

          <div className="p-4 bg-white border-t border-gray-200 z-10 flex-shrink-0">
            <div className="relative flex items-center bg-surface-bright border border-accent-muted-tint rounded-xl p-2 focus-within:ring-4 focus-within:ring-accent-pale-wash focus-within:border-accent-primary transition-all shadow-sm">
              <input 
                type="text" 
                placeholder="Ask for plain-language explanations of any clause..." 
                className="flex-1 bg-transparent border-none focus:outline-none text-body-md text-ink-body placeholder-ink-subdued/60 px-2"
                value={explanationPrompt}
                onChange={(e) => setExplanationPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExplain()}
                disabled={isExplaining || !contractId}
              />
              <button 
                className="w-10 h-10 rounded-full bg-accent-primary hover:bg-accent-deep text-white flex items-center justify-center transition-colors shadow-sm flex-shrink-0 disabled:opacity-50"
                onClick={handleExplain}
                disabled={isExplaining || !contractId}
              >
                {isExplaining ? <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> : <span className="material-symbols-outlined text-[18px]">arrow_upward</span>}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[380px] bg-surface-bright border-l border-gray-200 overflow-y-auto flex flex-col flex-shrink-0">
          <div className="p-6 pb-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h2 className="text-headline-sm text-ink-heavy flex items-center justify-between mb-1">
              Autonomous Review Pipeline
            </h2>
            <p className="text-body-sm text-ink-subdued">Real-time workflow execution</p>
          </div>
          
          <div className="p-6">
            <Stepper steps={steps} className="mb-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
