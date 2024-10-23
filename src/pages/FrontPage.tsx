import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import UrlForm from '../components/UrlForm';
import DeleteConfirmation from '../components/DeleteConfirmation';
import { useCardContext } from '../context/CardContext';

function FrontPage() {
  const { cards, addCard, deleteCard } = useCardContext();
  const [cardToDelete, setCardToDelete] = useState<number | null>(null);
  const [showUrlForm, setShowUrlForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Productivity', 'Development', 'Design', 'Marketing'];

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleUrlSubmit = async (url: string) => {
    try {
      const metadataResponse = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
      const metadata = await metadataResponse.json();

      const { title, description, logo, image } = metadata.data;

      const screenshotResponse = await fetch(
        `https://api.apiflash.com/v1/urltoimage?access_key=0aa83f7bafd34450b39c259c645d4dba&wait_until=page_loaded&url=${encodeURIComponent(url)}&format=jpeg&quality=100&width=1920&height=1080`
      );

      const newCard: CardData = {
        id: Date.now(),
        name: title || url,
        description: description || 'No description available',
        url: url,
        screenshotUrl: screenshotResponse.url,
        faviconUrl: logo?.url || '',
        category: activeCategory === 'All' ? categories[1] : activeCategory,
      };

      addCard(newCard);
    } catch (error) {
      console.error('Error fetching website data:', error);
    }
  };

  const handleDeleteCard = (id: number) => {
    setCardToDelete(id);
  };

  const confirmDelete = (password: string) => {
    if (password === '5656life!') {
      deleteCard(cardToDelete!);
      setCardToDelete(null);
    } else {
      alert('Incorrect password. Deletion cancelled.');
    }
  };

  const cancelDelete = () => {
    setCardToDelete(null);
  };

  const filteredCards = cards.filter(card => 
    activeCategory === 'All' ? true : card.category === activeCategory
  );

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < 16; i++) {
      const card = filteredCards[i];
      grid.push(
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col relative">
          {card ? (
            <Card {...card} onDelete={() => handleDeleteCard(card.id)} />
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] text-4xl font-bold text-gray-300 p-12 bg-gradient-to-br from-gray-50 to-gray-100">
              WIZ
            </div>
          )}
        </div>
      );
    }
    return grid;
  };

  return (
    <div>
      <div className="w-full h-[600px] bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Top Apps</h1>
            <p className="text-xl">Curated by Wizseller.com</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {renderGrid()}
        </div>
        
        <div className="flex justify-center mt-8">
          {!showUrlForm ? (
            <button
              onClick={() => setShowUrlForm(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Add Top URL
            </button>
          ) : (
            <UrlForm onSubmit={handleUrlSubmit} />
          )}
        </div>
      </div>

      {cardToDelete && (
        <DeleteConfirmation onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
  );
}

export default FrontPage;