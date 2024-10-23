import React, { useState } from 'react';
import { useCardContext } from '../context/CardContext';
import { Loader2, Image } from 'lucide-react';

interface CardEditorProps {
  card: CardData;
  onUpdate: (updatedCard: CardData) => void;
}

function CardEditor({ card, onUpdate }: CardEditorProps) {
  const { categories } = useCardContext();
  const [editedCard, setEditedCard] = useState(card);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleImageLoad = async () => {
    try {
      setIsImageLoading(true);
      setError('');

      // Test if image exists and is accessible
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to load image');

      // Update the screenshot URL with the provided image URL
      setEditedCard(prev => ({
        ...prev,
        screenshotUrl: imageUrl
      }));
      setImageUrl('');
    } catch (err) {
      setError('Failed to load image. Please check the URL and try again.');
    } finally {
      setIsImageLoading(false);
    }
  };

  const fetchMetadata = async (url: string) => {
    try {
      setIsLoading(true);
      setError('');

      const metadataResponse = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
      const metadata = await metadataResponse.json();

      if (!metadata.data) {
        throw new Error('Failed to fetch website metadata');
      }

      const { title, description, logo, image } = metadata.data;

      // Only fetch screenshot if no custom image is set
      if (!editedCard.screenshotUrl) {
        const screenshotResponse = await fetch(
          `https://api.apiflash.com/v1/urltoimage?access_key=0aa83f7bafd34450b39c259c645d4dba&wait_until=page_loaded&url=${encodeURIComponent(url)}&format=jpeg&quality=100&width=1920&height=1080`
        );

        setEditedCard((prev) => ({
          ...prev,
          name: title || url,
          description: description || 'No description available',
          screenshotUrl: screenshotResponse.url,
          faviconUrl: logo?.url || '',
        }));
      } else {
        setEditedCard((prev) => ({
          ...prev,
          name: title || url,
          description: description || 'No description available',
          faviconUrl: logo?.url || '',
        }));
      }
    } catch (err) {
      setError('Failed to fetch website data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlBlur = () => {
    if (editedCard.url && editedCard.url !== card.url) {
      fetchMetadata(editedCard.url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedCard.url) {
      setError('URL is required');
      return;
    }
    if (!editedCard.category) {
      setError('Category is required');
      return;
    }
    onUpdate(editedCard);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="url"
          name="url"
          value={editedCard.url}
          onChange={handleChange}
          onBlur={handleUrlBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={editedCard.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select a category</option>
          {categories.filter(cat => cat !== 'All').map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedCard.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={editedCard.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="customImage" className="block text-sm font-medium text-gray-700 mb-1">
          Custom Image URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            id="customImage"
            value={imageUrl}
            onChange={handleImageUrlChange}
            placeholder="Enter image URL"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleImageLoad}
            disabled={!imageUrl || isImageLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isImageLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Image size={20} />
            )}
            Load
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center text-blue-500">
          <Loader2 className="animate-spin mr-2" />
          Fetching website data...
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {editedCard.screenshotUrl && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
          <img
            src={editedCard.screenshotUrl}
            alt="Website preview"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || isImageLoading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading || isImageLoading ? 'Loading...' : 'Save Card'}
      </button>
    </form>
  );
}

export default CardEditor;