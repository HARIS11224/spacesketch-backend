import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoreHorizontal, Download } from 'lucide-react';

interface Asset {
  _id: string;
  name: string;
  type: string;
  preview: string;
  downloads: number;
}
const baseURL = 'http://localhost:5000';  
interface Props {
  type: 'furniture' | 'texture';
}

const TopAssetsWidget: React.FC<Props> = ({ type }) => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const url = type === 'furniture'
          ? 'http://localhost:5000/api/items'
          : 'http://localhost:5000/api/textures';

        const response = await axios.get(url);
        const sorted = response.data
          .filter((item: Asset) => item.downloads !== undefined)
          .sort((a: Asset, b: Asset) => b.downloads - a.downloads)
          .slice(0, 3);
          console.log(response.data);

        setAssets(sorted);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, [type]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          Top {type === 'furniture' ? 'Furniture Items' : 'Textures'}
        </h2>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <div className="space-y-5">
{assets.map((asset) => {
  const imagePath = `${baseURL}${asset.preview}`;

  return (
    <div
      key={asset._id}
      className="flex items-center pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 bg-gray-200 dark:bg-gray-700">
        <img
          src={imagePath}
          alt={asset.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800 dark:text-white">{asset.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{asset.type}</p>
      </div>
      <div className="flex items-center">
        <div className="mr-4 text-right">
          <p className="text-sm font-medium text-gray-800 dark:text-white">{asset.downloads}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Downloads</p>
        </div>
        <Download size={18} className="text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
})}


      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
          View all {type === 'furniture' ? 'furniture' : 'textures'}
        </button>
      </div>
    </div>
  );
};

export default TopAssetsWidget;
