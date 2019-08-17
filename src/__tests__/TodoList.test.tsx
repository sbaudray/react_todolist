import React from "react";
import { TodoList } from "../TodoList";
import { render, cleanup, fireEvent, within } from "@testing-library/react";

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
  const form = getByRole("form");

  fireEvent.change(input, { target: { value: newTodo } });
  fireEvent.submit(form);

  expect(getByText(newTodo)).toBeInTheDocument();
});

it("removes a todo from the list", () => {
  const { queryByText, getAllByText } = render(
    <TodoList initialTodos={initialTodos} />
  );

  const indexToRemove = 0;
  const removeButton = getAllByText("remove")[indexToRemove];

  fireEvent.click(removeButton);

  expect(queryByText(labels[indexToRemove])).not.toBeInTheDocument();
  expect(queryByText(labels[1])).toBeInTheDocument();
});

it("edits a todo in the list", () => {
  const { getByText, getByDisplayValue, getAllByTestId } = render(
    <TodoList initialTodos={initialTodos} />
  );

  const indexToEdit = 0;
  const initialLabel = labels[indexToEdit];

  const item = getAllByTestId("TodoItem")[indexToEdit];
  const editButton = within(item).getByText("edit");

  fireEvent.click(editButton);

  const editionInput = getByDisplayValue(initialLabel);

  fireEvent.change(editionInput, { target: { value: newTodo } });

  const form = within(item).getByRole("form");

  fireEvent.submit(form);

  expect(getByText(newTodo)).toBeInTheDocument();
});
