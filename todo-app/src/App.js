import React, { useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import EditModal from './components/EditModal';
import Notification from './components/Notification';
import { useTodos } from './hooks/useTodos';
import { useNotification } from './hooks/useNotification';

function App() {
  const {
    todos,
    loading,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo
  } = useTodos();

  const { notification, showNotification, closeNotification } = useNotification();
  const [editingTodo, setEditingTodo] = useState(null);

  const handleAddTodo = async (title) => {
    const result = await addTodo(title);
    showNotification(result.message, result.success ? 'success' : 'error');
  };

  const handleToggleTodo = async (id) => {
    const result = await toggleTodo(id);
    showNotification(result.message, result.success ? 'success' : 'error');
  };

  const handleEditTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      setEditingTodo(todo);
    }
  };

  const handleUpdateTodo = async (id, newTitle) => {
    const result = await updateTodo(id, newTitle);
    showNotification(result.message, result.success ? 'success' : 'error');
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const result = await deleteTodo(id);
      showNotification(result.message, result.success ? 'success' : 'error');
    }
  };

  const closeEditModal = () => {
    setEditingTodo(null);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo List</h1>
          <p className="text-gray-600">Manage Your tasks with JSON Placeholder API</p>
        </div>

        <AddTodoForm onAdd={handleAddTodo} />

        <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />

        <EditModal
          todo={editingTodo}
          isOpen={!!editingTodo}
          onClose={closeEditModal}
          onUpdate={handleUpdateTodo}
        />

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}
      </div>
    </div>
  );
}

export default App;
