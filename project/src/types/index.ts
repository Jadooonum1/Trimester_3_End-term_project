export interface Job {
  id: string;
  company: string;
  position: string;
  location: string;
  status: JobStatus;
  url?: string;
  description?: string;
  salary?: string;
  notes?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  dateApplied: string;
  dateModified: string;
  nextSteps?: string;
  nextInterviewDate?: string;
}

export type JobStatus = 'applied' | 'interviewing' | 'offer' | 'rejected';

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  notes?: string;
  dateAdded: string;
}

export interface DashboardStats {
  totalApplications: number;
  activeApplications: number;
  interviews: number;
  offers: number;
  rejected: number;
  responseRate: number;
}