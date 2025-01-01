import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { AddCompanyModal } from '../components/AddCompanyModal';
import { Building2, Trash2, Edit } from 'lucide-react';

export function Companies() {
  const { companies } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <Building2 className="h-5 w-5" />
          <span>Add Company</span>
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {companies.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">No companies yet</p>
            <p className="mt-1">Add your first company to get started</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periodicity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {company.name}
                    </div>
                    <a
                      href={company.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      LinkedIn Profile
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {company.location}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {company.emails[0]}
                    </div>
                    <div className="text-sm text-gray-500">
                      {company.phoneNumbers[0]}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Every {company.communicationPeriodicity} days
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}