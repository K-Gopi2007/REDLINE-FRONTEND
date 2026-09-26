import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import { PaperSheet } from '../components/ui/PaperSheet';
import { useAppContext } from '../context/AppContext';
import { apiFetch } from '../api/api';

export default function Documents() {
  const { id } = useParams<{ id: string }>();
  const { openRiskDigestModal } = useAppContext();
  
  const [contractData, setContractData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setIsLoading(true);
        const res = await apiFetch(`/api/v1/contracts/${id}`);
        if (!res.ok) {
          throw new Error('Failed to load contract details');
        }
        const data = await res.json();
        setContractData(data);
      } catch (err: any) {
        setError(err.message || 'Could not load contract. Backend might be unavailable.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchDocument();
    } else {
      setError('No contract ID provided.');
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col h-[calc(100vh-73px)] items-center justify-center bg-canvas-ground">
        <span className="material-symbols-outlined animate-spin text-4xl text-accent-primary mb-4">progress_activity</span>
        <p className="text-ink-subdued">Loading document...</p>
      </div>
    );
  }

  if (error || !contractData) {
    return (
      <div className="flex-1 flex flex-col h-[calc(100vh-73px)] items-center justify-center bg-canvas-ground p-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-md">
          <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
          <h2 className="text-headline-sm text-ink-heavy mb-2">Error Loading Document</h2>
          <p className="text-body-sm text-ink-subdued">{error || 'Unknown error occurred.'}</p>
        </div>
      </div>
    );
  }

  const { contract, risk_report, negotiation_report } = contractData;
  const issues = risk_report?.issues || [];
  const suggestions = negotiation_report?.suggestions || [];
  
  const highRiskCount = issues.filter((i: any) => (i.severity || '').toUpperCase() === 'HIGH').length;
  const medRiskCount = issues.filter((i: any) => (i.severity || '').toUpperCase() === 'MEDIUM').length;
  const lowRiskCount = issues.filter((i: any) => (i.severity || '').toUpperCase() === 'LOW').length;

  const handleAction = (action: string) => {
    // Stub action handler
    console.log(`Action triggered: ${action}`);
  };

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
              <h1 className="text-headline-sm text-ink-heavy">{contract.title || 'Untitled Document'}</h1>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider font-semibold">
              <span className="bg-surface-container-high text-ink-subdued px-2 py-0.5 rounded">Analyzed Document</span>
              <span className="text-ink-subdued flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">schedule</span> {new Date(contract.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3 text-label-sm font-semibold border-r border-gray-200 pr-4">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-ink-subdued"></span> All Flags {issues.length}</span>
            <span className="flex items-center gap-1.5 text-risk-high-text"><span className="w-1.5 h-1.5 rounded-full bg-risk-high-text"></span> High Risk {highRiskCount}</span>
            <span className="flex items-center gap-1.5 text-risk-medium-text"><span className="w-1.5 h-1.5 rounded-full bg-risk-medium-text"></span> Medium {medRiskCount}</span>
            <span className="flex items-center gap-1.5 text-risk-low-text"><span className="w-1.5 h-1.5 rounded-full bg-risk-low-text"></span> Low {lowRiskCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden lg:inline-flex text-risk-low-text border-risk-low-outline hover:bg-risk-low-surface" onClick={() => handleAction('Accept Safe Edits')}>✓ Accept Safe Edits</Button>
            <Button variant="ghost" size="sm" onClick={openRiskDigestModal}>⬇ Export Digest</Button>
            <Button variant="ghost" size="sm" onClick={() => handleAction('Redlined DOCX')}>⬇ Redlined DOCX</Button>
            <Button variant="primary" size="sm" className="bg-accent-deep hover:bg-ink-heavy" onClick={() => handleAction('Send Counter Draft')}>▷ Send Counter-Draft</Button>
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

            <div className="text-center mb-12 mt-8">
              <h2 className="text-headline-md font-serif text-ink-heavy underline underline-offset-8 decoration-1">{contract.title}</h2>
            </div>

            <div className="text-legal-contract text-ink-body space-y-8 whitespace-pre-wrap">
              {contract.content}
            </div>
            
            {/* Bottom Bar on PaperSheet */}
            <div className="absolute bottom-0 left-0 right-0 bg-surface-container-low border-t border-gray-200 p-4 rounded-b-2xl flex items-center justify-between text-body-sm">
              <div className="font-medium text-ink-body">EXECUTION READINESS — Review agent findings before signing.</div>
              <div className="flex gap-2">
                <Button variant="primary" size="sm" className="bg-accent-deep hover:bg-ink-heavy" onClick={() => handleAction('Lock Draft')}>Lock Draft</Button>
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
            <Pill className="text-[10px] bg-surface-container-high text-ink-heavy border-transparent h-5 py-0 px-2 flex items-center gap-1">
              <span>{issues.length} Issues Found</span>
            </Pill>
          </div>
          
          <div className="p-6 space-y-6">
            
            {issues.length === 0 && (
              <div className="text-center py-8 text-ink-subdued">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">check_circle</span>
                <p>No risks identified in this document.</p>
              </div>
            )}

            {issues.map((issue: any, index: number) => {
              const severityColor = (issue.severity || '').toUpperCase() === 'HIGH' ? 'text-risk-high-text bg-risk-high-surface/30 border-risk-high-outline/50' :
                                    (issue.severity || '').toUpperCase() === 'MEDIUM' ? 'text-risk-medium-text bg-risk-medium-surface/30 border-risk-medium-outline/50' :
                                    'text-risk-low-text bg-risk-low-surface/30 border-risk-low-outline/50';
                                    
              const textColor = (issue.severity || '').toUpperCase() === 'HIGH' ? 'text-risk-high-text' :
                                (issue.severity || '').toUpperCase() === 'MEDIUM' ? 'text-risk-medium-text' :
                                'text-risk-low-text';

              // Find a negotiation suggestion for this clause if it exists
              const suggestion = suggestions.find((s: any) => s.original_clause && issue.clause && s.original_clause.includes(issue.clause.substring(0, 20)));

              return (
                <div key={index} className="pb-6 border-b border-gray-100 last:border-0">
                  <h2 className="text-headline-sm text-ink-heavy mb-4">Risk Finding #{index + 1}</h2>
                  
                  {/* Plain-language breakdown */}
                  <div className={`border rounded-xl p-4 shadow-sm mb-4 ${severityColor}`}>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1 ${textColor}`}>
                      <span className="material-symbols-outlined text-[14px]">lightbulb</span> {(issue.severity || 'Notice').toUpperCase()} RISK
                    </div>
                    <p className="text-body-sm text-ink-body leading-relaxed font-semibold mb-2">
                      Clause: "{issue.clause}"
                    </p>
                    <p className="text-body-sm text-ink-body leading-relaxed italic">
                      {issue.reason}
                    </p>
                  </div>

                  {/* Suggested Safe Replacement */}
                  {suggestion && (
                    <div className="border border-accent-pale-wash bg-accent-faint-wash rounded-xl p-4 shadow-sm relative mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-accent-primary flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">build</span> SUGGESTED REPLACEMENT
                        </div>
                      </div>
                      <div className="bg-white border border-accent-muted-tint p-3 rounded-lg text-legal-contract text-ink-body mb-4 leading-relaxed">
                        {suggestion.suggested_clause}
                      </div>
                      <div className="text-body-sm text-ink-subdued mb-4">
                        <strong>Reasoning:</strong> {suggestion.reasoning}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button variant="primary" className="w-full">✓ Apply Suggested Clause</Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Contract Health Score */}
            {risk_report && (
              <div className="bg-surface-bright border border-gray-200 rounded-xl p-6 text-center mt-8">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-subdued mb-2">CONTRACT HEALTH SCORE</div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-display text-accent-primary">{risk_report.risk_score || 0}<span className="text-headline-md text-ink-subdued">/100</span></div>
                  <Pill className="text-[10px] bg-accent-faint-wash text-accent-primary border-transparent font-bold tracking-wider">{risk_report.risk_level || 'UNKNOWN'} RISK LEVEL</Pill>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden flex mb-3">
                  {highRiskCount === 0 && medRiskCount === 0 && lowRiskCount === 0 ? (
                    <div className="bg-accent-primary h-full w-full"></div>
                  ) : (
                    <>
                      <div className="bg-risk-low-text h-full" style={{ width: `${Math.max(10, 100 - (highRiskCount*20 + medRiskCount*10))}%` }}></div>
                      <div className="bg-risk-medium-text h-full" style={{ width: `${medRiskCount * 10}%` }}></div>
                      <div className="bg-risk-high-text h-full" style={{ width: `${highRiskCount * 20}%` }}></div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
