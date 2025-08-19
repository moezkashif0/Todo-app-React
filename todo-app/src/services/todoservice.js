const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const todoService = {
  async fetchTodos() {
    try {
      const response = await fetch(`${BASE_URL}/todos`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const todos = await response.json();
      return todos.slice(0, 10);
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  async createTodo(todo) {
    try {
      const response = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  async updateTodo(id, todo) {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  async deleteTodo(id) {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
};