import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Company } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddCompanyModal({ isOpen, onClose }: Props) {
  const { addCompany } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedinProfile: '',
    emails: [''],
    phoneNumbers: [''],
    comments: '',
    communicationPeriodicity: 14, // Default to 2 weeks
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const company: Company = {
      id: crypto.randomUUID(),
      ...formData,
      emails: formData.emails.filter(Boolean),
      phoneNumbers: formData.phoneNumbers.filter(Boolean),
    };

    addCompany(company);
    onClose();
  };

  const handleAddField = (field: 'emails' | 'phoneNumbers') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Add New Company</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile
            </label>
            <input
              type="url"
              value={formData.linkedinProfile}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Addresses
            </label>
            {formData.emails.map((email, index) => (
              <input
                key={index}
                type="email"
                value={email}
                onChange={(e) => {
                  const newEmails = [...formData.emails];
                  newEmails[index] = e.target.value;
                  setFormData(prev => ({ ...prev, emails: newEmails }));
                }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddField('emails')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add another email
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Numbers
            </label>
            {formData.phoneNumbers.map((phone, index) => (
              <input
                key={index}
                type="tel"
                value={phone}
                onChange={(e) => {
                  const newPhones = [...formData.phoneNumbers];
                  newPhones[index] = e.target.value;
                  setFormData(prev => ({ ...prev, phoneNumbers: newPhones }));
                }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddField('phoneNumbers')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add another phone number
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Communication Periodicity (days)
            </label>
            <input
              type="number"
              min="1"
              value={formData.communicationPeriodicity}
              onChange={(e) => setFormData(prev => ({ ...prev, communicationPeriodicity: parseInt(e.target.value) }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}