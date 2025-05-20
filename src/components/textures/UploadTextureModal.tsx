import React, { useState } from 'react';
import { X, Upload, Image, PlusCircle, XCircle } from 'lucide-react';

interface UploadTextureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadTextureModal: React.FC<UploadTextureModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const types = ['Wall', 'Floor'];

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
      
      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

const handleSubmit = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();

  if (!name || !type || !imageFile) return;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('type', type);
  formData.append('tags', tags.join(','));
  formData.append('preview', imageFile);

  try {
    const response = await fetch('http://localhost:5000/api/textures', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload texture');
    }

    const data = await response.json();
    console.log('Upload successful:', data);

    // Reset form and close modal
    setName('');
    setType('');
    setTags([]);
    setTagInput('');
    setImageFile(null);
    setPreview(null);
    setStep(1);
    onClose();
  } catch (error) {
    console.error('Error uploading texture:', error);
    alert('There was an error uploading the texture. Please try again.');
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-lg z-10 relative transform transition-all">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {step === 1 ? 'Upload Texture' : 'Preview & Submit'}
          </h3>
          <button 
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-6 py-4">
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Texture Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
                    placeholder="Marble Texture"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select a type</option>
                    {types.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tags
                  </label>
                  <div className="mt-1 flex flex-wrap items-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
                    {tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-200"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-teal-600 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-200"
                        >
                          <XCircle size={14} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagInputKeyDown}
                      className="flex-1 min-w-[120px] border-0 p-0 focus:ring-0 text-sm text-gray-800 dark:text-white dark:bg-gray-700"
                      placeholder={tags.length === 0 ? "Add tags (press Enter)" : ""}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Press Enter to add a tag</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Texture Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label
                          htmlFor="texture-image"
                          className="relative cursor-pointer rounded-md font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 dark:focus-within:ring-teal-400"
                        >
                          <span>Upload an image</span>
                          <input
                            id="texture-image"
                            name="texture-image"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageFileChange}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG up to 10MB
                      </p>
                      {imageFile && (
                        <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                          {imageFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!name || !type || !imageFile}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Next
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                  {preview && (
                    <div className="aspect-square w-full overflow-hidden">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
                    
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Type:</span>
                        <span className={`ml-1 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          type === 'Wall' 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {type}
                        </span>
                      </div>
                      
                      <div className="col-span-2 mt-1">
                        <span className="text-gray-500 dark:text-gray-400">Tags:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                          {tags.length === 0 && (
                            <span className="text-gray-400 dark:text-gray-500 text-xs">No tags</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <Upload size={16} className="mr-2" />
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadTextureModal;