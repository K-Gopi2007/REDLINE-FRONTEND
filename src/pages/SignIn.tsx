import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { API_URL } from '../api/api';
import { verifyGoogleToken } from '../services/googleAuth';

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
        
        // Auto-login after successful registration, or prompt to sign in
        // Some APIs return the token on register. Assuming we need to login now:
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
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
      {/* Ambient Sage Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-body-sm text-ink-subdued hover:text-ink-heavy mb-8 transition-colors">
          <span className="material-symbols-outlined text-[16px] mr-1">arrow_back</span>
          Back to home
        </Link>
        
        <GlassCard className="p-8">
          {/* Tab Toggle */}
          <div className="flex p-1 bg-surface-container-low rounded-full mb-8">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-2 text-label-md rounded-full transition-all ${tab === 'signin' ? 'bg-accent-primary text-white shadow-sm' : 'text-ink-subdued hover:text-ink-body'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 text-label-md rounded-full transition-all ${tab === 'signup' ? 'bg-accent-primary text-white shadow-sm' : 'text-ink-subdued hover:text-ink-body'}`}
            >
              Sign Up
            </button>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-body-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {tab === 'signup' && (
              <div>
                <label className="block text-label-md text-ink-body mb-2">Full name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-white border border-accent-muted-tint rounded-lg focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-pale-wash transition-all text-body-md"
                  placeholder="Maya Lin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-label-md text-ink-body mb-2">Email address</label>
              <input 
                type="email" 
                className="w-full px-4 py-2.5 bg-white border border-accent-muted-tint rounded-lg focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-pale-wash transition-all text-body-md"
                placeholder="maya@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-label-md text-ink-body">Password</label>
                {tab === 'signin' && (
                  <a href="#forgot-password" onClick={(e) => e.preventDefault()} className="text-label-sm text-accent-primary hover:underline">Forgot password?</a>
                )}
              </div>
              <input 
                type="password" 
                className="w-full px-4 py-2.5 bg-white border border-accent-muted-tint rounded-lg focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-pale-wash transition-all text-body-md"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {tab === 'signup' && (
              <div className="flex items-start gap-3 mt-2">
                <input type="checkbox" id="terms" className="mt-1" required />
                <label htmlFor="terms" className="text-body-sm text-ink-subdued">
                  I agree to the <Link to="/terms" className="text-accent-primary hover:underline">Terms</Link> & <Link to="/privacy" className="text-accent-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full mt-2 flex justify-center items-center" size="lg" disabled={isLoading}>
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
              ) : null}
              {tab === 'signin' ? 'Sign In →' : 'Create Free Account →'}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-label-sm text-ink-subdued uppercase">or</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleGoogleLogin()}
            disabled={isGoogleLoading || isLoading}
          >
            {isGoogleLoading ? (
              <span className="material-symbols-outlined animate-spin w-5 h-5 flex items-center justify-center">progress_activity</span>
            ) : (
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            )}
            Continue with Google
          </Button>

          <div className="mt-8 text-center text-body-sm text-ink-subdued">
            {tab === 'signin' ? (
              <>Don't have an account? <button onClick={() => setTab('signup')} className="font-semibold text-ink-heavy hover:text-accent-primary">Sign Up</button></>
            ) : (
              <>Already have an account? <button onClick={() => setTab('signin')} className="font-semibold text-ink-heavy hover:text-accent-primary">Sign In</button></>
            )}
          </div>
        </GlassCard>

        <div className="mt-8 text-center text-label-sm text-ink-subdued flex justify-center items-center gap-6 opacity-80">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">lock</span> Bank-grade encryption</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">shield</span> Zero model training on your data</span>
        </div>
      </div>
    </div>
  );
}
