import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { API_URL } from '../api/api';
import { verifyGoogleToken } from '../services/googleAuth';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Lock, Shield } from 'lucide-react';

export default function SignIn() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'signup' ? 'signup' : 'signin';
  const [tab, setTab] = useState<'signin' | 'signup'>(initialTab);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      setError(null);
      try {
        const data = await verifyGoogleToken(tokenResponse.access_token);
        if (data.access_token) {
          login(data.access_token);
          navigate('/dashboard');
        } else {
          throw new Error('Invalid response from server.');
        }
      } catch (err: any) {
        setError(err.message || 'Google authentication failed.');
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      setError('Google authentication was cancelled or failed.');
    }
  });

  useEffect(() => {
    if (searchParams.get('tab') === 'signup') {
      setTab('signup');
    }
  }, [searchParams]);

  useEffect(() => {
    setError(null);
  }, [tab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (tab === 'signup') {
        const res = await fetch(`${API_URL}/api/v1/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.detail || data.message || 'Registration failed. User might already exist.');
        }
        
        const loginRes = await fetch(`${API_URL}/api/v1/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({ username: email, password })
        });
        
        if (!loginRes.ok) {
          throw new Error('Registration successful, but auto-login failed. Please sign in manually.');
        }
        
        const loginData = await loginRes.json();
        if (loginData.access_token) {
          login(loginData.access_token);
          navigate('/dashboard');
        } else {
          throw new Error('Invalid response from server.');
        }

      } else {
        const res = await fetch(`${API_URL}/api/v1/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({ username: email, password })
        });
        
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.detail || data.message || 'Invalid credentials or backend unavailable.');
        }
        
        const data = await res.json();
        if (data.access_token) {
          login(data.access_token);
          navigate('/dashboard');
        } else {
          throw new Error('Invalid response from server.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'A network error occurred. Backend might be unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 overflow-hidden bg-transparent">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-ink-subdued hover:text-ink-heavy mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-1.5" />
          Back to home
        </Link>
        
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 p-8 rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.04)]">
          {/* Tab Toggle */}
          <div className="flex p-1 bg-gray-50/50 backdrop-blur-md border border-gray-100 rounded-xl mb-8 relative">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all z-10 ${tab === 'signin' ? 'text-ink-heavy' : 'text-ink-subdued hover:text-ink-body'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all z-10 ${tab === 'signup' ? 'text-ink-heavy' : 'text-ink-subdued hover:text-ink-body'}`}
            >
              Sign Up
            </button>
            <motion.div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm border border-gray-100"
              initial={false}
              animate={{ left: tab === 'signin' ? 4 : 'calc(50%)' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-md text-red-600 rounded-xl text-sm border border-red-100 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {tab === 'signup' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="block text-xs font-semibold text-ink-body mb-1.5 uppercase tracking-wider">Full name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all text-sm"
                  placeholder="Maya Lin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </motion.div>
            )}
            <div>
              <label className="block text-xs font-semibold text-ink-body mb-1.5 uppercase tracking-wider">Email address</label>
              <input 
                type="email" 
                className="w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all text-sm"
                placeholder="maya@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-ink-body uppercase tracking-wider">Password</label>
                {tab === 'signin' && (
                  <a href="#forgot-password" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-accent-primary hover:underline">Forgot password?</a>
                )}
              </div>
              <input 
                type="password" 
                className="w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {tab === 'signup' && (
              <div className="flex items-start gap-3 mt-2">
                <input type="checkbox" id="terms" className="mt-1 rounded text-accent-primary focus:ring-accent-primary" required />
                <label htmlFor="terms" className="text-xs text-ink-subdued leading-relaxed">
                  I agree to the <Link to="/terms" className="text-accent-primary hover:underline font-medium">Terms</Link> & <Link to="/privacy" className="text-accent-primary hover:underline font-medium">Privacy Policy</Link>
                </label>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full mt-2 flex justify-center items-center shadow-lg shadow-accent-primary/20 rounded-xl" size="lg" disabled={isLoading}>
              {isLoading && <Loader2 size={16} className="animate-spin mr-2" />}
              {tab === 'signin' ? 'Sign In →' : 'Create Free Account →'}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4 opacity-50">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-xs font-semibold text-ink-subdued uppercase tracking-widest">or</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2 bg-white/50 hover:bg-white/80 border border-gray-200 rounded-xl"
            onClick={() => {
              if (!import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.VITE_GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID') {
                setError('Missing Google Client ID. Please configure VITE_GOOGLE_CLIENT_ID in your environment.');
                return;
              }
              handleGoogleLogin();
            }}
            disabled={isGoogleLoading || isLoading}
          >
            {isGoogleLoading ? (
              <Loader2 size={20} className="animate-spin text-ink-subdued" />
            ) : (
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            )}
            <span className="font-medium text-ink-heavy">Continue with Google</span>
          </Button>

          <div className="mt-8 text-center text-sm text-ink-subdued">
            {tab === 'signin' ? (
              <>Don't have an account? <button onClick={() => setTab('signup')} className="font-semibold text-ink-heavy hover:text-accent-primary transition-colors">Sign Up</button></>
            ) : (
              <>Already have an account? <button onClick={() => setTab('signin')} className="font-semibold text-ink-heavy hover:text-accent-primary transition-colors">Sign In</button></>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-ink-subdued flex justify-center items-center gap-6 opacity-60 font-medium">
          <span className="flex items-center gap-1.5"><Lock size={14} /> Bank-grade encryption</span>
          <span className="flex items-center gap-1.5"><Shield size={14} /> Zero model training</span>
        </div>
      </motion.div>
    </div>
  );
}
