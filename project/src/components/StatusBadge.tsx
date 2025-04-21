import React from 'react';
import { JobStatus } from '../types';

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interviewing':
        return 'bg-purple-100 text-purple-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'applied':
        return 'Applied';
      case 'interviewing':
        return 'Interviewing';
      case 'offer':
        return 'Offer';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <span className={`badge ${getStatusStyles()} ${className}`}>
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;