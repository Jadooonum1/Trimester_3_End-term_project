import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useJobContext } from '../context/JobContext';
import JobForm from '../components/forms/JobForm';
import { Job } from '../types';

const EditApplication: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, updateExistingJob } = useJobContext();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.jobs.length > 0) {
      const foundJob = state.jobs.find(job => job.id === id);
      setJob(foundJob);
      setIsLoading(false);
    }
  }, [id, state.jobs]);

  const handleSubmit = async (data: Partial<Job>) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      await updateExistingJob(id, data);
      navigate(`/applications/${id}`);
    } catch (error) {
      console.error('Error updating job:', error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse">Loading application details...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Application Not Found</h2>
        <p className="text-gray-600 mb-6">The application you're trying to edit doesn't exist or has been deleted.</p>
        <Link to="/applications" className="btn btn-primary">
          <ArrowLeft size={16} className="mr-2" />
          Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center">
        <Link to={`/applications/${id}`} className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Application</span>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold mb-6">Edit Application</h1>
        <JobForm 
          defaultValues={job} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
};

export default EditApplication;