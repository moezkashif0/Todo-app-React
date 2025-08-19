import React, { useState, useEffect } from 'react';

const EditModal = ({ todo, isOpen, onClose, onUpdate }) => {
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    if (todo) {
      setEditTitle(todo.title);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle.trim());
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === 'editModal') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="editModal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backdropFilter: 'blur(4px)' }}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            required
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;