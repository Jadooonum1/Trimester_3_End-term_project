import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import ApplicationDetails from './pages/ApplicationDetails';
import NewApplication from './pages/NewApplication';
import EditApplication from './pages/EditApplication';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/new" element={<NewApplication />} />
        <Route path="applications/:id" element={<ApplicationDetails />} />
        <Route path="applications/:id/edit" element={<EditApplication />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;