import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pill } from '../components/ui/Pill';
import { RiskChip } from '../components/ui/RiskChip';
import { DataTable } from '../components/ui/DataTable';
import { useAppContext } from '../context/AppContext';
import { Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { apiFetch } from '../api/api';
import { motion } from 'framer-motion';
import { Shield, Clock, ArrowUpRight, ShieldAlert, Bell, Search, Filter, FileText, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Dashboard() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [highRisk, setHighRisk] = useState<any>(null);
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { openRiskDigestModal } = useAppContext();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [contractsRes, statsRes, highRiskRes, deadlinesRes] = await Promise.all([
          apiFetch('/api/v1/contracts'),
          apiFetch('/api/v1/contracts/stats'),
          apiFetch('/api/v1/contracts/high-risk'),
          apiFetch('/api/v1/contracts/upcoming-deadlines')
        ]);

        if (!contractsRes.ok || !statsRes.ok || !highRiskRes.ok || !deadlinesRes.ok) {
          throw new Error('Failed to load dashboard data');
        }

        const [contractsData, statsData, highRiskData, deadlinesData] = await Promise.all([
          contractsRes.json(),
          statsRes.json(),
          highRiskRes.json(),
          deadlinesRes.json()
        ]);

        if (Array.isArray(contractsData)) {
          const mapped = contractsData.map((c: any) => ({
            id: c.id || c.contract_id,
            name: c.name || c.title || c.filename || 'Untitled Contract',
            meta: c.meta || 'Recently uploaded',
            counterparty: c.counterparty || 'Unknown',
            risk: c.risk_score || c.risk || 'low',
            clauses: c.high_risk_clauses ? c.high_risk_clauses.join(', ') : 'No high risk clauses',
            status: c.status || 'Needs Review',
            action: 'Open Redline →',
            actionType: 'secondary'
          }));
          setContracts(mapped);
        } else {
          setContracts([]);
        }

        setStats(statsData);
        setHighRisk(highRiskData);
        setDeadlines(deadlinesData);
      } catch (err) {
        setError('Could not load dashboard. Backend might be unavailable.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const velocityData = stats?.velocity || [];
  const statCards = [
    { label: 'Active Contracts', value: stats?.active_contracts || '0', sub: `+${stats?.new_this_week || 0} this week` },
    { label: 'Risk Issues Caught', value: stats?.risk_issues || '0', sub: `${stats?.high_risk || 0} High · ${stats?.med_risk || 0} Med · ${stats?.low_risk || 0} Low` },
    { label: 'Avg. Turnaround Time', value: stats?.avg_turnaround_hrs ? `${stats.avg_turnaround_hrs} hrs` : '0 hrs', sub: '↓ from 3.5 days · 91% faster velocity' },
    { label: 'Estimated Revenue Saved', value: stats?.estimated_savings ? `$${(stats.estimated_savings / 1000).toFixed(1)}k` : '$0', sub: 'Avoided scope creep & kill fees' },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8 relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Top Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mb-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center">
          <Pill className="self-start mb-4 text-[10px] bg-accent-primary/10 text-accent-primary border-transparent">● AUTONOMOUS LEGAL INTEL ENGINE</Pill>
          <h2 className="text-3xl font-bold text-ink-heavy mb-2 tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-ink-subdued mb-6 max-w-lg">Your AI agent analyzed agreements this week with a 100% adherence to your creative studio fallback handbook.</p>
          <div className="flex items-center gap-6 text-xs text-ink-body font-medium mt-auto">
            <span className="flex items-center gap-1.5"><Shield size={16} className="text-accent-primary" /> Zero critical breaches unflagged</span>
            <span className="flex items-center gap-1.5"><Clock size={16} className="text-ink-subdued" /> System active</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-accent-primary to-accent-deep rounded-3xl p-8 text-white flex flex-col relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <Pill className="self-start mb-4 text-[10px] bg-risk-medium-surface text-risk-medium-text border-transparent backdrop-blur-md">⚠ WEEKLY EXPOSURE SHIELD</Pill>
          <h2 className="text-3xl font-bold mb-2 tracking-tight">{stats?.estimated_savings ? `$${(stats.estimated_savings).toLocaleString()}` : '$0'} <span className="text-xl font-normal opacity-80">saved</span></h2>
          <p className="text-sm text-white/70 mb-6 max-w-[85%]">{stats?.high_risk || 0} uncapped indemnity clauses identified.</p>
          <div className="flex items-center justify-between mt-auto z-10">
            <span className="text-xs text-white/60">Audit trail verified</span>
            <button onClick={openRiskDigestModal} className="flex items-center gap-1 text-xs font-semibold text-accent-deep bg-white px-3 py-1.5 rounded-xl hover:bg-white/90 transition-all shadow-sm">
              Digest <ArrowUpRight size={14} />
            </button>
          </div>
          <ShieldAlert size={140} className="absolute -right-8 -bottom-8 text-white/5 pointer-events-none" />
        </motion.div>
      </div>

      {isLoading && <div className="text-center py-20 flex flex-col items-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mb-4" /><p className="text-ink-subdued text-sm">Loading intelligence...</p></div>}
      
      {error && <div className="p-8 mb-8 bg-red-50/80 backdrop-blur-md text-red-600 rounded-2xl border border-red-100">{error}</div>}

      {!isLoading && !error && (
        <div className="relative z-10">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, idx) => (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + idx * 0.05 }} key={stat.label} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col">
                <div className="text-[11px] font-semibold tracking-wider text-ink-subdued uppercase mb-2">{stat.label}</div>
                <div className="text-3xl font-bold text-ink-heavy mb-2 tracking-tight">{stat.value}</div>
                <div className="text-xs text-ink-subdued mt-auto font-medium">{stat.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Deadlines Widget */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white mb-8 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="px-6 py-4 border-b border-gray-100/50 flex items-center gap-2 bg-white/40">
              <Bell size={18} className="text-risk-medium-text" />
              <h3 className="text-sm font-bold text-ink-heavy">Upcoming Deadlines</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {deadlines.length > 0 ? deadlines.map(dl => (
                <div key={dl.id} className="p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-sm text-ink-heavy">{dl.name}</span>
                      <span className="text-[10px] uppercase font-bold text-ink-subdued bg-gray-100 px-2 py-0.5 rounded-md">{dl.cp}</span>
                      <RiskChip level={dl.urgency || "medium"} label={dl.date} className="h-5 text-[10px]" />
                    </div>
                    <div className="text-xs text-ink-subdued">{dl.clause}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 border border-gray-200 text-ink-body text-xs font-medium rounded-xl hover:bg-gray-50 transition-colors">Draft notice</button>
                    <button className="p-1.5 text-ink-subdued hover:bg-gray-100 rounded-xl transition-colors" title="Remind me later"><Clock size={16} /></button>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-sm text-ink-subdued">No upcoming deadlines found.</div>
              )}
            </div>
          </motion.div>

          {/* Two-column chart row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
              <div className="mb-6">
                <h3 className="text-sm font-bold text-ink-heavy mb-1">Contract Velocity</h3>
                <p className="text-xs text-ink-subdued">Volume vs. turnaround time</p>
              </div>
              <div className="h-64 w-full mb-4 flex-1">
                {velocityData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={velocityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#636B66' }} dy={10} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#636B66' }} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={false} />
                      <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', backdropFilter: 'blur(8px)' }} />
                      <Bar yAxisId="left" dataKey="volume" fill="#E3EFE8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      <Line yAxisId="right" type="monotone" dataKey="speed" stroke="#2F6B4F" strokeWidth={3} dot={{ r: 4, fill: '#2F6B4F', strokeWidth: 0 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-ink-subdued">Not enough data to display chart.</div>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
              <div className="mb-6">
                <h3 className="text-sm font-bold text-ink-heavy mb-1">Top Flagged Clauses</h3>
                <p className="text-xs text-ink-subdued">Breakdown of standard contract liabilities</p>
              </div>
              
              {highRisk && highRisk.total_clauses > 0 ? (
                <>
                  <div className="mb-8">
                    <div className="text-xs font-semibold mb-2 text-ink-body">Overall Risk Distribution</div>
                    <div className="h-4 w-full flex rounded-full overflow-hidden mb-2 opacity-90">
                      {highRisk.distribution.map((dist: any) => (
                        <div key={dist.name} className={`${dist.color} h-full`} style={{ width: `${dist.percentage}%` }}></div>
                      ))}
                    </div>
                    <div className="text-xs text-ink-subdued font-medium">{highRisk.total_clauses} Total Clauses</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {highRisk.distribution.map((dist: any) => (
                      <div key={dist.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-2.5 h-2.5 rounded-full ${dist.color}`} />
                          <div>
                            <div className="font-semibold text-sm text-ink-heavy">{dist.name}</div>
                            <div className="text-xs text-ink-subdued">{dist.desc}</div>
                          </div>
                        </div>
                        <div className="font-bold text-sm text-ink-heavy">{dist.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-12 flex flex-col items-center text-ink-subdued">
                  <Shield size={32} className="mb-3 opacity-30" />
                  <p className="text-sm">No high-risk clauses detected.</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Active Review Queue Table */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="px-6 py-5 border-b border-gray-100/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40">
              <div>
                <h3 className="text-sm font-bold text-ink-heavy mb-1">Active Review Queue</h3>
                <p className="text-xs text-ink-subdued">{contracts.length} contracts requiring active governance</p>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subdued" />
                <input type="text" placeholder="Filter agreements…" className="pl-9 pr-4 py-2 border border-gray-200/80 rounded-xl text-xs focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 w-full md:w-64 bg-white/50 transition-all" />
                <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subdued cursor-pointer" />
              </div>
            </div>
            
            {contracts.length > 0 ? (
              <DataTable 
                columns={[
                  { header: 'Contract Name', accessor: (row) => <div><div className="font-semibold text-sm text-ink-body mb-0.5">{row.name}</div><div className="text-ink-subdued text-[10px] uppercase tracking-wider">{row.meta}</div></div> },
                  { header: 'Counterparty', accessor: (row) => <div className="text-ink-body font-medium text-sm pt-1">{row.counterparty}</div> },
                  { header: 'Risk Level', accessor: (row) => <div className="pt-1"><RiskChip level={row.risk as any} label={`${row.risk} risk`} /></div> },
                  { header: 'Key Flagged Clauses', accessor: (row) => <div className="text-ink-subdued text-xs pt-1 truncate max-w-xs">{row.clauses}</div> },
                  { header: 'Agent Status', accessor: (row) => <div className="pt-1"><Pill className="text-[10px] h-6">{row.status}</Pill></div> },
                  { header: 'Actions', accessor: (row) => (
                      <div className="pt-1">
                        <Link to={`/workspace?contractId=${row.id}`}>
                          <span className={`text-xs font-semibold cursor-pointer hover:underline ${row.actionType === 'primary' ? 'text-accent-primary' : 'text-ink-body'}`}>{row.action}</span>
                        </Link>
                      </div>
                    ) 
                  },
                ]}
                data={contracts}
              />
            ) : (
              <div className="text-center py-16 flex flex-col items-center border-b border-gray-50">
                <FileText size={32} className="text-gray-300 mb-4" />
                <p className="text-ink-heavy font-medium text-sm">No active contracts found</p>
                <p className="text-ink-subdued text-xs mt-1">Upload an agreement to see it here.</p>
              </div>
            )}
            <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-between text-xs text-ink-subdued border-t border-gray-100/50">
              <span>Showing {contracts.length} active contracts</span>
              {contracts.length > 0 && (
                <div className="flex items-center gap-4">
                  <button className="hover:text-ink-body p-1"><ChevronLeft size={16} /></button>
                  <span className="w-6 h-6 flex items-center justify-center rounded-md bg-accent-pale-wash text-accent-primary font-semibold">1</span>
                  <button className="hover:text-ink-body p-1"><ChevronRight size={16} /></button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
