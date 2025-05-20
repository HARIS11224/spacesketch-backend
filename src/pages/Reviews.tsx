import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, ArrowUpDown, Star, CheckCircle, XCircle, Trash2 } from 'lucide-react';

const Reviews: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for reviews
  const reviews = [
    { 
      id: 1, 
      user: 'Emily Parker', 
      content: 'The modern sofa is exactly what I needed for my living room redesign!', 
      rating: 5,
      status: 'approved',
      date: '2023-10-15',
    },
    { 
      id: 2, 
      user: 'Michael Johnson', 
      content: 'Great app, but I wish there were more texture options for wooden floors.', 
      rating: 4,
      status: 'approved',
      date: '2023-10-14',
    },
    { 
      id: 3, 
      user: 'Sarah Williams', 
      content: 'The 3D rendering is impressive, but loading times could be improved.', 
      rating: 3,
      status: 'pending',
      date: '2023-10-12',
    },
    { 
      id: 4, 
      user: 'Robert Davis', 
      content: 'The office chair model looks great but doesn\'t match the dimensions mentioned in the description.', 
      rating: 2,
      status: 'pending',
      date: '2023-10-10',
    },
    { 
      id: 5, 
      user: 'Jennifer Miller', 
      content: 'This app is a waste of time. Nothing works properly and customer service is non-existent!', 
      rating: 1,
      status: 'rejected',
      date: '2023-10-08',
    },
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesQuery = 
      review.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = 
      filterStatus === 'all' || 
      review.status === filterStatus;
      
    return matchesQuery && matchesStatus;
  });

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={`${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} 
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusActions = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex space-x-2">
            <button className="p-1 rounded-full text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20">
              <CheckCircle size={18} />
            </button>
            <button className="p-1 rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
              <XCircle size={18} />
            </button>
          </div>
        );
      default:
        return (
          <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Trash2 size={18} />
          </button>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Reviews</h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</span>
                    <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Review</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</span>
                    <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</span>
                    <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</span>
                    <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-right">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredReviews.map((review) => (
                <tr 
                  key={review.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center text-teal-600 dark:text-teal-300 mr-3">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800 dark:text-white">{review.user}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                      {review.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(review.status)}`}>
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-300">{review.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end">
                      {getStatusActions(review.status)}
                      <button className="p-1 ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredReviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No reviews found</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Showing <span className="font-medium">{filteredReviews.length}</span> of <span className="font-medium">{reviews.length}</span> reviews
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;