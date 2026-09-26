import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { apiFetch } from '../api/api';
import { useAppContext } from '../context/AppContext';
import { DocumentViewer } from '../components/workspace/DocumentViewer';
import { ActivityTimeline, type PipelineStep } from '../components/workspace/ActivityTimeline';
import { IntelligencePanel } from '../components/workspace/IntelligencePanel';
import { motion } from 'framer-motion';

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
        const reviewRes = await apiFetch(`/api/v1/contracts/review?contract_id=${contractId}`, { method: 'POST' });
        if (!reviewRes.ok) throw new Error(`Failed to review contract (${reviewRes.status}).`);
        setReviewData(await reviewRes.json());

        // Step 2: Risk Analysis
        setStatus('analyzing');
        const riskRes = await apiFetch(`/api/v1/contracts/analyze-risk?contract_id=${contractId}`, { method: 'POST' });
        if (!riskRes.ok) throw new Error(`Risk analysis failed (${riskRes.status}).`);
        setRiskData(await riskRes.json());

        // Step 3: Negotiate
        setStatus('negotiating');
        const negRes = await apiFetch(`/api/v1/contracts/negotiate?contract_id=${contractId}`, { method: 'POST' });
        if (!negRes.ok) throw new Error(`Negotiation generation failed (${negRes.status}).`);
        setNegotiateData(await negRes.json());
        
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
      setExplainData(await res.json());
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsExplaining(false);
      setExplanationPrompt('');
    }
  };

  const steps: PipelineStep[] = [
    {
      id: '1',
      status: status === 'idle' || status === 'reviewing' ? 'active' : 'done',
      title: 'Contract Ingestion & OCR',
      description: status === 'reviewing' ? 'Parsing document structure and extracting text...' : (reviewData ? 'Document parsed successfully.' : 'Waiting to start...'),
    },
    {
      id: '2',
      status: status === 'analyzing' ? 'active' : (riskData ? 'done' : 'idle'),
      title: 'Risk Assessment Model',
      riskPill: riskData?.risk_score === 'high' || riskData?.score === 'high',
      description: status === 'analyzing' ? 'Running NLP models for anomaly detection...' : (riskData ? `${riskData.high_risk_clauses?.length || 0} critical clauses identified.` : 'Pending...'),
    },
    {
      id: '3',
      status: status === 'negotiating' ? 'active' : (negotiateData ? 'done' : 'idle'),
      title: 'Strategy Generation',
      description: status === 'negotiating' ? 'Synthesizing negotiation positions based on risk profile...' : (negotiateData ? 'Redline strategy ready.' : 'Pending...'),
    }
  ];

  if (!contractId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-73px)] text-center p-6 bg-surface-bright/50">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-accent-primary shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 border border-white">
            <span className="material-symbols-outlined text-3xl">description</span>
          </div>
          <h2 className="text-xl font-semibold mb-3 text-ink-heavy tracking-tight">No Contract Selected</h2>
          <p className="text-sm text-ink-subdued max-w-md mb-8">
            Upload a new contract or select an existing one from your dashboard to initialize the AI review pipeline.
          </p>
          <div className="flex gap-4">
            <Button variant="primary" onClick={openNewContractModal} className="shadow-lg shadow-accent-primary/20">
              + New Contract
            </Button>
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="bg-white/50 hover:bg-white/80">
              Go to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-73px)] bg-[#f8faf9] relative overflow-hidden">
      {/* Abstract Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left Panel: Document Viewer (approx 35%) */}
        <div className="w-[35%] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5">
          <DocumentViewer contractId={contractId} />
        </div>

        {/* Center Panel: Timeline (approx 25%) */}
        <div className="w-[25%] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5">
          <ActivityTimeline steps={steps} />
        </div>

        {/* Right Panel: Intelligence (approx 40%) */}
        <div className="w-[40%] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5">
          <IntelligencePanel 
            status={status}
            riskData={riskData}
            negotiateData={negotiateData}
            explainData={explainData}
            explanationPrompt={explanationPrompt}
            setExplanationPrompt={setExplanationPrompt}
            isExplaining={isExplaining}
            handleExplain={handleExplain}
            errorMsg={errorMsg}
          />
        </div>
      </div>
    </div>
  );
}
