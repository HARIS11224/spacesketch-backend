import React from 'react';
import { X } from 'lucide-react';

interface TexturePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  texture: {
    name: string;
    preview: string;
    type: string;
    tags: string[];
  };
}
const baseURL = 'http://localhost:5000';  
const TexturePreviewModal: React.FC<TexturePreviewModalProps> = ({ isOpen, onClose, texture }) => {
  if (!isOpen || !texture) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 bg-gray-100 dark:bg-gray-800 p-4 flex justify-center items-center">
            <img
              src={`${baseURL}${texture.preview}`} 
              alt={texture.name}
              className="max-h-[80vh] object-contain rounded"
            />
          </div>
          <div className="md:w-1/3 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{texture.name}</h2>
            <span className={`inline-block px-3 py-1 text-sm rounded-full ${
              texture.type === 'Wall'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
            }`}>
              {texture.type}
            </span>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {texture.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 inline-flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TexturePreviewModal;
