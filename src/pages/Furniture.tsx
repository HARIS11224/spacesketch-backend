import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import axios from 'axios';
import UploadFurnitureModal from '../components/furniture/UploadFurnitureModal';
import { Trash2 } from 'lucide-react'; // add this to your imports
interface FurnitureItem {
  _id: string;
  name: string;
  image: string;
  model: string;
  type: string;
}

const ITEMS_PER_PAGE = 6;

const Furniture: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const BASE_URL = 'http://localhost:5000'; // static file server

  useEffect(() => {
    fetchFurnitureItems();
  }, []);

  const fetchFurnitureItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      const itemsWithFullImageURL = res.data.map((item: FurnitureItem) => ({
        ...item,
        image: `${BASE_URL}/${item.image}`, // prepend full URL
      }));
      setFurnitureItems(itemsWithFullImageURL);
    } catch (error) {
      console.error('Failed to fetch furniture items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setFurnitureItems((prev) => prev.filter(item => item._id !== id));
    } catch (error) {
      alert('Failed to delete item');
      console.error(error);
    }
  };

  // Filter items based on search query
  const filteredItems = furnitureItems.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.model.toLowerCase().includes(query)
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle page changes
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Reset to page 1 when search query or furnitureItems changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, furnitureItems]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Furniture Assets</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400">
              <Filter size={16} className="mr-2" />
              <span>Filter</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            >
              <Plus size={16} className="mr-2" />
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</span>
                    <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</span>
                    <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Model</span>
                </th>
                <th className="px-6 py-3 text-right">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={4} className="text-center p-4 text-gray-600 dark:text-gray-300">Loading...</td></tr>
              ) : paginatedItems.length === 0 ? (
                <tr><td colSpan={4} className="text-center p-4 text-gray-600 dark:text-gray-300">No furniture items found</td></tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 mr-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{item.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{item.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap justify-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center justify-center w-8 h-8 rounded-md bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 shadow-md transition-colors"
                        aria-label="Delete item"
                        title="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Showing <span className="font-medium">{paginatedItems.length}</span> of <span className="font-medium">{filteredItems.length}</span> filtered items
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <UploadFurnitureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Furniture;
