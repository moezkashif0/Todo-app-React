import { useState, useEffect } from 'react';
import { todoService } from '../services/todoservice';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const apiTodos = await todoService.fetchTodos();
      setTodos(apiTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
      setTodos([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const newTodo = {
        id: Date.now(),
        title: title,
        completed: false
      };
      
      setTodos(prevTodos => [newTodo, ...prevTodos]);
      
      // Try to sync with API
      await todoService.createTodo({
        title: title,
        completed: false
      });
      
      return { success: true, message: 'Task added successfully!' };
    } catch (error) {
      console.error('Error with API, but adding to local state anyway:', error);
      return { success: true, message: 'Task added to local storage!' };
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return { success: false, message: 'Todo not found' };

    const updatedTodos = todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    
    setTodos(updatedTodos);
    
    const status = !todo.completed ? 'completed' : 'pending';
    
    try {
      await todoService.updateTodo(id, {
        id: id,
        title: todo.title,
        completed: !todo.completed
      });
    } catch (error) {
      console.error('Error syncing with API (local state change preserved):', error);
    }

    return { success: true, message: `Task marked as ${status}!` };
  };

  const updateTodo = async (id, newTitle) => {
    try {
      const updatedTodos = todos.map(t =>
        t.id === id ? { ...t, title: newTitle } : t
      );
      
      setTodos(updatedTodos);

      try {
        const todo = todos.find(t => t.id === id);
        await todoService.updateTodo(id, {
          id: id,
          title: newTitle,
          completed: todo.completed
        });
      } catch (apiError) {
        console.error('Error syncing with API (local state change preserved):', apiError);
      }
      
      return { success: true, message: 'Task updated successfully!' };
    } catch (error) {
      console.error('Error updating todo:', error);
      return { success: false, message: 'Failed to update task. Please try again.' };
    }
  };

  const deleteTodo = async (id) => {
    try {
      const updatedTodos = todos.filter(t => t.id !== id);
      setTodos(updatedTodos);

      try {
        await todoService.deleteTodo(id);
      } catch (apiError) {
        console.error('Error syncing deletion with API (local state change preserved):', apiError);
      }
      
      return { success: true, message: 'Task deleted successfully!' };
    } catch (error) {
      console.error('Error deleting todo:', error);
      return { success: false, message: 'Failed to delete task. Please try again.' };
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    loadTodos
  };
};