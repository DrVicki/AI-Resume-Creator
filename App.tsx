import React, { useState } from 'react';
import { ResumeData } from './types';
import ResumeForm from './components/ResumeForm';
import ResumeDisplay from './components/ResumeDisplay';
import { generateResume } from './services/geminiService';
import { SparklesIcon } from './components/icons';

const initialResumeData: ResumeData = {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: '',
    skills: '',
    experience: [],
    education: []
};


function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [generatedResume, setGeneratedResume] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedResume('');
    try {
      const result = await generateResume(resumeData);
      setGeneratedResume(result);
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred.');
        }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        AI Resume Creator
                    </h1>
                </div>
            </div>
        </header>

        <main className="container mx-auto p-4 sm:p-6 lg:p-8 pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:overflow-y-auto lg:max-h-[calc(100vh-12rem)] p-2">
                    <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
                </div>
                <div className="sticky top-20 h-full">
                    <ResumeDisplay 
                        resumeText={generatedResume} 
                        isLoading={isLoading} 
                        error={error} 
                    />
                </div>
            </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto flex justify-center">
                 <button 
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 text-base font-semibold text-white bg-sky-600 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    <SparklesIcon />
                    {isLoading ? 'Generating...' : 'Generate Resume with AI'}
                </button>
            </div>
        </footer>
    </div>
  );
}

export default App;