import React from "react";
import uuid from "uuid/v4";
import { TodoItem } from "./TodoItem";

interface Props {
  initialTodos?: Todo[];
}

const makeTodo = (content: string) => ({ id: uuid(), content });

export function TodoList({ initialTodos = [] }: Props) {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);
  const [writing, write] = React.useState("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addTodo(writing);
      write("");
    }
  }

  function addTodo(content: string) {
    setTodos(todos => todos.concat(makeTodo(content)));
  }

  function removeTodo(id: string) {
    setTodos(todos => todos.filter(item => item.id !== id));
  }

  return (
    <div>
      <label htmlFor="todo">Add something todo</label>
      <input
        style={{ display: "block" }}
        id="todo"
        placeholder="What you gonna do?"
        value={writing}
        onChange={e => write(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onRemove={removeTodo} />
      ))}
    </div>
  );
}
