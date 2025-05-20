import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDetailsDrawer from './UserDetailsDrawer';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/users') // Replace with your actual endpoint
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const openUserDetails = (user: any) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <ul className="space-y-3">
        {users.map((user: any) => (
          <li
            key={user.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => openUserDetails(user)}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 bg-teal-100 dark:bg-teal-800 text-teal-600 dark:text-teal-300 flex items-center justify-center rounded-full">
                {user.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* User Details Drawer */}
      <UserDetailsDrawer 
        user={selectedUser}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default UserList;
