import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Job, JobStatus, Contact } from '../types';
import { getJobs, addJob, updateJob, deleteJob, getContacts, addContact, updateContact, deleteContact } from '../services/api';

interface State {
  jobs: Job[];
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'FETCH_JOBS_REQUEST' }
  | { type: 'FETCH_JOBS_SUCCESS'; payload: Job[] }
  | { type: 'FETCH_JOBS_FAILURE'; payload: string }
  | { type: 'ADD_JOB_SUCCESS'; payload: Job }
  | { type: 'UPDATE_JOB_SUCCESS'; payload: Job }
  | { type: 'DELETE_JOB_SUCCESS'; payload: string }
  | { type: 'FETCH_CONTACTS_SUCCESS'; payload: Contact[] }
  | { type: 'ADD_CONTACT_SUCCESS'; payload: Contact }
  | { type: 'UPDATE_CONTACT_SUCCESS'; payload: Contact }
  | { type: 'DELETE_CONTACT_SUCCESS'; payload: string };

interface JobContextProps {
  state: State;
  fetchJobs: () => Promise<void>;
  addNewJob: (job: Omit<Job, 'id' | 'dateModified'>) => Promise<Job>;
  updateExistingJob: (id: string, job: Partial<Job>) => Promise<Job>;
  removeJob: (id: string) => Promise<void>;
  fetchContacts: () => Promise<void>;
  addNewContact: (contact: Omit<Contact, 'id' | 'dateAdded'>) => Promise<Contact>;
  updateExistingContact: (id: string, contact: Partial<Contact>) => Promise<Contact>;
  removeContact: (id: string) => Promise<void>;
  filterJobsByStatus: (status?: JobStatus) => Job[];
  getTotalsByStatus: () => Record<JobStatus, number>;
  getResponseRate: () => number;
}

const JobContext = createContext<JobContextProps | undefined>(undefined);

const initialState: State = {
  jobs: [],
  contacts: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_JOBS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_JOBS_SUCCESS':
      return { ...state, jobs: action.payload, loading: false };
    case 'FETCH_JOBS_FAILURE':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_JOB_SUCCESS':
      return { ...state, jobs: [...state.jobs, action.payload] };
    case 'UPDATE_JOB_SUCCESS':
      return {
        ...state,
        jobs: state.jobs.map((job) => (job.id === action.payload.id ? action.payload : job)),
      };
    case 'DELETE_JOB_SUCCESS':
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
      };
    case 'FETCH_CONTACTS_SUCCESS':
      return { ...state, contacts: action.payload };
    case 'ADD_CONTACT_SUCCESS':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'UPDATE_CONTACT_SUCCESS':
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case 'DELETE_CONTACT_SUCCESS':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    default:
      return state;
  }
}

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchJobs = async () => {
    dispatch({ type: 'FETCH_JOBS_REQUEST' });
    try {
      const jobs = await getJobs();
      dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: jobs });
    } catch (error) {
      dispatch({ type: 'FETCH_JOBS_FAILURE', payload: 'Failed to fetch jobs' });
    }
  };

  const addNewJob = async (job: Omit<Job, 'id' | 'dateModified'>): Promise<Job> => {
    const newJob = await addJob(job);
    dispatch({ type: 'ADD_JOB_SUCCESS', payload: newJob });
    return newJob;
  };

  const updateExistingJob = async (id: string, job: Partial<Job>): Promise<Job> => {
    const updatedJob = await updateJob(id, job);
    dispatch({ type: 'UPDATE_JOB_SUCCESS', payload: updatedJob });
    return updatedJob;
  };

  const removeJob = async (id: string): Promise<void> => {
    await deleteJob(id);
    dispatch({ type: 'DELETE_JOB_SUCCESS', payload: id });
  };

  const fetchContacts = async () => {
    try {
      const contacts = await getContacts();
      dispatch({ type: 'FETCH_CONTACTS_SUCCESS', payload: contacts });
    } catch (error) {
      console.error('Failed to fetch contacts', error);
    }
  };

  const addNewContact = async (contact: Omit<Contact, 'id' | 'dateAdded'>): Promise<Contact> => {
    const newContact = await addContact(contact);
    dispatch({ type: 'ADD_CONTACT_SUCCESS', payload: newContact });
    return newContact;
  };

  const updateExistingContact = async (id: string, contact: Partial<Contact>): Promise<Contact> => {
    const updatedContact = await updateContact(id, contact);
    dispatch({ type: 'UPDATE_CONTACT_SUCCESS', payload: updatedContact });
    return updatedContact;
  };

  const removeContact = async (id: string): Promise<void> => {
    await deleteContact(id);
    dispatch({ type: 'DELETE_CONTACT_SUCCESS', payload: id });
  };

  const filterJobsByStatus = (status?: JobStatus): Job[] => {
    if (!status) return state.jobs;
    return state.jobs.filter((job) => job.status === status);
  };

  const getTotalsByStatus = (): Record<JobStatus, number> => {
    const totals = {
      applied: 0,
      interviewing: 0,
      offer: 0,
      rejected: 0,
    };

    state.jobs.forEach((job) => {
      totals[job.status]++;
    });

    return totals;
  };

  const getResponseRate = (): number => {
    const total = state.jobs.length;
    if (total === 0) return 0;
    
    const responses = state.jobs.filter(
      job => job.status === 'interviewing' || job.status === 'offer' || job.status === 'rejected'
    ).length;
    
    return Math.round((responses / total) * 100);
  };

  useEffect(() => {
    fetchJobs();
    fetchContacts();
  }, []);

  const value = {
    state,
    fetchJobs,
    addNewJob,
    updateExistingJob,
    removeJob,
    fetchContacts,
    addNewContact,
    updateExistingContact,
    removeContact,
    filterJobsByStatus,
    getTotalsByStatus,
    getResponseRate,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobContext = (): JobContextProps => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};