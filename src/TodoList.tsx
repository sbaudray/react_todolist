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
  const [feedback, setFeedback] = React.useState("");
  const topHeading = React.useRef<HTMLHeadingElement>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    addTodo(label);
    setLabel("");
  }

  function addTodo(label: string) {
    setTodos(todos => todos.concat(makeTodo(label)));
    setFeedback(`${label} added`);
  }

  function removeTodo(id: string, label: string) {
    setTodos(todos => todos.filter(todo => todo.id !== id));
    setFeedback(`${label} removed`);

    topHeading.current && topHeading.current.focus();
  }

  function changeTodoLabel(id: string, label: string) {
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, label } : todo))
    );
    setFeedback(`${label} saved`);
  }

  const labelValid = !!label.trim();

  return (
    <section aria-labelledby="todo-list">
      <h1 id="todo-list" tabIndex={-1} ref={topHeading}>
        Todo List
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="vh" htmlFor="add">
          Write a new todo
        </label>
        <input
          aria-invalid={!labelValid}
          id="add"
          type="text"
          placeholder="What you gotta do?"
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
        <button disabled={!labelValid} type="submit">
          Add
        </button>
      </form>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={removeTodo}
            onLabelSubmit={changeTodoLabel}
          />
        ))}
      </ul>
      <div className="vh" role="status">
        {feedback}
      </div>
    </section>
  );
}
