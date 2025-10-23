
export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationDate: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  skills: string;
  experience: Experience[];
  education: Education[];
}
