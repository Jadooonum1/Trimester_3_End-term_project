import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import { 
  Calendar, Edit2, Trash2, ExternalLink, ArrowLeft,
  MapPin, Building, DollarSign, MessageSquare, Mail, Phone,
  AlertCircle, ChevronRight
} from 'lucide-react';
import { useJobContext } from '../context/JobContext';
import StatusBadge from '../components/StatusBadge';

const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, removeJob } = useJobContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState(state.jobs.find(job => job.id === id));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (state.jobs.length > 0) {
      const foundJob = state.jobs.find(job => job.id === id);
      setJob(foundJob);
      setIsLoading(false);
    }
  }, [id, state.jobs]);

  const handleDelete = async () => {
    try {
      await removeJob(id!);
      navigate('/applications');
    } catch (error) {
      console.error('Error deleting job application:', error);
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
        <p className="text-gray-600 mb-6">The application you're looking for doesn't exist or has been deleted.</p>
        <Link to="/applications" className="btn btn-primary">
          <ArrowLeft size={16} className="mr-2" />
          Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link to="/applications" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Applications</span>
        </Link>
        
        <div className="flex space-x-2">
          <Link to={`/applications/${id}/edit`} className="btn btn-secondary flex items-center">
            <Edit2 size={16} className="mr-1" />
            Edit
          </Link>
          <button 
            onClick={() => setShowDeleteConfirm(true)} 
            className="btn btn-danger flex items-center"
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </button>
        </div>
      </div>
      
      {/* Application Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{job.position}</h1>
            <div className="flex items-center mt-2">
              <Building size={16} className="text-gray-500 mr-2" />
              <p className="text-lg text-gray-700">{job.company}</p>
            </div>
            {job.location && (
              <div className="flex items-center mt-2">
                <MapPin size={16} className="text-gray-500 mr-2" />
                <p className="text-gray-600">{job.location}</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 sm:mt-0 space-y-2">
            <StatusBadge status={job.status} className="text-sm py-1 px-3" />
            {job.salary && (
              <div className="flex items-center">
                <DollarSign size={16} className="text-gray-500 mr-1" />
                <span className="text-gray-700">{job.salary}</span>
              </div>
            )}
            <div className="flex items-center">
              <Calendar size={16} className="text-gray-500 mr-1" />
              <span className="text-gray-600 text-sm">
                Applied {format(new Date(job.dateApplied), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>
        
        {job.url && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a 
              href={job.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <ExternalLink size={14} className="mr-1" />
              View Job Posting
            </a>
          </div>
        )}
      </div>
      
      {/* Job Description */}
      {job.description && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>
      )}
      
      {/* Next Steps and Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Steps */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Next Steps</h2>
          {job.nextSteps ? (
            <>
              <p className="text-gray-700">{job.nextSteps}</p>
              {job.nextInterviewDate && (
                <div className="mt-4 flex items-center text-blue-600">
                  <Calendar size={16} className="mr-2" />
                  <span>
                    Interview scheduled for {format(new Date(job.nextInterviewDate), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 italic">No next steps specified</p>
          )}
        </div>
        
        {/* Notes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Notes</h2>
          {job.notes ? (
            <p className="text-gray-700 whitespace-pre-line">{job.notes}</p>
          ) : (
            <p className="text-gray-500 italic">No notes added yet</p>
          )}
        </div>
      </div>
      
      {/* Contact Information */}
      {(job.contactName || job.contactEmail || job.contactPhone) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="space-y-3">
            {job.contactName && (
              <div className="flex items-center">
                <MessageSquare size={16} className="text-gray-500 mr-3" />
                <span className="text-gray-700">{job.contactName}</span>
              </div>
            )}
            {job.contactEmail && (
              <div className="flex items-center">
                <Mail size={16} className="text-gray-500 mr-3" />
                <a 
                  href={`mailto:${job.contactEmail}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {job.contactEmail}
                </a>
              </div>
            )}
            {job.contactPhone && (
              <div className="flex items-center">
                <Phone size={16} className="text-gray-500 mr-3" />
                <a 
                  href={`tel:${job.contactPhone}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {job.contactPhone}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Application Timeline */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Application Timeline</h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="mr-4 relative">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
              <div className="absolute top-4 bottom-0 left-1.5 w-0.5 bg-gray-200"></div>
            </div>
            <div>
              <p className="font-medium">Application Submitted</p>
              <p className="text-sm text-gray-600">
                {format(new Date(job.dateApplied), 'MMM d, yyyy')} (
                {formatDistanceToNow(new Date(job.dateApplied), { addSuffix: true })})
              </p>
            </div>
          </div>
          
          {job.status !== 'applied' && (
            <div className="flex">
              <div className="mr-4">
                <div className={`h-4 w-4 rounded-full ${
                  job.status === 'interviewing' ? 'bg-purple-500' : 
                  job.status === 'offer' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
              <div>
                <p className="font-medium">
                  {job.status === 'interviewing' ? 'Interview Stage' : 
                   job.status === 'offer' ? 'Offer Received' : 'Application Rejected'}
                </p>
                <p className="text-sm text-gray-600">
                  {format(new Date(job.dateModified), 'MMM d, yyyy')} (
                  {formatDistanceToNow(new Date(job.dateModified), { addSuffix: true })})
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center text-red-600 mb-4">
              <AlertCircle size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this application? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;