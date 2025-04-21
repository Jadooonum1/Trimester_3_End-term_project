import React from 'react';
import { Menu, Bell, Search, X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/applications') return 'Applications';
    if (path.includes('/applications/new')) return 'New Application';
    if (path.includes('/applications') && path.includes('/edit')) return 'Edit Application';
    if (path.includes('/applications/')) return 'Application Details';
    if (path === '/contacts') return 'Contacts';
    if (path === '/settings') return 'Settings';
    
    return 'JobTrack';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button 
            className="text-gray-500 md:hidden focus:outline-none" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="relative animate-fade-in">
              <input
                type="text"
                placeholder="Search..."
                className="form-input w-full sm:w-64 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                type="button" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </form>
          ) : (
            <button 
              className="text-gray-500 hover:text-gray-700 focus:outline-none" 
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          )}
          
          <button 
            className="text-gray-500 hover:text-gray-700 focus:outline-none relative" 
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <Link to="/settings" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <span className="text-sm font-medium">U</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;