import React from "react";

interface Props {
  todo: Todo;
  onRemove: (id: string, label: string) => void;
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
      editionInput.current && editionInput.current.focus();
    } else if (dirty) {
      editButton.current && editButton.current.focus();
    }
  }, [editing, dirty]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onLabelSubmit(todo.id, label);
    setEditing(false);
    setDirty(true);
  }

  return (
    <li data-testid="TodoItem">
      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={editionInput}
            value={label}
            onChange={e => setLabel(e.target.value)}
          />
        </form>
      ) : (
        <>
          <span>{todo.label}</span>
          <button
            aria-label={`edit ${todo.label}`}
            ref={editButton}
            onClick={() => setEditing(true)}
            onBlur={() => setDirty(false)}
          >
            edit
          </button>
          <button
            aria-label={`remove ${todo.label}`}
            onClick={() => onRemove(todo.id, todo.label)}
          >
            remove
          </button>
        </>
      )}
    </li>
  );
}
