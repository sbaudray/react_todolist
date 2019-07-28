import React from "react";

interface Todo {
  id: string;
  content: string;
}

interface TodoListProps {
  initialTodos?: Todo[];
}

export function TodoList({ initialTodos }: TodoListProps) {
  return (
    <div>
      {initialTodos
        ? initialTodos.map(item => item.content)
        : "Please give me something to show"}
    </div>
  );
}
