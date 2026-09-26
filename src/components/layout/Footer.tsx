import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-body-sm text-ink-subdued border-t border-gray-100 mt-12">
      <div>REDLINE — Autonomous Contract Intelligence</div>
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <Link to="/terms" className="hover:text-accent-primary transition-colors">Terms of Service</Link>
        <Link to="/privacy" className="hover:text-accent-primary transition-colors">Privacy Policy</Link>
      </div>
      <div className="mt-4 md:mt-0">© 2025 REDLINE Legal AI Inc. All rights reserved.</div>
    </footer>
  );
}
