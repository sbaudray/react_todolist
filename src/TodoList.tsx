import React from "react";
import uuid from "uuid/v4";

interface Todo {
  id: string;
  content: string;
}

interface TodoListProps {
  initialTodos?: Todo[];
}

export function TodoList({ initialTodos = [] }: TodoListProps) {
  const [newTodo, setNewTodo] = React.useState("");
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setTodos(todos => [...todos, { id: uuid(), content: newTodo }]);
      setNewTodo("");
    }
  }

  function removeTodo(id: string) {
    setTodos(todos => todos.filter(item => item.id !== id));
  }

  return (
    <div>
      {todos.length
        ? todos.map(item => (
            <div key={item.id}>
              {item.content}
              <button onClick={() => removeTodo(item.id)}>remove item</button>
            </div>
          ))
        : "Please give me something to show"}
      <label htmlFor="todo">Add todo</label>
      <input
        id="todo"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
