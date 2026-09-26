import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import { RiskChip } from '../components/ui/RiskChip';
import { DataTable } from '../components/ui/DataTable';
import { useAppContext } from '../context/AppContext';
import { apiFetch } from '../api/api';
import { Link } from 'react-router-dom';
import { Search, FolderOpen, FileText, Download, Star, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Library() {
  const { openNewContractModal } = useAppContext();

  const [contracts, setContracts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status: All');
  const [riskFilter, setRiskFilter] = useState('Risk Level');
  const [typeFilter, setTypeFilter] = useState('Type');

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await apiFetch('/api/v1/contracts');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const mapped = data.map((c: any) => ({
              id: c.id || c.contract_id,
              name: c.name || c.title || c.filename || 'Untitled Contract',
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
    switch(status.toLowerCase()) {
      case 'signed': return <Pill className="text-[10px] bg-risk-low-surface/50 text-risk-low-text border-transparent h-6">Signed</Pill>;
      case 'active': return <Pill className="text-[10px] bg-accent-primary/10 text-accent-primary border-transparent h-6">Active</Pill>;
      case 'archived': return <Pill className="text-[10px] bg-gray-100 text-gray-500 border-transparent h-6">Archived</Pill>;
      case 'rejected': return <Pill className="text-[10px] bg-risk-high-surface/50 text-risk-high-text border-transparent h-6">Rejected</Pill>;
      default: return <Pill className="text-[10px] bg-gray-100 text-ink-body border-transparent h-6">{status}</Pill>;
    }
  };

  const columns = [
    { 
      header: 'Contract Name', 
      accessor: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-ink-subdued">
            <FileText size={16} />
          </div>
          <div>
            <Link to={`/workspace?contractId=${row.id}`} className="font-semibold text-ink-body mb-0.5 hover:text-accent-primary transition-colors cursor-pointer">{row.name}</Link>
            <div className="text-ink-subdued text-[11px] uppercase tracking-wider">v{row.versions} · {row.date}</div>
          </div>
        </div>
      ) 
    },
    { 
      header: 'Counterparty', 
      accessor: (row: any) => (
        <div className="flex items-center gap-2 pt-1">
          <div className="w-5 h-5 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center text-[9px] font-bold">
            {row.initials}
          </div>
          <span className="text-ink-body font-medium">{row.counterparty}</span>
        </div>
      ) 
    },
    { 
      header: 'Status', 
      accessor: (row: any) => <div className="pt-1">{getStatusPill(row.status)}</div> 
    },
    { 
      header: 'Risk Profile', 
      accessor: (row: any) => (
        <div className="pt-1">
          {row.risk === 'low' || row.risk <= 33 ? <RiskChip level="low" label="Low Risk" /> :
           row.risk === 'medium' || row.risk <= 66 ? <RiskChip level="medium" label="Medium Risk" /> :
           <RiskChip level="high" label="High Risk" />}
        </div>
      ) 
    },
    { 
      header: '', 
      accessor: (row: any) => (
        <div className="flex items-center justify-end gap-3 pt-1">
          <button className="text-ink-subdued hover:text-ink-body transition-colors">
            <Download size={16} />
          </button>
          <button className={`transition-colors ${row.favorite ? 'text-[#F59E0B]' : 'text-ink-subdued hover:text-ink-body'}`}>
            <Star size={16} fill={row.favorite ? "currentColor" : "none"} />
          </button>
        </div>
      ) 
    },
  ];

  const filteredContracts = contracts.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.counterparty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'Status: All' || c.status.toLowerCase() === statusFilter.toLowerCase();
    
    let matchRisk = true;
    if (riskFilter !== 'Risk Level') {
       let mappedRisk = 'low';
       if (c.risk === 'high' || c.risk > 66) mappedRisk = 'high';
       else if (c.risk === 'medium' || (c.risk > 33 && c.risk <= 66)) mappedRisk = 'medium';
       matchRisk = mappedRisk === riskFilter.toLowerCase();
    }
    
    const matchType = typeFilter === 'Type' || c.name.toLowerCase().includes(typeFilter.toLowerCase());

    return matchSearch && matchStatus && matchRisk && matchType;
  });

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-8 relative bg-transparent">
      {/* Abstract background */}
      <div className="absolute top-0 left-[20%] w-[30%] h-[40%] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 relative z-10">
        <h1 className="text-2xl font-bold text-ink-heavy mb-2 tracking-tight">Library</h1>
        <p className="text-sm text-ink-subdued">Every contract your agent has ever reviewed — search, reuse, and reference past work.</p>
      </motion.div>

      {/* Search + Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl rounded-t-2xl border border-gray-200/60 border-b-0 p-4 flex flex-col md:flex-row items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10"
      >
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subdued" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by contract, counterparty, or clause..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          <Filter size={16} className="text-ink-subdued mr-1" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-white/50 border border-gray-200/80 rounded-lg text-sm text-ink-body focus:outline-none focus:border-accent-primary">
            <option>Status: All</option>
            <option>Active</option>
            <option>Signed</option>
            <option>Archived</option>
            <option>Rejected</option>
          </select>
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="px-3 py-2 bg-white/50 border border-gray-200/80 rounded-lg text-sm text-ink-body focus:outline-none focus:border-accent-primary">
            <option>Risk Level</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 bg-white/50 border border-gray-200/80 rounded-lg text-sm text-ink-body focus:outline-none focus:border-accent-primary">
            <option>Type</option>
            <option>MSA</option>
            <option>NDA</option>
            <option>SOW</option>
          </select>
        </div>
      </motion.div>

      {/* Contract Table */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-b-2xl border border-gray-200/60 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 relative z-0"
      >
        {error ? (
          <div className="text-center p-12 text-red-500">{error}</div>
        ) : isLoading ? (
          <div className="text-center p-12 text-ink-subdued flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mb-4" />
            Loading contracts...
          </div>
        ) : filteredContracts.length > 0 ? (
          <DataTable columns={columns} data={filteredContracts} />
        ) : (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <div className="w-16 h-16 bg-accent-primary/5 border border-accent-primary/10 rounded-2xl flex items-center justify-center text-accent-primary mb-4 shadow-sm">
              <FolderOpen size={28} />
            </div>
            <h3 className="text-lg font-semibold text-ink-heavy mb-2 tracking-tight">No contracts found</h3>
            <p className="text-sm text-ink-subdued mb-6 max-w-md">Try adjusting your filters or upload a new contract to your library.</p>
            <Button variant="primary" onClick={openNewContractModal} className="shadow-lg shadow-accent-primary/20">+ New Contract</Button>
          </div>
        )}
      </motion.div>

    </div>
  );
}
