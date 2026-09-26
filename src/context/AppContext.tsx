import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AppContextType {
  isAuthenticated: boolean;
  user: { email: string; id?: string } | null;
  login: (token: string) => void;
  logout: () => void;
  isNewContractModalOpen: boolean;
  openNewContractModal: () => void;
  closeNewContractModal: () => void;
  isRiskDigestModalOpen: boolean;
  openRiskDigestModal: () => void;
  closeRiskDigestModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [user, setUser] = useState<{ email: string; id?: string } | null>(null);
  const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false);
  const [isRiskDigestModalOpen, setIsRiskDigestModalOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { apiFetch } = await import('../api/api');
          const res = await apiFetch('/api/v1/auth/me');
          if (res.ok) {
            const data = await res.json();
            setUser(data);
            setIsAuthenticated(true);
          } else {
            logout();
          }
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          logout();
        }
      }
    };
    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    // Refresh page or manually trigger checkAuth, but for now we rely on the next navigation
    // Better to fetch user data here too
    import('../api/api').then(({ apiFetch }) => {
      apiFetch('/api/v1/auth/me').then(res => {
        if(res.ok) {
          res.json().then(setUser);
        }
      });
    });
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };
  
  const openNewContractModal = () => setIsNewContractModalOpen(true);
  const closeNewContractModal = () => setIsNewContractModalOpen(false);

  const openRiskDigestModal = () => setIsRiskDigestModalOpen(true);
  const closeRiskDigestModal = () => setIsRiskDigestModalOpen(false);

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      isNewContractModalOpen,
      openNewContractModal,
      closeNewContractModal,
      isRiskDigestModalOpen,
      openRiskDigestModal,
      closeRiskDigestModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
