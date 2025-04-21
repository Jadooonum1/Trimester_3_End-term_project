import React, { useState } from 'react';
import { Bell, User, Shield, Database, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [accountSettings, setAccountSettings] = useState({
    name: 'User',
    email: 'user@example.com',
    notifications: {
      applicationUpdates: true,
      interviews: true,
      offers: true,
      rejections: true,
      reminders: true,
    },
    theme: 'light',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAccountSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountSettings(prev => ({
      ...prev,
      theme: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic would go here
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-semibold">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="md:grid md:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1 bg-gray-50 border-r border-gray-200">
            <nav className="px-4 py-5">
              <ul className="space-y-1">
                <li>
                  <a href="#account" className="flex items-center px-3 py-2 rounded-md text-blue-600 bg-blue-50 font-medium">
                    <User size={16} className="mr-2" />
                    Account
                  </a>
                </li>
                <li>
                  <a href="#notifications" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <Bell size={16} className="mr-2" />
                    Notifications
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <Shield size={16} className="mr-2" />
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#data" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <Database size={16} className="mr-2" />
                    Data
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-3 p-6">
            <form onSubmit={handleSubmit}>
              {/* Account Settings */}
              <div id="account">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-input"
                      value={accountSettings.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      value={accountSettings.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="form-label">Theme</label>
                    <div className="mt-2 space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={accountSettings.theme === 'light'}
                          onChange={handleThemeChange}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Light</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={accountSettings.theme === 'dark'}
                          onChange={handleThemeChange}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Dark</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="system"
                          checked={accountSettings.theme === 'system'}
                          onChange={handleThemeChange}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">System</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div id="notifications" className="mt-10 pt-10 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="applicationUpdates"
                        name="applicationUpdates"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                        checked={accountSettings.notifications.applicationUpdates}
                        onChange={handleNotificationChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="applicationUpdates" className="font-medium text-gray-700">Application Updates</label>
                      <p className="text-gray-500">Receive notifications when your applications are updated.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="interviews"
                        name="interviews"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                        checked={accountSettings.notifications.interviews}
                        onChange={handleNotificationChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="interviews" className="font-medium text-gray-700">Interview Reminders</label>
                      <p className="text-gray-500">Get notified about upcoming interviews.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                        checked={accountSettings.notifications.offers}
                        onChange={handleNotificationChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="offers" className="font-medium text-gray-700">Offer Notifications</label>
                      <p className="text-gray-500">Receive notifications when you get a job offer.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="rejections"
                        name="rejections"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                        checked={accountSettings.notifications.rejections}
                        onChange={handleNotificationChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="rejections" className="font-medium text-gray-700">Rejection Notifications</label>
                      <p className="text-gray-500">Get notified when applications are rejected.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="reminders"
                        name="reminders"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                        checked={accountSettings.notifications.reminders}
                        onChange={handleNotificationChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="reminders" className="font-medium text-gray-700">Follow-up Reminders</label>
                      <p className="text-gray-500">Receive reminders to follow up on applications.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy and Data Settings placeholders */}
              <div id="privacy" className="mt-10 pt-10 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h2>
                <p className="text-gray-500">
                  Configure your privacy settings and control how your data is used.
                </p>
                {/* Privacy settings would go here */}
              </div>

              <div id="data" className="mt-10 pt-10 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Data Management</h2>
                <p className="text-gray-500">
                  Export or delete your data from JobTrack.
                </p>
                <div className="mt-4 space-x-4">
                  <button type="button" className="btn btn-secondary">
                    Export Data
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete Account
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center"
                  >
                    <Save size={16} className="mr-1.5" />
                    Save Settings
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;