
import { FileText, Search, ZoomIn, ZoomOut, Download, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export function DocumentViewer({ contractId }: { contractId: string }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-white/40 backdrop-blur-xl border-r border-white/20 relative overflow-hidden">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/40 bg-white/30 backdrop-blur-md z-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
            <FileText size={16} />
          </div>
          <span className="text-sm font-medium text-ink-heavy truncate max-w-[150px]">
            Contract {contractId}
          </span>
        </div>
        <div className="flex items-center gap-1 text-ink-subdued">
          <button className="p-1.5 hover:bg-white/60 rounded-md transition-colors"><Search size={16} /></button>
          <button className="p-1.5 hover:bg-white/60 rounded-md transition-colors"><ZoomOut size={16} /></button>
          <button className="p-1.5 hover:bg-white/60 rounded-md transition-colors"><ZoomIn size={16} /></button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <button className="p-1.5 hover:bg-white/60 rounded-md transition-colors"><Download size={16} /></button>
          <button className="p-1.5 hover:bg-white/60 rounded-md transition-colors"><MoreHorizontal size={16} /></button>
        </div>
      </div>

      {/* Document Content Mock */}
      <div className="flex-1 overflow-y-auto p-8 relative scrollbar-hide">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 rounded-sm p-12 min-h-[800px] max-w-2xl mx-auto space-y-8"
        >
          <div className="w-3/4 h-8 bg-gray-100/80 rounded-md animate-pulse" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="w-1/3 h-5 bg-gray-100/80 rounded-md animate-pulse mb-4" />
              <div className="w-full h-3 bg-gray-50 rounded-sm" />
              <div className="w-5/6 h-3 bg-gray-50 rounded-sm" />
              <div className="w-full h-3 bg-gray-50 rounded-sm" />
              <div className="w-4/6 h-3 bg-gray-50 rounded-sm" />
              <div className="w-full h-3 bg-gray-50 rounded-sm" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Glass gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
}
