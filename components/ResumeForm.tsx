
import React from 'react';
import { ResumeData, Experience, Education } from '../types';
import { PlusIcon, TrashIcon } from './icons';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const formSectionClasses = "bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md space-y-4";
const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300";
const inputClasses = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 dark:text-slate-100";
const buttonClasses = "flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm";
const addButtonClasses = `${buttonClasses} text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`;
const removeButtonClasses = `${buttonClasses} text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`;

const PersonalDetailsSection: React.FC<{ data: ResumeData, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ data, handleChange }) => (
    <div className={formSectionClasses}>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Personal Details</h2>
        <div>
            <label htmlFor="fullName" className={labelClasses}>Full Name</label>
            <input type="text" name="fullName" id="fullName" value={data.fullName} onChange={handleChange} className={inputClasses} placeholder="John Doe" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="email" className={labelClasses}>Email</label>
                <input type="email" name="email" id="email" value={data.email} onChange={handleChange} className={inputClasses} placeholder="john.doe@example.com" />
            </div>
            <div>
                <label htmlFor="phone" className={labelClasses}>Phone</label>
                <input type="tel" name="phone" id="phone" value={data.phone} onChange={handleChange} className={inputClasses} placeholder="(123) 456-7890" />
            </div>
        </div>
        <div>
            <label htmlFor="linkedin" className={labelClasses}>LinkedIn Profile URL</label>
            <input type="url" name="linkedin" id="linkedin" value={data.linkedin} onChange={handleChange} className={inputClasses} placeholder="linkedin.com/in/johndoe" />
        </div>
    </div>
);

const SummarySection: React.FC<{ data: ResumeData, handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }> = ({ data, handleTextAreaChange }) => (
    <div className={formSectionClasses}>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Professional Summary</h2>
        <textarea name="summary" value={data.summary} onChange={handleTextAreaChange} className={inputClasses} rows={4} placeholder="A brief summary of your career..."></textarea>
    </div>
);

const SkillsSection: React.FC<{ data: ResumeData, handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }> = ({ data, handleTextAreaChange }) => (
    <div className={formSectionClasses}>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Skills</h2>
        <textarea name="skills" value={data.skills} onChange={handleTextAreaChange} className={inputClasses} rows={3} placeholder="JavaScript, React, Node.js, Project Management..."></textarea>
        <p className="text-xs text-slate-500 dark:text-slate-400">Enter skills separated by commas.</p>
    </div>
);

const ExperienceSection: React.FC<{ data: Experience[], handleExperienceChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, addExperience: () => void, removeExperience: (id: string) => void }> = ({ data, handleExperienceChange, addExperience, removeExperience }) => (
    <div className={formSectionClasses}>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Work Experience</h2>
        {data.map((exp, index) => (
            <div key={exp.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200">Job #{index + 1}</h3>
                    <button onClick={() => removeExperience(exp.id)} className={removeButtonClasses}><TrashIcon /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor={`jobTitle-${exp.id}`} className={labelClasses}>Job Title</label>
                        <input type="text" name="jobTitle" id={`jobTitle-${exp.id}`} value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} className={inputClasses} placeholder="Software Engineer" />
                    </div>
                    <div>
                        <label htmlFor={`company-${exp.id}`} className={labelClasses}>Company</label>
                        <input type="text" name="company" id={`company-${exp.id}`} value={exp.company} onChange={(e) => handleExperienceChange(index, e)} className={inputClasses} placeholder="Tech Corp" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor={`startDate-${exp.id}`} className={labelClasses}>Start Date</label>
                        <input type="text" name="startDate" id={`startDate-${exp.id}`} value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} className={inputClasses} placeholder="Jan 2020" />
                    </div>
                    <div>
                        <label htmlFor={`endDate-${exp.id}`} className={labelClasses}>End Date</label>
                        <input type="text" name="endDate" id={`endDate-${exp.id}`} value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} className={inputClasses} placeholder="Present" />
                    </div>
                </div>
                <div>
                    <label htmlFor={`description-${exp.id}`} className={labelClasses}>Description / Achievements</label>
                    <textarea name="description" id={`description-${exp.id}`} value={exp.description} onChange={(e) => handleExperienceChange(index, e)} className={inputClasses} rows={4} placeholder="Describe your responsibilities and achievements..."></textarea>
                </div>
            </div>
        ))}
        <button onClick={addExperience} className={addButtonClasses}><PlusIcon /> Add Experience</button>
    </div>
);

const EducationSection: React.FC<{ data: Education[], handleEducationChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void, addEducation: () => void, removeEducation: (id: string) => void }> = ({ data, handleEducationChange, addEducation, removeEducation }) => (
    <div className={formSectionClasses}>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Education</h2>
        {data.map((edu, index) => (
            <div key={edu.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                     <h3 className="font-semibold text-slate-700 dark:text-slate-200">Entry #{index + 1}</h3>
                    <button onClick={() => removeEducation(edu.id)} className={removeButtonClasses}><TrashIcon /></button>
                </div>
                <div>
                    <label htmlFor={`degree-${edu.id}`} className={labelClasses}>Degree / Certificate</label>
                    <input type="text" name="degree" id={`degree-${edu.id}`} value={edu.degree} onChange={(e) => handleEducationChange(index, e)} className={inputClasses} placeholder="B.S. in Computer Science" />
                </div>
                <div>
                    <label htmlFor={`institution-${edu.id}`} className={labelClasses}>Institution</label>
                    <input type="text" name="institution" id={`institution-${edu.id}`} value={edu.institution} onChange={(e) => handleEducationChange(index, e)} className={inputClasses} placeholder="State University" />
                </div>
                <div>
                    <label htmlFor={`graduationDate-${edu.id}`} className={labelClasses}>Graduation Date</label>
                    <input type="text" name="graduationDate" id={`graduationDate-${edu.id}`} value={edu.graduationDate} onChange={(e) => handleEducationChange(index, e)} className={inputClasses} placeholder="May 2019" />
                </div>
            </div>
        ))}
        <button onClick={addEducation} className={addButtonClasses}><PlusIcon /> Add Education</button>
    </div>
);

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, [name]: value }));
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, [name]: value }));
    }

    const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => {
            const newExperience = [...prev.experience];
            newExperience[index] = { ...newExperience[index], [name]: value };
            return { ...prev, experience: newExperience };
        });
    };

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { id: crypto.randomUUID(), jobTitle: '', company: '', startDate: '', endDate: '', description: '' }]
        }));
    };

    const removeExperience = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => {
            const newEducation = [...prev.education];
            newEducation[index] = { ...newEducation[index], [name]: value };
            return { ...prev, education: newEducation };
        });
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { id: crypto.randomUUID(), degree: '', institution: '', graduationDate: '' }]
        }));
    };
    
    const removeEducation = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    return (
        <form className="space-y-6">
            <PersonalDetailsSection data={resumeData} handleChange={handleChange} />
            <SummarySection data={resumeData} handleTextAreaChange={handleTextAreaChange} />
            <SkillsSection data={resumeData} handleTextAreaChange={handleTextAreaChange} />
            <ExperienceSection data={resumeData.experience} handleExperienceChange={handleExperienceChange} addExperience={addExperience} removeExperience={removeExperience} />
            <EducationSection data={resumeData.education} handleEducationChange={handleEducationChange} addEducation={addEducation} removeEducation={removeEducation} />
        </form>
    );
};

export default ResumeForm;
