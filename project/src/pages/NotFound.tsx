import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center py-10 px-4">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <AlertCircle size={32} className="text-red-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary flex items-center">
        <Home size={16} className="mr-1.5" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;