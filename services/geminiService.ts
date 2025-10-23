
import { GoogleGenAI } from "@google/genai";
import { ResumeData } from '../types';

const formatPrompt = (data: ResumeData): string => {
  const experienceString = data.experience.map(exp => 
    `- Job Title: ${exp.jobTitle}\n  Company: ${exp.company}\n  Dates: ${exp.startDate} - ${exp.endDate}\n  Description: ${exp.description}`
  ).join('\n\n');

  const educationString = data.education.map(edu =>
    `- Degree: ${edu.degree}\n  Institution: ${edu.institution}\n  Graduation Date: ${edu.graduationDate}`
  ).join('\n\n');

  return `
You are a world-class professional resume writer. Your task is to generate a clean, professional, and well-formatted resume in Markdown format based on the JSON data provided below.

**Instructions:**
1.  Create a clear, concise, and impactful resume.
2.  Use standard Markdown for formatting (e.g., '#' for name, '##' for sections, '*' for bullet points).
3.  The sections should be: Summary, Skills, Experience, and Education.
4.  For the Experience section, format each job with the title, company, dates, and a bulleted list of responsibilities and achievements from the description.
5.  Ensure the contact information (Email, Phone, LinkedIn) is presented cleanly under the candidate's name.
6.  The final output must be only the resume content in Markdown, with no extra commentary or explanations.

**Candidate Information:**
\`\`\`json
{
  "fullName": "${data.fullName}",
  "email": "${data.email}",
  "phone": "${data.phone}",
  "linkedin": "${data.linkedin}",
  "summary": "${data.summary}",
  "skills": "${data.skills}",
  "experience": [
    ${data.experience.map(e => JSON.stringify(e)).join(',\n    ')}
  ],
  "education": [
    ${data.education.map(e => JSON.stringify(e)).join(',\n    ')}
  ]
}
\`\`\`
  `;
};


export const generateResume = async (data: ResumeData): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = formatPrompt(data);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating resume:", error);
        throw new Error("Failed to generate resume. Please check the console for details.");
    }
};
