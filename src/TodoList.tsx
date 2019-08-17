import React from "react";
import uuid from "uuid/v4";
import { TodoItem } from "./TodoItem";
import { TodoAddForm } from "./TodoAddForm";
import { AccessibilityFeedback } from "./AccessibilityFeedback";

interface Props {
  initialTodos?: Todo[];
}

const makeTodo = (label: string) => ({ id: uuid(), label });

export function TodoList({ initialTodos = [] }: Props) {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);
  const [feedback, setFeedback] = React.useState("");
  const topHeading = React.useRef<HTMLHeadingElement>(null);

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

  return (
    <section aria-labelledby="todo-list">
      <h1 id="todo-list" tabIndex={-1} ref={topHeading}>
        Todo List
      </h1>
      <TodoAddForm onSubmit={addTodo} />
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
      <AccessibilityFeedback feedback={feedback} />
    </section>
  );
}
