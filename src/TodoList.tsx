import React from "react";
import uuid from "uuid/v4";
import { TodoItem } from "./TodoItem";

interface Props {
  initialTodos?: Todo[];
}

const makeTodo = (label: string) => ({ id: uuid(), label });

export function TodoList({ initialTodos = [] }: Props) {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);
  const [label, setLabel] = React.useState("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addTodo(label);
      setLabel("");
    }
  }

  function addTodo(content: string) {
    setTodos(todos => todos.concat(makeTodo(content)));
  }

  function removeTodo(id: string) {
    setTodos(todos => todos.filter(item => item.id !== id));
  }

  function changeTodoLabel(id: string, label: string) {
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, label } : todo))
    );
  }

  return (
    <div>
      <label htmlFor="todo">Add something todo</label>
      <input
        style={{ display: "block" }}
        id="todo"
        placeholder="What you gonna do?"
        value={label}
        onChange={e => setLabel(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onRemove={removeTodo}
          onLabelSubmit={changeTodoLabel}
        />
      ))}
    </div>
  );
}
