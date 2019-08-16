import React from "react";
import { TodoList } from "../TodoList";
import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

const labels = ["cook", "shop", "sleep"];

const initialTodos = labels.map((label, index) => ({
  id: index.toString(),
  label
}));

const newTodo = "test";

it("displays initial todos", () => {
  const { getByText } = render(<TodoList initialTodos={initialTodos} />);

  labels.forEach(label => expect(getByText(label)).toBeInTheDocument());
});

it("adds a todo in the list", () => {
  const { getByRole, getByText } = render(
    <TodoList initialTodos={initialTodos} />
  );

  const input = getByRole("textbox");

  fireEvent.change(input, { target: { value: newTodo } });
  fireEvent.keyDown(input, { key: "Enter", code: 13 });

  expect(getByText(newTodo)).toBeInTheDocument();
});

it("removes a todo from the list", () => {
  const { queryByText, getAllByText } = render(
    <TodoList initialTodos={initialTodos} />
  );

  const indexToRemove = 0;
  const removeButton = getAllByText("remove item")[indexToRemove];

  fireEvent.click(removeButton);

  expect(queryByText(labels[indexToRemove])).not.toBeInTheDocument();
  expect(queryByText(labels[1])).toBeInTheDocument();
});

it("edits a todo in the list", () => {
  const { getByText, getByDisplayValue, getAllByText } = render(
    <TodoList initialTodos={initialTodos} />
  );

  const indexToEdit = 0;
  const initialLabel = labels[indexToEdit];

  const editButton = getAllByText("edit item")[indexToEdit];

  fireEvent.click(editButton);

  const editionInput = getByDisplayValue(initialLabel);

  fireEvent.change(editionInput, { target: { value: newTodo } });
  fireEvent.keyDown(editionInput, { key: "Enter", code: 13 });

  expect(getByText(newTodo)).toBeInTheDocument();
});
