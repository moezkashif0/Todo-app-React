import React from 'react';
import TodoItem from './TodoItem';
import LoadingIndicator from './LoadingIndicator';
import EmptyState from './EmptyState';

const TodoList = ({ todos, loading, onToggle, onEdit, onDelete }) => {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;