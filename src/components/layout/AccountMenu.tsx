import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { cn } from '../ui/Button';

export default function AccountMenu() {
  const [expanded, setExpanded] = useState(false);
  const { logout, user } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50">
      {expanded && (
        <div 
          className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-accent-pale-wash rounded-xl overflow-hidden"
          style={{ boxShadow: '0 4px 6px -1px rgba(31,36,33,0.06), 0 12px 24px -4px rgba(31,36,33,0.08)' }}
        >
          <div className="p-4 border-b border-gray-100">
            <div className="font-semibold text-body-sm">{user?.email?.split('@')[0] || 'User'}</div>
            <div className="text-label-sm text-ink-subdued mt-0.5">{user?.email || 'user@example.com'}</div>
          </div>
          <div className="p-2">
            <button className="w-full text-left px-3 py-2 text-body-sm hover:bg-surface-container-low rounded-lg transition-colors">
              Settings
            </button>
            <button className="w-full text-left px-3 py-2 text-body-sm hover:bg-surface-container-low rounded-lg transition-colors">
              Billing & Plan
            </button>
          </div>
          <div className="p-2 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-body-sm text-risk-high-text hover:bg-risk-high-surface rounded-lg transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex items-center gap-3 p-2 pr-4 bg-white border border-accent-muted-tint rounded-xl transition-colors hover:bg-accent-pale-wash",
          expanded ? "bg-accent-pale-wash" : ""
        )}
        style={{ boxShadow: '0 1px 3px 0 rgba(31,36,33,0.04), 0 6px 16px -4px rgba(31,36,33,0.06)' }}
      >
        <div className="w-8 h-8 rounded-full bg-surface-dim flex items-center justify-center text-accent-primary font-bold overflow-hidden">
          {/* Mock Avatar */}
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Maya Lin" className="w-full h-full object-cover" />
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-label-md font-semibold leading-tight text-ink-body">{user?.email?.split('@')[0] || 'User'}</span>
          <span className="text-body-sm text-ink-subdued leading-tight">Free plan</span>
        </div>
        <span className="material-symbols-outlined text-[16px] text-ink-subdued hidden md:block">
          {expanded ? 'expand_more' : 'more_horiz'}
        </span>
      </button>
    </div>
  );
}
