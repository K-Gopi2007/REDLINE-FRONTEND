import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Workspace from './pages/Workspace';
import Documents from './pages/Documents';
import Library from './pages/Library';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AccountMenu from './components/layout/AccountMenu';
import NewContractModal from './components/layout/NewContractModal';
import RiskDigestModal from './components/layout/RiskDigestModal';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { useAppContext } from './context/AppContext';

const AppLayout = ({ children, isPublic }: { children: React.ReactNode, isPublic?: boolean }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-on-background">
      <Navbar isPublic={isPublic} />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      {isPublic && <Footer />}
      {!isPublic && <AccountMenu />}
      <NewContractModal />
      <RiskDigestModal />
    </div>
  );
};

function App() {
  const { isAuthenticated } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout isPublic><Landing /></AppLayout>} />
        <Route path="/sign-in" element={<AppLayout isPublic><SignIn /></AppLayout>} />
        <Route path="/terms" element={<AppLayout isPublic><TermsOfService /></AppLayout>} />
        <Route path="/privacy" element={<AppLayout isPublic><PrivacyPolicy /></AppLayout>} />
        
        <Route path="/dashboard" element={
          isAuthenticated ? <AppLayout><Dashboard /></AppLayout> : <Navigate to="/sign-in" />
        } />
        <Route path="/workspace" element={
          isAuthenticated ? <AppLayout><Workspace /></AppLayout> : <Navigate to="/sign-in" />
        } />
        <Route path="/documents/:id" element={
          isAuthenticated ? <AppLayout><Documents /></AppLayout> : <Navigate to="/sign-in" />
        } />
        <Route path="/library" element={
          isAuthenticated ? <AppLayout><Library /></AppLayout> : <Navigate to="/sign-in" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
