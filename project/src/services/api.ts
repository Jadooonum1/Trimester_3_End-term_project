import axios from 'axios';
import { Job, Contact } from '../types';
import { mockJobs, mockContacts } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Using JSONPlaceholder API for users as a backup
const API_URL = 'https://jsonplaceholder.typicode.com';

// Using mock data for now, but this could be replaced with real API calls
export const getJobs = async (): Promise<Job[]> => {
  try {
    // Simulate API delay
    await delay(600);
    
    // For a real implementation, you would use:
    // const response = await axios.get('/api/jobs');
    // return response.data;
    
    return mockJobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const getJobById = async (id: string): Promise<Job | null> => {
  try {
    await delay(300);
    const job = mockJobs.find(job => job.id === id);
    return job || null;
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error);
    return null;
  }
};

export const addJob = async (job: Omit<Job, 'id' | 'dateModified'>): Promise<Job> => {
  try {
    await delay(500);
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      dateModified: new Date().toISOString(),
    };
    
    // In a real implementation:
    // const response = await axios.post('/api/jobs', newJob);
    // return response.data;
    
    mockJobs.push(newJob);
    return newJob;
  } catch (error) {
    console.error('Error adding job:', error);
    throw new Error('Failed to add job');
  }
};

export const updateJob = async (id: string, jobUpdate: Partial<Job>): Promise<Job> => {
  try {
    await delay(500);
    const jobIndex = mockJobs.findIndex(job => job.id === id);
    
    if (jobIndex === -1) {
      throw new Error(`Job with id ${id} not found`);
    }
    
    const updatedJob: Job = {
      ...mockJobs[jobIndex],
      ...jobUpdate,
      dateModified: new Date().toISOString(),
    };
    
    mockJobs[jobIndex] = updatedJob;
    
    // In a real implementation:
    // const response = await axios.put(`/api/jobs/${id}`, updatedJob);
    // return response.data;
    
    return updatedJob;
  } catch (error) {
    console.error(`Error updating job with id ${id}:`, error);
    throw new Error('Failed to update job');
  }
};

export const deleteJob = async (id: string): Promise<void> => {
  try {
    await delay(500);
    const jobIndex = mockJobs.findIndex(job => job.id === id);
    
    if (jobIndex === -1) {
      throw new Error(`Job with id ${id} not found`);
    }
    
    mockJobs.splice(jobIndex, 1);
    
    // In a real implementation:
    // await axios.delete(`/api/jobs/${id}`);
  } catch (error) {
    console.error(`Error deleting job with id ${id}:`, error);
    throw new Error('Failed to delete job');
  }
};

// Contact API methods
export const getContacts = async (): Promise<Contact[]> => {
  try {
    await delay(600);
    return mockContacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

export const getContactById = async (id: string): Promise<Contact | null> => {
  try {
    await delay(300);
    const contact = mockContacts.find(contact => contact.id === id);
    return contact || null;
  } catch (error) {
    console.error(`Error fetching contact with id ${id}:`, error);
    return null;
  }
};

export const addContact = async (contact: Omit<Contact, 'id' | 'dateAdded'>): Promise<Contact> => {
  try {
    await delay(500);
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    };
    
    mockContacts.push(newContact);
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw new Error('Failed to add contact');
  }
};

export const updateContact = async (id: string, contactUpdate: Partial<Contact>): Promise<Contact> => {
  try {
    await delay(500);
    const contactIndex = mockContacts.findIndex(contact => contact.id === id);
    
    if (contactIndex === -1) {
      throw new Error(`Contact with id ${id} not found`);
    }
    
    const updatedContact: Contact = {
      ...mockContacts[contactIndex],
      ...contactUpdate,
    };
    
    mockContacts[contactIndex] = updatedContact;
    return updatedContact;
  } catch (error) {
    console.error(`Error updating contact with id ${id}:`, error);
    throw new Error('Failed to update contact');
  }
};

export const deleteContact = async (id: string): Promise<void> => {
  try {
    await delay(500);
    const contactIndex = mockContacts.findIndex(contact => contact.id === id);
    
    if (contactIndex === -1) {
      throw new Error(`Contact with id ${id} not found`);
    }
    
    mockContacts.splice(contactIndex, 1);
  } catch (error) {
    console.error(`Error deleting contact with id ${id}:`, error);
    throw new Error('Failed to delete contact');
  }
};

// For demonstration purposes - fetch real users from JSONPlaceholder
export const fetchExternalUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching external users:', error);
    throw new Error('Failed to fetch users');
  }
};

// Search for jobs using external API
export const searchJobListings = async (query: string) => {
  try {
    // This would be a real API call in production
    await delay(800);
    
    // For demo, return mocked "search results" based on the query
    return mockJobs.filter(job => 
      job.company.toLowerCase().includes(query.toLowerCase()) || 
      job.position.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching jobs:', error);
    return [];
  }
};