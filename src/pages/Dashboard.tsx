import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart3, Users, ShoppingBag, Star, ArrowUpRight } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import RecentReviewsWidget from '../components/dashboard/RecentReviewsWidget';
import TopAssetsWidget from '../components/dashboard/TopAssetsWidget';
import ActivityWidget from '../components/dashboard/ActivityWidget';

const Dashboard: React.FC = () => {
  const [statsData, setStatsData] = useState({
    users: 0,
    items: 0,
    models: 0,
    reviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, itemsRes, modelsRes, reviewsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/users/count'),
          axios.get('http://localhost:5000/api/items/count'),
            axios.get('http://localhost:5000/api/textures/count'),
          axios.get('http://localhost:5000/api/items/count'),
        ]);

        console.log('Users Response:', usersRes.data.count);
        console.log('Items Response:', itemsRes.data);
        console.log('Models Response:', modelsRes.data);
        console.log('Reviews Response:', reviewsRes.data);

        setStatsData({
          users: usersRes.data.count,
          items: itemsRes.data.count,
          models: modelsRes.data.count,
          reviews: reviewsRes.data.count,
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { 
      title: 'Total Users', 
      value: statsData.users.toString(), 
      change: '+12%', 
      trend: 'up' as const,
      icon: <Users className="text-blue-500" size={24} />
    },
    { 
      title: 'Furniture Items', 
      value: statsData.items.toString(), 
      change: '+8%', 
      trend: 'up' as const,
      icon: <ShoppingBag className="text-purple-500" size={24} />
    },
    { 
      title: 'Texture Assets', 
      value: statsData.models.toString(), 
      change: '+5%', 
      trend: 'up' as const,
      icon: <BarChart3 className="text-amber-500" size={24} />
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <button className="flex items-center space-x-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors duration-200">
          <span>View Reports</span>
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       
        <TopAssetsWidget type={'texture'}/>
      </div>

    
    </div>
  );
};

export default Dashboard;
