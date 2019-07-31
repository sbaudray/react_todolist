import React from "react";
import { TodoList } from "./TodoList";
import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

const labels = ["cook", "shopping", "sleep"];

const initialTodos = labels.map((label, index) => ({
  id: index.toString(),
  content: label
}));

it("asks for todos when there are none", () => {
  const { getByText } = render(<TodoList />);
  getByText("Please give me something to show");
});

it("displays initial todos", () => {
  const { getByText } = render(<TodoList initialTodos={initialTodos} />);

  labels.forEach(label => expect(getByText(label)).toBeInTheDocument());
});

it("adds a todo in the list", () => {
  const { getByLabelText, getByText } = render(
    <TodoList initialTodos={initialTodos} />
  );

  const input = getByLabelText("Add todo");
  const newTodo = "testing";

  fireEvent.change(input, { target: { value: newTodo } });
  fireEvent.keyDown(input, { key: "Enter", code: 13 });

  expect(getByText(newTodo)).toBeInTheDocument();
});

it("removes a todo of the list", () => {
  const { queryByText, getAllByRole } = render(
    <TodoList initialTodos={initialTodos} />
  );

  const indexToRemove = 2;
  const remover = getAllByRole("button")[indexToRemove];

  fireEvent.click(remover);

  expect(queryByText(labels[indexToRemove])).not.toBeInTheDocument();
  expect(queryByText(labels[0])).toBeInTheDocument();
});
