import React from "react";
import { TodoList } from "./TodoList";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

const initialTodos = [
  { id: "1", content: "foo" },
  { id: "2", content: "bar" },
  { id: "3", content: "baz" }
];

it("asks for todos when there are none", () => {
  const { getByText } = render(<TodoList />);
  getByText("Please give me something to show");
});

it("displays initial todos", () => {
  const { getByText } = render(<TodoList initialTodos={initialTodos} />);
  getByText(/foo/);
  getByText(/bar/);
  getByText(/baz/);
});
