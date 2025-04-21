import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';
import { Job } from '../types';
import StatusBadge from './StatusBadge';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link 
      to={`/applications/${job.id}`}
      className="card block hover:border-blue-300 transition-all animate-fade-in"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{job.position}</h3>
            <p className="text-gray-700 mt-0.5">{job.company}</p>
          </div>
          <StatusBadge status={job.status} />
        </div>
        
        <div className="mt-4 flex flex-col space-y-2">
          {job.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={14} className="mr-1.5 text-gray-500" />
              <span>{job.location}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={14} className="mr-1.5 text-gray-500" />
            <span>Applied {formatDistanceToNow(new Date(job.dateApplied), { addSuffix: true })}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          {job.salary ? (
            <span className="text-sm text-gray-700">{job.salary}</span>
          ) : (
            <span className="text-sm text-gray-500">No salary info</span>
          )}
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </Link>
  );
};

export default JobCard;