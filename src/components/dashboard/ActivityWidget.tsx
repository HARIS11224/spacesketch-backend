import React from 'react';
import { Upload, Download, UserPlus, PenSquare } from 'lucide-react';

const ActivityWidget: React.FC = () => {
  const activities = [
    { 
      id: 1, 
      user: 'Admin User', 
      action: 'Uploaded new chair model',
      icon: <Upload size={16} className="text-blue-500" />,
      time: '10 minutes ago' 
    },
    { 
      id: 2, 
      user: 'John Smith', 
      action: 'Created new account',
      icon: <UserPlus size={16} className="text-green-500" />,
      time: '2 hours ago' 
    },
    { 
      id: 3, 
      user: 'Lisa Johnson', 
      action: 'Downloaded marble texture',
      icon: <Download size={16} className="text-purple-500" />,
      time: '3 hours ago' 
    },
    { 
      id: 4, 
      user: 'Admin User', 
      action: 'Approved 5 new reviews',
      icon: <PenSquare size={16} className="text-amber-500" />,
      time: '5 hours ago' 
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Activity</h2>
        <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
          View all
        </button>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-2.5 top-0 h-full w-px bg-gray-200 dark:bg-gray-700"></div>
        
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 rounded-full w-5 h-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                {activity.icon}
              </div>
              
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium text-gray-800 dark:text-white">{activity.user}</span>
                  <span className="text-gray-600 dark:text-gray-300"> {activity.action}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityWidget;