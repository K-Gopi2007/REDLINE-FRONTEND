import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { apiFetch } from '../../api/api';

export default function NewContractModal() {
  const { isNewContractModalOpen, closeNewContractModal } = useAppContext();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isNewContractModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSelectedOption('upload');
      setUploadError(null);
    }
  };

  const handleStartReview = async () => {
    if (selectedOption === 'upload' && file) {
      setIsUploading(true);
      setUploadError(null);
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await apiFetch('/api/v1/contracts/upload', {
          method: 'POST',
          body: formData as any, // apiFetch handles headers (doesn't set JSON content type)
        });

        if (!response.ok) {
          throw new Error('Upload failed. Backend might be unavailable or file is invalid.');
        }

        const data = await response.json();
        const contractId = data.id || data.contract_id;
        
        closeNewContractModal();
        navigate(`/workspace?contractId=${contractId}`);
      } catch (err: any) {
        setUploadError(err.message || 'An error occurred during upload.');
      } finally {
        setIsUploading(false);
      }
    } else {
      closeNewContractModal();
      navigate('/workspace');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink-heavy/35"
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={!isUploading ? closeNewContractModal : undefined}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden flex flex-col"
        style={{ boxShadow: '0 20px 32px -8px rgba(31,36,33,0.12)' }}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-headline-sm font-semibold">Start a new contract review</h2>
          <button 
            onClick={closeNewContractModal}
            disabled={isUploading}
            className="text-ink-subdued hover:text-ink-heavy transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {uploadError && (
          <div className="mx-6 mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-body-sm border border-red-100">
            {uploadError}
          </div>
        )}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: Upload */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden" 
          />
          <div 
            className={`border rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${selectedOption === 'upload' ? 'border-accent-primary bg-accent-faint-wash' : 'border-gray-200 hover:border-accent-muted-tint'} ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="material-symbols-outlined text-4xl text-accent-primary mb-3">
              {isUploading ? 'hourglass_empty' : 'upload_file'}
            </span>
            <h3 className="font-semibold text-body-lg mb-1">
              {file ? file.name : 'Upload existing contract'}
            </h3>
            <p className="text-body-sm text-ink-subdued">
              {isUploading ? 'Uploading...' : 'Drag & drop or click to browse · PDF or DOCX, max 20MB'}
            </p>
          </div>

          {/* Option 2: Template */}
          <div 
            className={`border rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${selectedOption === 'template' ? 'border-accent-primary bg-accent-faint-wash' : 'border-gray-200 hover:border-accent-muted-tint'} ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => { setSelectedOption('template'); setFile(null); }}
          >
            <span className="material-symbols-outlined text-4xl text-accent-primary mb-3">description</span>
            <h3 className="font-semibold text-body-lg mb-3">Start from a template</h3>
            <div className="grid grid-cols-2 gap-2 w-full">
              {['NDA', 'MSA', 'SOW', 'Freelance Service Agreement'].map(t => (
                <div key={t} className="bg-surface-container-low border border-gray-200 text-[10px] uppercase font-semibold text-ink-subdued py-1 px-2 rounded truncate">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-surface-bright">
          <Button variant="ghost" onClick={closeNewContractModal} disabled={isUploading}>Cancel</Button>
          <Button variant="primary" disabled={!selectedOption || isUploading} onClick={handleStartReview}>
            {isUploading ? 'Processing contract...' : 'Start Review →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
