import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Building2, Bell } from 'lucide-react';
import { useStore } from '../store/useStore';
import { isToday, isPast } from 'date-fns';

export function Navigation() {
  const location = useLocation();
  const communications = useStore((state) => state.communications);
  
  const overdueCount = communications.filter(
    (comm) => !comm.completed && isPast(new Date(comm.date))
  ).length;
  
  const todayCount = communications.filter(
    (comm) => !comm.completed && isToday(new Date(comm.date))
  ).length;

  const totalNotifications = overdueCount + todayCount;

  const links = [
    {
      to: '/',
      icon: Calendar,
      label: 'Dashboard',
    },
    {
      to: '/companies',
      icon: Building2,
      label: 'Companies',
    },
    {
      to: '/notifications',
      icon: Bell,
      label: 'Notifications',
      badge: totalNotifications > 0 ? totalNotifications : undefined,
    },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.to
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}