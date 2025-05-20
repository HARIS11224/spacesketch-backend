import React, { useEffect, useState } from 'react';
import { Search, Plus, MoreHorizontal, ArrowUpDown, Eye } from 'lucide-react';
import UploadTextureModal from '../components/textures/UploadTextureModal';
import TexturePreviewModal from '../components/textures/TexturePreviewModal';
import axios from 'axios';

interface Texture {
  _id: string;
  name: string;
  type: string;
  tags: string[];
  downloads: number;
  uploadDate: string;
  preview: string; // full URL to image
}
const baseURL = 'http://localhost:5000';  

const Textures: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewTexture, setPreviewTexture] = useState<Texture | null>(null);

  const [textures, setTextures] = useState<Texture[]>([]);
  const [filteredTextures, setFilteredTextures] = useState<Texture[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'downloads'>('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredTextures.length / itemsPerPage);

  useEffect(() => {
    fetchTextures();
  }, []);

  useEffect(() => {
    filterAndSortTextures();
  }, [textures, searchQuery, sortBy]);

  const fetchTextures = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Texture[]>('http://localhost:5000/api/textures');
      setTextures(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching textures:', err);
      setError('Failed to fetch textures');
      setLoading(false);
    }
  };

  const filterAndSortTextures = () => {
    const query = searchQuery.toLowerCase();
    let items = textures.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    );

    items = items.sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      return a.name.localeCompare(b.name);
    });

    setFilteredTextures(items);
    setCurrentPage(1);
  };

  const paginatedTextures = filteredTextures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreview = (item: Texture) => {
    setPreviewTexture(item);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Texture Assets</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search textures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSortBy(sortBy === 'downloads' ? 'name' : 'downloads')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            >
              <ArrowUpDown size={16} className="mr-2" />
              Sort by {sortBy === 'downloads' ? 'Name' : 'Downloads'}
            </button>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            >
              <Plus size={16} className="mr-2" />
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading textures...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedTextures.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                  <img
                   src={`${baseURL}${item.preview}`} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.png'; // fallback image
                    }}
                  />
                  <span
                    className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${
                      item.type === 'Wall'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Uploaded {item.uploadDate}
                      </p>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{item.downloads}</span>{' '}
                      downloads
                    </span>
                    <button
                      onClick={() => handlePreview(item)}
                      className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
                    >
                      <Eye size={14} /> Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTextures.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No texture items found</p>
            </div>
          )}

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Showing <span className="font-medium">{paginatedTextures.length}</span> of{' '}
              <span className="font-medium">{filteredTextures.length}</span> textures
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <UploadTextureModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
      {previewTexture && (
        <TexturePreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          texture={previewTexture}
        />
      )}
    </div>
  );
};

export default Textures;
