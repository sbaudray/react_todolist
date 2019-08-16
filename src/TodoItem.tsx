import React from "react";

interface Props {
  todo: Todo;
  onRemove: (id: string) => void;
  onLabelSubmit: (id: string, label: string) => void;
}

export function TodoItem({ todo, onRemove, onLabelSubmit }: Props) {
  const [editing, setEditing] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);
  const [label, setLabel] = React.useState(todo.label);

  const editionInput = React.useRef<HTMLInputElement>(null);
  const editButton = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (editing) {
      const node = editionInput.current;
      node && node.focus();
    } else if (dirty) {
      const node = editButton.current;
      node && node.focus();
    }
  }, [editing, dirty]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onLabelSubmit(todo.id, label);
      setEditing(false);
      setDirty(true);
    }
  }

  return (
    <div>
      {editing ? (
        <input
          ref={editionInput}
          value={label}
          onChange={e => setLabel(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <span>{todo.label}</span>
          <button
            ref={editButton}
            onClick={() => setEditing(true)}
            onBlur={() => setDirty(false)}
          >
            edit item
          </button>
          <button onClick={() => onRemove(todo.id)}>remove item</button>
        </>
      )}
    </div>
  );
}
