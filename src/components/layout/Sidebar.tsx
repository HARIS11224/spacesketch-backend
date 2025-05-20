import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Sofa, 
  PaintBucket, 
  Star, 
  LogOut 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const { theme } = useTheme();

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'users', name: 'Users', icon: <Users size={20} /> },
    { id: 'furniture', name: 'Furniture', icon: <Sofa size={20} /> },
    { id: 'textures', name: 'Textures', icon: <PaintBucket size={20} /> },
  ];

  return (
    <div className="hidden md:block w-64 h-screen bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="h-full flex flex-col">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-teal-600 dark:text-teal-400">SpaceSketch</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full flex items-center px-4 py-3 rounded-lg text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <span className="mr-3"><LogOut size={20} /></span>
            <span>Log Out</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
