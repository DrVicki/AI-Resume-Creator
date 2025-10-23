
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, LoadingSpinner } from './icons';

interface ResumeDisplayProps {
  resumeText: string;
  isLoading: boolean;
  error: string | null;
}

const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ resumeText, isLoading, error }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setIsCopied(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <LoadingSpinner />
          <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-300">Generating your resume...</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">The AI is working its magic!</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                <h3 className="font-bold">An Error Occurred</h3>
                <p className="text-sm">{error}</p>
            </div>
        </div>
      );
    }

    if (!resumeText) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <img src="https://picsum.photos/seed/resume/200/200" alt="Document icon" className="w-24 h-24 rounded-full opacity-50 mb-4" />
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">Your resume will appear here</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Fill out the form and click "Generate" to start.</p>
        </div>
      );
    }

    return (
      <>
        <div className="absolute top-4 right-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors duration-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100"
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="whitespace-pre-wrap font-sans text-sm text-slate-800 dark:text-slate-200 p-8 pt-16">
          {resumeText}
        </pre>
      </>
    );
  };

  return (
    <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 min-h-[400px] lg:min-h-full flex flex-col justify-center">
      {renderContent()}
    </div>
  );
};

export default ResumeDisplay;
