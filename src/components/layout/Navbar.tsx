import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Pill } from '../ui/Pill';
import { useAppContext } from '../../context/AppContext';
import { cn } from '../ui/Button';

export default function Navbar({ isPublic }: { isPublic?: boolean }) {
  const location = useLocation();
  const { openNewContractModal } = useAppContext();

  const appLinks = [
    { label: 'Workspace', path: '/workspace' },
    { label: 'Documents', path: '/documents/1' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Library', path: '/library' },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-transparent">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[18px]">article</span>
        </div>
        <span className="font-bold tracking-tight text-lg text-ink-heavy">REDLINE</span>
      </div>

      {/* Center: Links */}
      {isPublic ? (
        <div className="hidden md:flex items-center gap-8 text-body-sm font-medium">
          <a href="#features" className="text-ink-body hover:text-accent-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-ink-body hover:text-accent-primary transition-colors">How it works</a>
          <a href="#faq" className="text-ink-body hover:text-accent-primary transition-colors">FAQ</a>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-2 bg-surface-container-low p-1 rounded-full border border-gray-100">
          {appLinks.map(link => {
            const isActive = location.pathname.startsWith(link.path.split('/')[1] ? `/${link.path.split('/')[1]}` : 'not-found');
            return (
              <Link key={link.label} to={link.path}>
                <Pill active={isActive} className={cn("cursor-pointer border-none", isActive ? "shadow-sm" : "")}>
                  {link.label}
                </Pill>
              </Link>
            )
          })}
        </div>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {isPublic ? (
          <>
            <Link to="/sign-in">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/sign-in?tab=signup">
              <Button variant="primary" size="sm">Get Started Free</Button>
            </Link>
          </>
        ) : (
          <>
            <button className="relative p-2 text-ink-subdued hover:text-ink-heavy transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-risk-high-text ring-2 ring-background"></span>
            </button>
            <Button variant="primary" size="sm" onClick={openNewContractModal}>+ New Contract</Button>
          </>
        )}
      </div>
    </nav>
  );
}
