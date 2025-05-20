import React from 'react';
import { Star, MoreHorizontal } from 'lucide-react';

const RecentReviewsWidget: React.FC = () => {
  const reviews = [
    { 
      id: 1, 
      user: 'Emily Parker', 
      content: 'The modern sofa is exactly what I needed for my living room redesign!', 
      rating: 5,
      time: '2 hours ago' 
    },
    { 
      id: 2, 
      user: 'Michael Johnson', 
      content: 'Great app, but I wish there were more texture options for wooden floors.', 
      rating: 4,
      time: '5 hours ago' 
    },
    { 
      id: 3, 
      user: 'Sarah Williams', 
      content: 'The 3D rendering is impressive, but loading times could be improved.', 
      rating: 3,
      time: '1 day ago' 
    },
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={`${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} 
      />
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Reviews</h2>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <div className="space-y-5">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{review.user}</p>
                <div className="flex mt-1 mb-2">
                  {renderStars(review.rating)}
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{review.time}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{review.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
          View all reviews
        </button>
      </div>
    </div>
  );
};

export default RecentReviewsWidget;