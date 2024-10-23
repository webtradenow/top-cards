import React, { useState } from 'react';

interface DeleteConfirmationProps {
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Confirm Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteConfirmation;