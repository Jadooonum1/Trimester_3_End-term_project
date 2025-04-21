import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Activity, Users, Briefcase as BriefcaseBusiness, Plus, Search } from 'lucide-react';
import { useJobContext } from '../context/JobContext';
import { JobStatus } from '../types';
import StatusBadge from '../components/StatusBadge';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';

const Dashboard: React.FC = () => {
  const { state, getTotalsByStatus, getResponseRate } = useJobContext();
  const [searchQuery, setSearchQuery] = useState('');

  const totals = getTotalsByStatus();
  const responseRate = getResponseRate();

  const statusCards = [
    { status: 'applied' as JobStatus, icon: <BriefcaseBusiness size={20} className="text-blue-600" />, label: 'Applied', color: 'bg-blue-50 border-blue-200' },
    { status: 'interviewing' as JobStatus, icon: <Users size={20} className="text-purple-600" />, label: 'Interviewing', color: 'bg-purple-50 border-purple-200' },
    { status: 'offer' as JobStatus, icon: <Activity size={20} className="text-green-600" />, label: 'Offers', color: 'bg-green-50 border-green-200' },
    { status: 'rejected' as JobStatus, icon: <BarChart3 size={20} className="text-red-600" />, label: 'Rejected', color: 'bg-red-50 border-red-200' },
  ];

  const recentApplications = state.jobs
    .filter(job => {
      if (!searchQuery) return true;
      return (
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.position.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold">Your Job Search Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your applications and monitor your progress</p>
        </div>
        <Link to="/applications/new" className="btn btn-primary">
          <Plus size={16} className="mr-1" />
          New Application
        </Link>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card) => (
          <div key={card.status} className={`card p-4 border ${card.color}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {card.icon}
                <h3 className="ml-2 font-medium text-gray-700">{card.label}</h3>
              </div>
              <StatusBadge status={card.status} />
            </div>
            <p className="text-2xl font-bold">{totals[card.status]}</p>
          </div>
        ))}
      </div>
      
      {/* Response Rate Widget */}
      <div className="card p-5">
        <h2 className="text-lg font-medium mb-3">Response Rate</h2>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full" 
              style={{ width: `${responseRate}%` }}
            ></div>
          </div>
          <span className="ml-4 text-lg font-semibold">{responseRate}%</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Percentage of applications that received a response (interviewing, offer, or rejection).
        </p>
      </div>
      
      {/* Recent Applications */}
      <div className="card">
        <div className="border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Recent Applications</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search applications..."
                className="pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentApplications.length > 0 ? (
            recentApplications.map((job) => (
              <div key={job.id} className="p-4">
                <JobCard job={job} />
              </div>
            ))
          ) : (
            <div className="p-6">
              <EmptyState
                title="No applications yet"
                message="Start tracking your job applications by adding your first one."
                actionText="Add your first application"
                actionLink="/applications/new"
              />
            </div>
          )}
        </div>
        
        {recentApplications.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <Link 
              to="/applications" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              View all applications
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;