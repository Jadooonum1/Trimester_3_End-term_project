import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  actionLink?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  message, 
  actionText, 
  actionLink 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center bg-white rounded-md border border-gray-200 shadow-sm">
      <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-blue-50 text-blue-600">
        <FileQuestion size={32} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md">{message}</p>
      
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;