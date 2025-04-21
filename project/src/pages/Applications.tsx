import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, Search } from 'lucide-react';
import { useJobContext } from '../context/JobContext';
import { JobStatus } from '../types';
import StatusBadge from '../components/StatusBadge';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';

const Applications: React.FC = () => {
  const { state, filterJobsByStatus } = useJobContext();
  const [statusFilter, setStatusFilter] = useState<JobStatus | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (status: JobStatus | undefined) => {
    setStatusFilter(status);
    setIsFilterOpen(false);
  };

  const filteredJobs = filterJobsByStatus(statusFilter)
    .filter(job => {
      if (!searchQuery) return true;
      return (
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
    .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime());

  const statusOptions = [
    { value: undefined, label: 'All Applications' },
    { value: 'applied', label: 'Applied' },
    { value: 'interviewing', label: 'Interviewing' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-semibold">Applications</h1>
          <p className="text-gray-600 mt-1">Manage and track your job applications</p>
        </div>
        <Link to="/applications/new" className="btn btn-primary">
          <Plus size={16} className="mr-1" />
          New Application
        </Link>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn btn-secondary flex items-center"
          >
            <Filter size={16} className="mr-2" />
            {statusFilter ? (
              <>
                <span>Status: </span>
                <StatusBadge status={statusFilter} className="ml-2" />
              </>
            ) : (
              <span>All Applications</span>
            )}
          </button>
          
          {isFilterOpen && (
            <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {statusOptions.map((option) => (
                  <button
                    key={option.label}
                    className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleFilterChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by company, position, or location..."
            className="pl-10 form-input w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Applications Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={statusFilter ? `No ${statusFilter} applications found` : "No applications found"}
          message={
            searchQuery
              ? "Try adjusting your search or filter criteria"
              : "Start tracking your job applications by adding your first one"
          }
          actionText={!searchQuery ? "Add your first application" : undefined}
          actionLink={!searchQuery ? "/applications/new" : undefined}
        />
      )}
    </div>
  );
};

export default Applications;