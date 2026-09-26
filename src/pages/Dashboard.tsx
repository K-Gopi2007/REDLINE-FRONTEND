import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pill } from '../components/ui/Pill';
import { RiskChip } from '../components/ui/RiskChip';
import { DataTable } from '../components/ui/DataTable';
import { useAppContext } from '../context/AppContext';
import { Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { apiFetch } from '../api/api';

export default function Dashboard() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await apiFetch('/api/v1/contracts');
        if (res.ok) {
          const data = await res.json();
          // Assuming it returns an array of contracts
          if (Array.isArray(data)) {
            const mapped = data.map((c: any) => ({
              id: c.id || c.contract_id,
              name: c.name || c.filename || 'Untitled Contract',
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
        } else {
          throw new Error('Failed to load contracts');
        }
      } catch (err) {
        setError('Could not load contracts. Backend might be unavailable.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContracts();
  }, []);

const velocityData = [
  { month: 'Nov', volume: 4, speed: 6 },
  { month: 'Dec', volume: 7, speed: 5.5 },
  { month: 'Jan', volume: 6, speed: 4.8 },
  { month: 'Feb', volume: 10, speed: 4.2 },
  { month: 'Mar (Proj)', volume: 14, speed: 3.8 },
];

  const { openRiskDigestModal } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      {/* Top Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mb-8">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col justify-center" style={{ boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04), 0 6px 16px -4px rgba(31,36,33,0.06)' }}>
          <Pill className="self-start mb-4 text-[10px] bg-surface-container-low border-transparent">● AUTONOMOUS LEGAL INTEL ENGINE</Pill>
          <h2 className="text-headline-md text-ink-heavy mb-2">Good morning, Elena.</h2>
          <p className="text-body-md text-ink-subdued mb-6">Your AI agent redlined 4 agreements this week with a 100% adherence to your creative studio fallback handbook.</p>
          <div className="flex items-center gap-6 text-label-sm text-ink-body font-medium mt-auto">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-accent-primary text-[16px]">shield</span> Zero critical breaches unflagged</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-ink-subdued text-[16px]">lock_clock</span> Next review cue: 14:00 EST</span>
          </div>
        </div>

        <div className="bg-accent-deep rounded-2xl p-8 text-white flex flex-col relative overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04), 0 6px 16px -4px rgba(31,36,33,0.06)' }}>
          <Pill className="self-start mb-4 text-[10px] bg-risk-medium-surface text-risk-medium-text border-transparent">⚠ WEEKLY EXPOSURE SHIELD</Pill>
          <h2 className="text-headline-md mb-2">$14,800 in unbilled scope protected</h2>
          <p className="text-body-sm text-accent-muted-tint mb-6 max-w-[85%]">0 uncapped indemnity clauses accepted across 4 multi-stakeholder service contracts.</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-label-sm text-accent-pale-wash opacity-80">Audit trail verified for all changes</span>
            <button onClick={openRiskDigestModal} className="text-label-md font-semibold text-accent-primary bg-white px-3 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors">
              Download Digest ↗
            </button>
          </div>
          <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[120px] text-accent-primary opacity-20 pointer-events-none">security</span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Contracts', value: '12', sub: '+3 this week' },
          { label: 'Risk Issues Caught', value: '38', sub: '14 High · 18 Med · 6 Low' },
          { label: 'Avg. Turnaround Time', value: '4.2 hrs', sub: '↓ from 3.5 days · 91% faster velocity' },
          { label: 'Estimated Revenue Saved', value: '$42.6k', sub: 'Avoided scope creep & kill fees' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col" style={{ boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04), 0 6px 16px -4px rgba(31,36,33,0.06)' }}>
            <div className="text-label-sm text-ink-subdued uppercase mb-2">{stat.label}</div>
            <div className="text-headline-lg text-ink-heavy mb-2">{stat.value}</div>
            <div className="text-body-sm text-ink-subdued mt-auto">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Upcoming Deadlines Widget */}
      <div className="bg-white rounded-2xl border border-gray-100 mb-8 overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04), 0 6px 16px -4px rgba(31,36,33,0.06)' }}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-risk-medium-text text-[20px]">notifications_active</span>
          <h3 className="text-headline-sm text-ink-heavy">Upcoming Deadlines</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { id: 1, name: 'Vector Labs Retainer', cp: 'Vector Labs', clause: 'Auto-renews unless cancelled 30 days prior', date: 'Oct 15 (in 4 days)', urgency: 'amber' },
            { id: 2, name: 'Q3 Deliverable Milestone', cp: 'Studio Arch', clause: 'Final milestone invoice due upon delivery', date: 'Oct 18 (in 7 days)', urgency: 'amber' },
          ].map(dl => (
            <div key={dl.id} className="p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container-low/50 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-body-md">{dl.name}</span>
                  <span className="text-label-sm text-ink-subdued bg-surface-container-high px-2 py-0.5 rounded">{dl.cp}</span>
                  <RiskChip level="medium" label={dl.date} className="h-5 text-[10px]" />
                </div>
                <div className="text-body-sm text-ink-subdued">{dl.clause}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-accent-muted-tint text-accent-primary text-label-md rounded-lg hover:bg-accent-pale-wash transition-colors">Draft cancellation notice</button>
                <button className="p-1.5 text-ink-subdued hover:bg-gray-100 rounded-lg transition-colors" title="Remind me later"><span className="material-symbols-outlined text-[18px]">alarm_add</span></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04), 0 6px 16px -4px rgba(31,36,33,0.06)' }}>
          <div className="mb-6">
            <h3 className="text-headline-sm text-ink-heavy mb-1">Contract Velocity & Review Volume</h3>
            <p className="text-body-sm text-ink-subdued">Monthly agreements parsed vs. median hours to execute redline draft</p>
          </div>
          <div className="h-64 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={velocityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#636B66' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#636B66' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={false} />
                <Tooltip cursor={{fill: '#F0F5F0'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar yAxisId="left" dataKey="volume" fill="#CBE3D5" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Line yAxisId="right" type="monotone" dataKey="speed" stroke="#2F6B4F" strokeWidth={3} dot={{ r: 4, fill: '#2F6B4F', strokeWidth: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 text-label-sm">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-accent-muted-tint rounded-sm" /> <span className="text-ink-subdued">Volume</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-1 bg-accent-primary rounded-sm" /> <span className="text-ink-subdued">Speed (hrs)</span></div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-label-sm">
            <span className="text-accent-primary font-medium">↗ Avg counterparty negotiation cycle has compressed by 68%.</span>
            <span className="text-ink-subdued">Refreshed 18m ago</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04), 0 6px 16px -4px rgba(31,36,33,0.06)' }}>
          <div className="mb-6">
            <h3 className="text-headline-sm text-ink-heavy mb-1">Top Flagged Clauses</h3>
            <p className="text-body-sm text-ink-subdued">Breakdown of standard contract liabilities intercepted</p>
          </div>
          
          <div className="mb-8">
            <div className="text-label-sm font-semibold mb-2 text-ink-body">Overall Risk Distribution</div>
            <div className="h-8 w-full flex rounded-full overflow-hidden mb-2">
              <div className="bg-risk-medium-text h-full" style={{ width: '38%' }}></div>
              <div className="bg-risk-high-text h-full" style={{ width: '27%' }}></div>
              <div className="bg-accent-primary h-full" style={{ width: '20%' }}></div>
              <div className="bg-ink-subdued h-full" style={{ width: '15%' }}></div>
            </div>
            <div className="text-body-sm text-ink-subdued">94 Total Clauses</div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-risk-medium-text" />
                <div>
                  <div className="font-semibold text-body-sm">Late Payment Terms</div>
                  <div className="text-body-sm text-ink-subdued">Net 60+ detected</div>
                </div>
              </div>
              <div className="font-semibold text-body-md">38%</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-risk-high-text" />
                <div>
                  <div className="font-semibold text-body-sm">Uncapped Indemnity</div>
                  <div className="text-body-sm text-ink-subdued">Unlimited exposure</div>
                </div>
              </div>
              <div className="font-semibold text-body-md">27%</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-primary" />
                <div>
                  <div className="font-semibold text-body-sm">Scope Creep / Revisions</div>
                  <div className="text-body-sm text-ink-subdued">Unlimited edit traps</div>
                </div>
              </div>
              <div className="font-semibold text-body-md">20%</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-ink-subdued" />
                <div>
                  <div className="font-semibold text-body-sm">IP Rights Pre-Payment</div>
                  <div className="text-body-sm text-ink-subdued">Assignment before fee</div>
                </div>
              </div>
              <div className="font-semibold text-body-md">15%</div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 text-right">
            <button className="text-label-md font-semibold text-accent-primary hover:underline">Configure Fallback Playbook Rules ⚙</button>
          </div>
        </div>
      </div>

      {/* Active Review Queue Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04), 0 6px 16px -4px rgba(31,36,33,0.06)' }}>
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-headline-sm text-ink-heavy mb-1">Active Review Queue</h3>
            <p className="text-body-sm text-ink-subdued">5 contracts requiring active governance or waiting on counterparty sign-off</p>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-subdued text-[18px]">search</span>
            <input type="text" placeholder="Filter agreements…" className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-body-sm focus:outline-none focus:border-accent-primary w-full md:w-64" />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-ink-subdued text-[18px] cursor-pointer">filter_list</span>
          </div>
        </div>
        
        <DataTable 
          columns={[
            { header: 'Contract Name', accessor: (row) => <div><div className="font-semibold text-ink-body mb-0.5">{row.name}</div><div className="text-ink-subdued text-[11px] uppercase tracking-wider">{row.meta}</div></div> },
            { header: 'Counterparty', accessor: (row) => <div className="text-ink-body font-medium pt-1">{row.counterparty}</div> },
            { header: 'Risk Level', accessor: (row) => <div className="pt-1"><RiskChip level={row.risk as any} label={`${row.risk} risk`} /></div> },
            { header: 'Key Flagged Clauses', accessor: (row) => <div className="text-ink-subdued pt-1 truncate max-w-xs">{row.clauses}</div> },
            { header: 'Agent Status', accessor: (row) => <div className="pt-1"><Pill>{row.status}</Pill></div> },
            { header: 'Actions', accessor: (row) => (
                <div className="pt-1">
                  <Link to={`/workspace?contractId=${row.id}`}>
                    <span className={`text-label-md font-semibold cursor-pointer hover:underline ${row.actionType === 'primary' ? 'text-accent-primary' : 'text-ink-body'}`}>{row.action}</span>
                  </Link>
                </div>
              ) 
            },
          ]}
          data={contracts}
        />
        {error && (
          <div className="text-center p-8 text-red-500 border-t border-gray-100">{error}</div>
        )}
        {contracts.length === 0 && !isLoading && !error && (
          <div className="text-center p-8 text-ink-subdued border-t border-gray-100">No contracts found. Upload one to get started!</div>
        )}
        {isLoading && (
          <div className="text-center p-8 text-ink-subdued border-t border-gray-100">Loading contracts...</div>
        )}
        <div className="px-6 py-4 bg-surface-bright border-t border-gray-100 flex items-center justify-between text-body-sm text-ink-subdued">
          <span>Showing 5 of 12 active contracts</span>
          <div className="flex items-center gap-4">
            <button className="hover:text-ink-body">Previous</button>
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-pale-wash text-accent-primary font-semibold">1</span>
            <button className="hover:text-ink-body">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
