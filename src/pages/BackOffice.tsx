import React, { useState } from 'react';
import { useCardContext } from '../context/CardContext';
import CardEditor from '../components/CardEditor';
import CategoryManager from '../components/CategoryManager';
import { Layers, Grid } from 'lucide-react';

function BackOffice() {
  const { cards, addCard, updateCard } = useCardContext();
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [activeTab, setActiveTab] = useState<'cards' | 'categories'>('cards');

  const handleCardSelect = (card: CardData) => {
    setSelectedCard(card);
  };

  const handleCardUpdate = (updatedCard: CardData) => {
    updateCard(updatedCard);
    setSelectedCard(null);
  };

  const handleAddCard = () => {
    const newCard: CardData = {
      id: Date.now(),
      name: '',
      description: '',
      url: '',
      screenshotUrl: '',
      faviconUrl: '',
      category: '',
    };
    addCard(newCard);
    setSelectedCard(newCard);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Back Office</h1>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
          <button
            onClick={() => setActiveTab('cards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === 'cards'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Grid size={20} />
            Cards
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === 'categories'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Layers size={20} />
            Categories
          </button>
        </div>
      </div>

      {activeTab === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Card Management</h2>
                <button
                  onClick={handleAddCard}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Add New Card
                </button>
              </div>
              <div className="space-y-2">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardSelect(card)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCard?.id === card.id
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{card.name || 'New Card'}</div>
                    {card.category && (
                      <div className="text-sm text-gray-500">{card.category}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            {selectedCard ? (
              <CardEditor card={selectedCard} onUpdate={handleCardUpdate} />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-500 text-center">
                  Select a card to edit or create a new one
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <CategoryManager />
      )}
    </div>
  );
}

export default BackOffice;