import React from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const completedClass = todo.completed ? 'opacity-75' : '';
  const titleClass = todo.completed ? 'line-through text-gray-500' : 'text-gray-800';
  const editDisabled = todo.completed;

  return (
    <div className={`todo-item bg-white rounded-lg shadow-md p-4 fade-in ${completedClass}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
          />
          <span className={`flex-1 ${titleClass} text-lg`}>
            {todo.title}
          </span>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(todo.id)}
            disabled={editDisabled}
            className={`px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200 ${
              editDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;