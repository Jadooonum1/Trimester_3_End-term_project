import React, { useState } from 'react';
import { Plus, Search, Mail, Phone, Building, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useJobContext } from '../context/JobContext';
import { Contact } from '../types';
import EmptyState from '../components/EmptyState';

const Contacts: React.FC = () => {
  const { state, addNewContact, updateExistingContact, removeContact } = useJobContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Contact>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    notes: '',
  });

  const filteredContacts = state.contacts
    .filter(contact => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        contact.name.toLowerCase().includes(query) ||
        (contact.email && contact.email.toLowerCase().includes(query)) ||
        (contact.company && contact.company.toLowerCase().includes(query)) ||
        (contact.position && contact.position.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      await addNewContact(formData as Omit<Contact, 'id' | 'dateAdded'>);
      resetForm();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleEditContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingContact || !formData.name) return;

    try {
      await updateExistingContact(isEditingContact, formData);
      resetForm();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await removeContact(id);
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const startEditing = (contact: Contact) => {
    setIsEditingContact(contact.id);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      position: contact.position,
      notes: contact.notes,
    });
    setIsAddingContact(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      notes: '',
    });
    setIsAddingContact(false);
    setIsEditingContact(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-semibold">Contacts</h1>
          <p className="text-gray-600 mt-1">Manage your professional network</p>
        </div>
        <button
          onClick={() => {
            setIsAddingContact(!isAddingContact);
            setIsEditingContact(null);
            if (!isAddingContact) resetForm();
          }}
          className="btn btn-primary"
        >
          <Plus size={16} className="mr-1" />
          Add Contact
        </button>
      </div>

      {/* Add/Edit Contact Form */}
      {(isAddingContact || isEditingContact) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">
            {isEditingContact ? 'Edit Contact' : 'Add New Contact'}
          </h2>
          <form onSubmit={isEditingContact ? handleEditContact : handleAddContact}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="form-label">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="company" className="form-label">Company</label>
                <input
                  id="company"
                  name="company"
                  className="form-input"
                  value={formData.company || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="position" className="form-label">Position</label>
                <input
                  id="position"
                  name="position"
                  className="form-input"
                  value={formData.position || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="notes" className="form-label">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-textarea"
                  value={formData.notes || ''}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditingContact ? 'Update Contact' : 'Add Contact'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search contacts..."
          className="pl-10 form-input w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Contacts List */}
      {filteredContacts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Contact Info
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Added
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                    {contact.position && (
                      <div className="text-sm text-gray-500 md:hidden">{contact.position}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex flex-col space-y-1">
                      {contact.email && (
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail size={14} className="text-gray-400 mr-1.5" />
                          <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                            {contact.email}
                          </a>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center text-sm text-gray-900">
                          <Phone size={14} className="text-gray-400 mr-1.5" />
                          <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    {contact.company && (
                      <div className="flex items-center text-sm text-gray-900">
                        <Building size={14} className="text-gray-400 mr-1.5" />
                        <span>{contact.company}</span>
                      </div>
                    )}
                    {contact.position && (
                      <div className="text-sm text-gray-500">{contact.position}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    {format(new Date(contact.dateAdded), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => startEditing(contact)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No contacts found"
          message={
            searchQuery
              ? "Try adjusting your search criteria"
              : "Start building your professional network by adding your first contact"
          }
          actionText={!searchQuery ? "Add your first contact" : undefined}
          actionLink="#"
        />
      )}
    </div>
  );
};

export default Contacts;