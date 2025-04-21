import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useJobContext } from '../context/JobContext';
import JobForm from '../components/forms/JobForm';
import { Job } from '../types';

const NewApplication: React.FC = () => {
  const { addNewJob } = useJobContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Partial<Job>) => {
    setIsSubmitting(true);
    try {
      const newJob = await addNewJob({
        ...data,
        dateApplied: data.dateApplied || new Date().toISOString(),
      } as Omit<Job, 'id' | 'dateModified'>);
      
      navigate(`/applications/${newJob.id}`);
    } catch (error) {
      console.error('Error adding job:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center">
        <Link to="/applications" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Applications</span>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold mb-6">Add New Application</h1>
        <JobForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default NewApplication;