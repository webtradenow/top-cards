import React, { useState } from 'react';
import { useCardContext } from '../context/CardContext';
import { Edit2, Trash2, Check, X, Plus } from 'lucide-react';

function CategoryManager() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCardContext();
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleEdit = (category: string) => {
    setEditingCategory(category);
    setEditValue(category);
  };

  const handleUpdate = (oldCategory: string) => {
    if (editValue.trim() && editValue !== oldCategory && !categories.includes(editValue.trim())) {
      updateCategory(oldCategory, editValue.trim());
    }
    setEditingCategory(null);
  };

  const handleDelete = (category: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${category}"?`)) {
      deleteCategory(category);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Category Management</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            {editingCategory === category ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={() => handleUpdate(category)}
                  className="p-1 text-green-600 hover:text-green-700"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <span className="text-gray-700">{category}</span>
                <div className="flex items-center gap-2">
                  {category !== 'All' && (
                    <>
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-1 text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(category)}
                        className="p-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManager;