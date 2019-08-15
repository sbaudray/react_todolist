import React from "react";

interface Props {
  todo: Todo;
  onRemove: (id: string) => void;
}

export function TodoItem({ todo, onRemove }: Props) {
  return (
    <div>
      {todo.content}
      <button onClick={() => onRemove(todo.id)}>remove item</button>
    </div>
  );
}
