import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, trend, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="rounded-lg p-2 bg-gray-100 dark:bg-gray-700">
          {icon}
        </div>
        <span className={`text-xs font-medium flex items-center ${
          trend === 'up' 
            ? 'text-green-600 dark:text-green-400' 
            : trend === 'down' 
              ? 'text-red-600 dark:text-red-400' 
              : 'text-gray-600 dark:text-gray-400'
        }`}>
          {trend === 'up' ? <ArrowUp size={14} className="mr-1" /> : 
           trend === 'down' ? <ArrowDown size={14} className="mr-1" /> : null}
          {change}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;