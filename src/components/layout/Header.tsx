import React from 'react';
import {  User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="px-4 py-7 flex items-center justify-between">
        <button 
          className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
        
        <div className="md:hidden flex-1 text-center">
          <h1 className="text-lg font-bold text-teal-600 dark:text-teal-400">SpaceSketch</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          
          
         
          
          <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2"></div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center text-teal-600 dark:text-teal-300">
              <User size={16} />
            </div>
            <div className="ml-2 hidden sm:block">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</p>
            </div>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <nav className="py-2">
            <ul className="space-y-1 px-2">
              {['Dashboard', 'Users', 'Furniture', 'Textures', 'Reviews'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;