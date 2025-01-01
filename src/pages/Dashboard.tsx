import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react';
import { LogCommunicationModal } from '../components/LogCommunicationModal';

export function Dashboard() {
  const { companies, communications, communicationMethods } = useStore();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter((comm) => comm.companyId === companyId && comm.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const getNextCommunication = (companyId: string) => {
    return communications
      .filter((comm) => comm.companyId === companyId && !comm.completed)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  };

  const getCommunicationStatus = (date: string) => {
    const today = new Date();
    const commDate = new Date(date);
    
    if (commDate < today) return 'overdue';
    if (format(commDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) return 'today';
    return 'upcoming';
  };

  const handleLogCommunication = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Communication Dashboard</h1>
      </div>
      {companies.length != 0 ? 
      (<div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Five Communications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Communication
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => {
              const lastFive = getLastFiveCommunications(company.id);
              const next = getNextCommunication(company.id);
              const status = next ? getCommunicationStatus(next.date) : null;

              return (
                <tr
                  key={company.id}
                  className={
                    status === 'overdue'
                      ? 'bg-red-50'
                      : status === 'today'
                      ? 'bg-yellow-50'
                      : ''
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {company.name}
                    </div>
                    <div className="text-sm text-gray-500">{company.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {lastFive.map((comm) => {
                        const method = communicationMethods.find(
                          (m) => m.id === comm.methodId
                        );
                        return (
                          <div
                            key={comm.id}
                            className="group relative"
                            title={method?.name}
                          >
                            <MessageCircle className="h-5 w-5 text-gray-400" />
                            <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white text-xs rounded">
                              {comm.notes}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {next && (
                      <div className="text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            status === 'overdue'
                              ? 'bg-red-100 text-red-800'
                              : status === 'today'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {format(new Date(next.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleLogCommunication(company.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Log Communication
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      ) : <h1>No Companies Yet Registered Please Add
        A Company here <Link to={"./Companies"}><span style={{color:"blue"}}>Companies</span></Link>
      </h1>
     }

      {selectedCompanyId && (
        <LogCommunicationModal
          isOpen={isModalOpen}  
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCompanyId(null);
          }}
          companyId={selectedCompanyId}
        />
      )}
    </div>
  );
}