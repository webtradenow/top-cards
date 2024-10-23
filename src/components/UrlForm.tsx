import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface UrlFormProps {
  onSubmit: (url: string) => void;
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center border-b-2 border-blue-500 py-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL"
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          required
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default UrlForm;