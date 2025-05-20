import React, { useState } from 'react';
import { X, Upload, File, Image } from 'lucide-react';

interface UploadFurnitureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadFurnitureModal: React.FC<UploadFurnitureModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<number | ''>('');
  const [jsFile, setJsFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories: Record<number, string> = {
    1: 'Chair',
    2: 'Decoration',
    3: 'Window',
    7: 'Door',
    8: 'Decoration'
  };

  const handleJsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setJsFile(files[0]);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setImageFile(files[0]);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!jsFile || !imageFile || !name || category === '') return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', String(category)); // category is a number
      formData.append('model', jsFile);
      formData.append('image', imageFile);

      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      // Reset on success
      setName('');
      setCategory('');
      setJsFile(null);
      setImageFile(null);
      setPreview(null);
      setStep(1);
      onClose();
    } catch (err) {
      setError('Failed to upload furniture. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80" onClick={onClose} />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg z-10 relative">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {step === 1 ? 'Upload Furniture Item' : 'Preview & Submit'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(Number(e.target.value))}
                    required
                    className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    {Object.entries(categories).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    JavaScript File (3D Model)
                  </label>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="text-center">
                      <File className="mx-auto h-12 w-12 text-gray-400" />
                      <label htmlFor="js-file" className="cursor-pointer text-teal-600 dark:text-teal-400">
                        <span>Upload a file</span>
                        <input id="js-file" type="file" accept=".js" className="sr-only" onChange={handleJsFileChange} required />
                      </label>
                      {jsFile && <p className="mt-1 text-sm">{jsFile.name}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preview Image
                  </label>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <label htmlFor="image-file" className="cursor-pointer text-teal-600 dark:text-teal-400">
                        <span>Upload an image</span>
                        <input id="image-file" type="file" accept="image/*" className="sr-only" onChange={handleImageFileChange} required />
                      </label>
                      {imageFile && <p className="mt-1 text-sm">{imageFile.name}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={!name || category === '' || !jsFile || !imageFile} className="btn-primary">
                  Next
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {preview && (
                    <div className="sm:w-1/3">
                      <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Category: {categories[Number(category)]}
                    </p>
                    <div className="flex gap-2 mt-2 text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-300">JS</span>
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded dark:bg-green-900/30 dark:text-green-300">Image</span>
                    </div>
                  </div>
                </div>
              </div>

              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary">Back</button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn-primary inline-flex items-center"
                  disabled={loading}
                >
                  <Upload size={16} className="mr-2" />
                  {loading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const btnBase = "px-4 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2";
const btnPrimary = `${btnBase} bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500`;
const btnSecondary = `${btnBase} bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-teal-400`;

Object.assign(UploadFurnitureModal, {
  btnPrimary,
  btnSecondary
});

export default UploadFurnitureModal;
