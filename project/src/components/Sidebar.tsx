import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase as BriefcaseBusiness, Users, Settings, HelpCircle, Briefcase } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <div className="flex items-center">
          <Briefcase className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-semibold text-gray-800">JobTrack</span>
        </div>
      </div>
      
      <nav className="py-4 flex-1 overflow-y-auto">
        <ul className="space-y-1 px-3">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              end
            >
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/applications" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <BriefcaseBusiness className="h-5 w-5 mr-2" />
              Applications
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contacts" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Users className="h-5 w-5 mr-2" />
              Contacts
            </NavLink>
          </li>
        </ul>
        
        <div className="pt-4 mt-4 border-t border-gray-200">
          <ul className="space-y-1 px-3">
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </NavLink>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <HelpCircle className="h-5 w-5 mr-2" />
                Help & Support
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-md p-3">
          <h5 className="text-sm font-medium text-blue-800">Pro Tip</h5>
          <p className="text-xs text-blue-700 mt-1">
            Track interview feedback and salary details to make better decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;