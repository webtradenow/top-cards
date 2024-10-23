import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CardContextType {
  cards: CardData[];
  categories: string[];
  addCard: (card: CardData) => void;
  updateCard: (updatedCard: CardData) => void;
  deleteCard: (id: number) => void;
  addCategory: (category: string) => void;
  updateCategory: (oldCategory: string, newCategory: string) => void;
  deleteCategory: (category: string) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [categories, setCategories] = useState<string[]>(['All', 'Productivity', 'Development', 'Design', 'Marketing']);

  const addCard = (card: CardData) => {
    setCards((prevCards) => [...prevCards.slice(0, 15), card]);
  };

  const updateCard = (updatedCard: CardData) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  const deleteCard = (id: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const updateCategory = (oldCategory: string, newCategory: string) => {
    if (oldCategory !== 'All') {
      setCategories((prevCategories) =>
        prevCategories.map((cat) => (cat === oldCategory ? newCategory : cat))
      );
    }
  };

  const deleteCategory = (category: string) => {
    if (category !== 'All') {
      setCategories((prevCategories) => prevCategories.filter((c) => c !== category));
    }
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        categories,
        addCard,
        updateCard,
        deleteCard,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
}