import React, { useEffect, useState } from "react";
import { X, Mail, Calendar, Clock, Trash2 } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLogin?: string;
  role: string;
}

interface UserDetailsDrawerProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onUserDeleted?: () => void; // callback to refresh parent
}

const UserDetailsDrawer: React.FC<UserDetailsDrawerProps> = ({
  userId,
  isOpen,
  onClose,
  onUserDeleted,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (isOpen && userId) {
      setLoading(true);
      setError(null);

      fetch(`http://localhost:5000/api/users/${userId}`, {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user");
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setError(err.message);
            setLoading(false);
          }
        });
    } else {
      setUser(null);
      setError(null);
      setLoading(false);
    }

    return () => controller.abort();
  }, [userId, isOpen]);

  const handleDelete = async () => {
    if (!userId) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete user "${user?.name}"?`
    );
    if (!confirmed) return;

    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");

      setDeleting(false);
      onClose();
      if (onUserDeleted) onUserDeleted();
    } catch (err: any) {
      setError(err.message || "Error deleting user");
      setDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity"
          onClick={onClose}
        ></div>

        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
              <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  User Details
                </h2>
                <button
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={onClose}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-6">
                {loading ? (
                  <div className="text-gray-600 dark:text-gray-300">
                    Loading user data...
                  </div>
                ) : error ? (
                  <div className="text-red-600 dark:text-red-400 mb-4">
                    Error: {error}
                  </div>
                ) : user ? (
                  <>
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center text-xl font-semibold text-teal-600 dark:text-teal-300">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-lg font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>
                          Signed up:{" "}
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {user.lastLogin && (
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>
                            Last login:{" "}
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="capitalize">Role: {user.role}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className={`inline-flex items-center px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <Trash2 size={16} className="mr-2" />
                        {deleting ? "Deleting..." : "Delete User"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-600 dark:text-gray-300">
                    No user selected.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetailsDrawer;
