import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import { GlassCard } from '../components/ui/GlassCard';

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient Sage Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-24">
          <Pill className="mb-8 font-semibold tracking-widest text-[10px] bg-white">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mr-2" />
            AI CONTRACT INTELLIGENCE FOR INDEPENDENT WORK
          </Pill>
          <h1 className="text-display max-w-4xl text-ink-heavy mb-6">
            Never sign a bad clause again. Your autonomous contract copilot.
          </h1>
          <p className="text-body-lg text-ink-subdued max-w-2xl mb-10">
            Draft, redline, and negotiate client agreements in minutes. Built specifically for freelance designers, engineers, and boutique agencies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/sign-in?tab=signup">
              <Button variant="primary" size="lg">
                <span className="material-symbols-outlined mr-2 text-[20px]">play_arrow</span>
                Start Reviewing Free
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Demo Mock */}
        <GlassCard className="w-full max-w-5xl mx-auto overflow-hidden mb-24">
          {/* Chrome bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50 bg-white/40">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span className="ml-4 text-label-sm text-ink-subdued font-medium">MSA_StudioApex_v3_counter.pdf</span>
            </div>
            <div className="flex gap-4 text-label-sm font-semibold">
              <span className="text-accent-primary">+$4,200 IP rights protected</span>
              <span className="text-risk-high-text flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-risk-high-text" /> 3 High-Risk Traps Detected</span>
              <span className="text-accent-primary flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent-primary" /> Auto-Redline Active</span>
            </div>
          </div>
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] min-h-[400px] bg-white/60">
            <div className="p-8 border-r border-gray-200/50">
              <div className="text-label-sm text-ink-subdued mb-4 uppercase tracking-wider">SECTION 8.2 — INTELLECTUAL PROPERTY & DELIVERABLES <span className="ml-2 lowercase font-normal">Line 142–158</span></div>
              <div className="text-body-md text-ink-body leading-relaxed space-y-4">
                <p>
                  <span className="bg-risk-high-surface text-risk-high-text line-through">The original clause would grant the client permanent, perpetual, worldwide license to the client and design libraries created prior to alongside the Engagement.</span>
                </p>
                <p>
                  <span className="bg-risk-low-surface text-risk-low-text underline decoration-2 underline-offset-4">Contractor retains full ownership of all pre-existing intellectual property and proprietary tools. Client is granted a non-exclusive, limited license solely for the deliverables specified in this Engagement.</span>
                </p>
              </div>
            </div>
            <div className="p-6 bg-surface-container-low/50 flex flex-col gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-risk-high-outline">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-risk-high-text text-[18px]">warning</span>
                  <span className="font-semibold text-body-sm text-risk-high-text">Broad IP Forfeiture Trap</span>
                  <span className="ml-auto text-[10px] uppercase font-bold text-risk-high-text bg-risk-high-surface px-2 py-0.5 rounded">Critical</span>
                </div>
                <p className="text-body-sm text-ink-subdued mb-2">The original clause would grant the client permanent, perpetual, worldwide license to the client and design libraries created prior to alongside the Engagement.</p>
                <p className="text-label-sm font-semibold text-ink-body">Standard SMB exposure: $3,500–$15,000</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-body-sm text-ink-body">Counter-Proposal Email</span>
                  <button className="text-accent-primary text-label-sm font-semibold hover:underline">Copy Draft</button>
                </div>
                <div className="bg-surface-variant/30 p-3 rounded-lg text-body-sm italic text-ink-subdued">
                  "Hi Team, I noticed Section 8.2 inadvertently transfers ownership of my pre-existing studio IP. I've updated this to a standard limited license..."
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Bar */}
          <div className="px-6 py-4 border-t border-gray-200/50 bg-white/80 flex items-center justify-between">
            <div className="text-body-sm font-medium text-ink-body flex items-center gap-2">
              <span className="material-symbols-outlined text-accent-primary text-[18px]">check_circle</span>
              Suggested counter-language inserted — Protects freelance studio IP portfolio from complete forfeiture
            </div>
            <Button variant="primary" size="sm">Accept Redline</Button>
          </div>
          <div className="px-4 py-2 bg-ink-heavy text-white text-[10px] font-medium flex items-center justify-between uppercase tracking-wider">
            <span>🔒 256-bit ephemeral sandbox</span>
            <span>Reviewed in 3.4 seconds</span>
          </div>
        </GlassCard>

        {/* Trust Strip */}
        <div className="text-center mb-32">
          <p className="text-label-sm text-ink-subdued uppercase tracking-widest mb-8">
            Trusted by 12,000+ independent consultants, studios, and agencies from top creative networks
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            <span className="text-xl font-bold font-serif">Studio Arch</span>
            <span className="text-xl font-bold tracking-tighter">Hypercraft</span>
            <span className="text-xl font-bold italic">Vector Labs</span>
            <span className="text-xl font-bold font-mono">Nexus Media</span>
            <span className="text-xl font-bold tracking-widest">Kinetic Digital</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="text-label-sm text-ink-subdued uppercase tracking-widest mb-4">ENGINEERED FOR SOVEREIGNTY</div>
            <h2 className="text-headline-lg text-ink-heavy mb-4">Your legal department, without the billable hours.</h2>
            <p className="text-body-lg text-ink-subdued max-w-2xl mx-auto">
              Every feature is tuned to neutralize the power imbalance between independent builders and enterprise procurement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-8">
              <span className="material-symbols-outlined text-accent-primary text-4xl mb-6">document_scanner</span>
              <h3 className="text-headline-sm mb-3">Autonomous Redlining</h3>
              <p className="text-body-md text-ink-subdued mb-6">Catches sneaky unlimited revisions, indemnification traps, and net-90 payment terms instantly. Highlights risks with crystal-clear explanations before you commit.</p>
              <div className="mt-auto text-label-sm font-semibold text-accent-primary pt-4 border-t border-gray-200/50">✓ Net-30 enforcement safeguard</div>
            </GlassCard>
            <GlassCard className="p-8">
              <span className="material-symbols-outlined text-accent-primary text-4xl mb-6">tune</span>
              <h3 className="text-headline-sm mb-3">Playbook Customization</h3>
              <p className="text-body-md text-ink-subdued mb-6">Define your non-negotiables once (kill fees, IP ownership, late fees) and let Redline enforce them automatically across all inbound client master service agreements.</p>
              <div className="mt-auto text-label-sm font-semibold text-accent-primary pt-4 border-t border-gray-200/50">✓ Standard 50% kill-fee integration</div>
            </GlassCard>
            <GlassCard className="p-8">
              <span className="material-symbols-outlined text-accent-primary text-4xl mb-6">mark_email_read</span>
              <h3 className="text-headline-sm mb-3">Counter-Proposal Generator</h3>
              <p className="text-body-md text-ink-subdued mb-6">Generates friendly, professional negotiation emails and redline markup clients actually accept. Keeps relationships warm while keeping your rights airtight.</p>
              <div className="mt-auto text-label-sm font-semibold text-accent-primary pt-4 border-t border-gray-200/50">✓ 94% counter-offer client approval rate</div>
            </GlassCard>
          </div>
        </div>

        {/* Testimonial & Free CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
          <GlassCard className="p-10 flex flex-col justify-center">
            <div className="flex gap-1 mb-6 text-[#F59E0B]">
              {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
            </div>
            <blockquote className="text-headline-sm font-normal italic text-ink-body mb-8 leading-relaxed">
              "Redline flagged an uncapped liability clause buried on page 14 of an enterprise client agreement that my previous lawyer had missed. It drafted a diplomatic counter-offer that they signed 2 hours later without friction. It paid for itself 50x over on day one."
            </blockquote>
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-12 h-12 rounded-full" alt="Elena Rostova" />
              <div>
                <div className="font-semibold text-body-sm text-ink-heavy">Elena Rostova</div>
                <div className="text-body-sm text-ink-subdued">Principal Product Designer, Studio Rostova</div>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-10 bg-accent-deep text-white border-transparent" style={{background: '#1B4332'}}>
            <Pill className="bg-accent-primary/50 text-white border-none mb-6">Free while in beta</Pill>
            <h2 className="text-headline-md mb-8">Everything you need, no credit card</h2>
            <ul className="space-y-4 mb-10 text-body-md text-accent-muted-tint">
              <li className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-accent-primary text-[20px]">check</span>
                Unlimited contract scans and instant redlines
              </li>
              <li className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-accent-primary text-[20px]">check</span>
                Autonomous counter-proposal email writer
              </li>
              <li className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-accent-primary text-[20px]">check</span>
                Custom playbook non-negotiables setup
              </li>
              <li className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-accent-primary text-[20px]">check</span>
                Bank-grade encryption and NDA compliance
              </li>
            </ul>
            <Link to="/sign-in?tab=signup">
              <Button className="w-full bg-white text-accent-deep hover:bg-surface-container-low focus:ring-white/50" size="lg">Get Started Free</Button>
            </Link>
          </GlassCard>
        </div>

        {/* Final CTA */}
        <GlassCard className="text-center p-16">
          <div className="text-label-sm text-ink-subdued uppercase tracking-widest mb-4">ZERO COMMITMENTS • EPHEMERAL ANALYSIS</div>
          <h2 className="text-headline-lg text-ink-heavy mb-6">Protect your livelihood before signing your next proposal.</h2>
          <p className="text-body-lg text-ink-subdued max-w-2xl mx-auto mb-10">
            Upload your existing client agreement in PDF or DOCX format. Get actionable redlines and complete risk coverage in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link to="/sign-in?tab=signup">
              <Button variant="primary" size="lg">Scan Your Contract Now</Button>
            </Link>
            <Button variant="ghost" size="lg">Talk to an Agent</Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-label-sm text-ink-subdued">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">lock</span> No credit card required</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">shield</span> Zero model training on your data</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
