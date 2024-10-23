import React from 'react';
import { X } from 'lucide-react';

interface CardProps {
  id: number;
  name: string;
  description: string;
  url: string;
  screenshotUrl: string;
  faviconUrl: string;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ name, description, url, screenshotUrl, faviconUrl, onDelete }) => {
  return (
    <>
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 z-10"
        aria-label="Delete card"
      >
        <X size={16} />
      </button>
      <img src={screenshotUrl} alt={`Screenshot of ${name}`} className="w-full h-40 object-cover" />
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center mb-2">
          {faviconUrl && (
            <img src={faviconUrl} alt="Favicon" className="w-4 h-4 mr-2" />
          )}
          <h2 className="text-lg font-semibold line-clamp-1">{name}</h2>
        </div>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm truncate"
        >
          {url}
        </a>
      </div>
    </>
  );
};

export default Card;