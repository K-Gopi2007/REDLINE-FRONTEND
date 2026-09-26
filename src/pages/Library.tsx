import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import { RiskChip } from '../components/ui/RiskChip';
import { DataTable } from '../components/ui/DataTable';
import { useAppContext } from '../context/AppContext';
import { apiFetch } from '../api/api';

export default function Library() {
  const { openNewContractModal } = useAppContext();
  const [selectedContract, setSelectedContract] = useState<number | null>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await apiFetch('/api/v1/contracts');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const mapped = data.map((c: any) => ({
              id: c.id || c.contract_id,
              name: c.name || c.filename || 'Untitled Contract',
              counterparty: c.counterparty || 'Unknown',
              initials: (c.counterparty || 'U').substring(0,2).toUpperCase(),
              status: c.status || 'Active',
              risk: c.risk_score || c.risk || 'low',
              date: c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Today',
              versions: 1,
              favorite: false
            }));
            setContracts(mapped);
          }
        }
      } catch (err) {
        console.error('Failed to load library contracts');
        setError('Could not load library.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContracts();
  }, []);

  const getStatusPill = (status: string) => {
    switch(status) {
      case 'Signed': return <Pill className="text-[10px] bg-risk-low-surface text-risk-low-text border-transparent h-6">Signed</Pill>;
      case 'Active': return <Pill className="text-[10px] bg-surface-container-high text-ink-body border-transparent h-6">Active</Pill>;
      case 'Archived': return <Pill className="text-[10px] bg-surface-variant text-ink-subdued border-transparent h-6">Archived</Pill>;
      case 'Rejected': return <Pill className="text-[10px] bg-risk-high-surface text-risk-high-text border-transparent h-6">Rejected</Pill>;
      default: return null;
    }
  };

  const columns = [
    { 
      header: 'Contract Name', 
      accessor: (row: any) => (
        <div className="flex items-center gap-3 py-1 cursor-pointer" onClick={() => setSelectedContract(row.id)}>
          <div className="w-8 h-8 rounded bg-surface-container-low flex items-center justify-center text-ink-subdued flex-shrink-0">
            <span className="material-symbols-outlined text-[16px]">description</span>
          </div>
          <div>
            <div className="font-semibold text-ink-body mb-0.5">{row.name}</div>
            <div className="text-ink-subdued text-[11px] tracking-wider">v{row.versions} · {row.versions} revisions</div>
          </div>
        </div>
      ) 
    },
    { 
      header: 'Counterparty', 
      accessor: (row: any) => (
        <div className="flex items-center gap-2 pt-2">
          <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-ink-subdued text-[10px]">{row.initials}</div>
          <span className="text-ink-body font-medium">{row.counterparty}</span>
        </div>
      ) 
    },
    { header: 'Status', accessor: (row: any) => <div className="pt-2">{getStatusPill(row.status)}</div> },
    { header: 'Risk Level', accessor: (row: any) => <div className="pt-2"><RiskChip level={row.risk} label={`${row.risk} risk`} /></div> },
    { header: 'Last Revised', accessor: (row: any) => <div className="text-ink-subdued pt-2">{row.date}</div> },
    { 
      header: 'Actions', 
      accessor: (row: any) => (
        <div className="flex items-center gap-3 pt-2">
          <button className="text-ink-subdued hover:text-accent-primary transition-colors font-medium">View</button>
          <button className="text-ink-subdued hover:text-ink-body transition-colors"><span className="material-symbols-outlined text-[18px]">download</span></button>
          <button className={`transition-colors ${row.favorite ? 'text-[#F59E0B]' : 'text-ink-subdued hover:text-ink-body'}`}>
            <span className="material-symbols-outlined text-[18px]" style={row.favorite ? {fontVariationSettings: "'FILL' 1"} : {}}>star</span>
          </button>
        </div>
      ) 
    },
  ];

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-8 relative">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-headline-lg text-ink-heavy mb-2">Library</h1>
        <p className="text-body-lg text-ink-subdued">Every contract your agent has ever reviewed — search, reuse, and reference past work.</p>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white rounded-t-2xl border border-gray-200 border-b-0 p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm relative z-10">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-subdued text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search by contract, counterparty, or clause…" 
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-body-md focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-pale-wash transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          <select className="px-3 py-2 bg-surface-container-low border border-gray-200 rounded-lg text-body-sm text-ink-body focus:outline-none">
            <option>Status: All</option>
            <option>Active</option>
            <option>Signed</option>
            <option>Archived</option>
            <option>Rejected</option>
          </select>
          <select className="px-3 py-2 bg-surface-container-low border border-gray-200 rounded-lg text-body-sm text-ink-body focus:outline-none">
            <option>Risk Level</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="px-3 py-2 bg-surface-container-low border border-gray-200 rounded-lg text-body-sm text-ink-body focus:outline-none">
            <option>Type</option>
            <option>MSA</option>
            <option>NDA</option>
            <option>SOW</option>
          </select>
          <Button variant="ghost" className="bg-white whitespace-nowrap">More Filters</Button>
        </div>
      </div>

      {/* Contract Table */}
      <div className="bg-white rounded-b-2xl border border-gray-200 overflow-hidden shadow-sm flex-1 relative z-0">
        {error ? (
          <div className="text-center p-12 text-red-500">{error}</div>
        ) : isLoading ? (
          <div className="text-center p-12 text-ink-subdued">Loading contracts...</div>
        ) : contracts.length > 0 ? (
          <DataTable columns={columns} data={contracts} />
        ) : (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center text-ink-subdued mb-4">
              <span className="material-symbols-outlined text-[32px]">folder_open</span>
            </div>
            <h3 className="text-headline-sm text-ink-heavy mb-2">No contracts yet</h3>
            <p className="text-body-md text-ink-subdued mb-6">Start your first review to build your legal library.</p>
            <Button variant="primary" onClick={openNewContractModal}>+ New Contract</Button>
          </div>
        )}
      </div>

      {/* Version History Drawer (Popover Mock) */}
      {selectedContract && (
        <>
          <div className="fixed inset-0 z-40 bg-ink-heavy/20 backdrop-blur-sm" onClick={() => setSelectedContract(null)}></div>
          <div 
            className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-50 border-l border-gray-200 flex flex-col"
            style={{ boxShadow: '-8px 0 24px rgba(0,0,0,0.1)' }}
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-surface-bright">
              <h2 className="text-headline-sm">Version History</h2>
              <button onClick={() => setSelectedContract(null)} className="text-ink-subdued hover:text-ink-heavy"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-background">
              <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pb-4">
                <div className="relative pl-6">
                  <div className="absolute w-4 h-4 bg-accent-primary rounded-full border-4 border-white -left-[9px] top-1"></div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-body-md">Version 3 (Current)</span>
                    <span className="text-label-sm text-ink-subdued">2 hours ago</span>
                  </div>
                  <p className="text-body-sm text-ink-subdued mb-3">Client accepted the Net 15 payment terms. Counter-signed by procurement.</p>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm">View this version</Button>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                </div>
                
                <div className="relative pl-6">
                  <div className="absolute w-4 h-4 bg-gray-300 rounded-full border-4 border-white -left-[9px] top-1"></div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-body-md text-ink-body">Version 2</span>
                    <span className="text-label-sm text-ink-subdued">Yesterday</span>
                  </div>
                  <p className="text-body-sm text-ink-subdued mb-3">Agent applied Playbook fallback for uncapped liability. Sent counter-draft to client.</p>
                  <div className="bg-surface-bright p-3 rounded-lg border border-gray-200 mb-3 text-body-sm text-ink-body flex items-center justify-between group">
                    <span className="truncate pr-4">"Mutual fixed liability ceiling..."</span>
                    <button className="text-accent-primary font-semibold text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">sync</span> Reuse</button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>

                <div className="relative pl-6">
                  <div className="absolute w-4 h-4 bg-gray-300 rounded-full border-4 border-white -left-[9px] top-1"></div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-body-md text-ink-body">Version 1 (Original)</span>
                    <span className="text-label-sm text-ink-subdued">3 days ago</span>
                  </div>
                  <p className="text-body-sm text-ink-subdued mb-3">Initial document upload by Maya Lin.</p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
