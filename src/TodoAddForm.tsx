import React from "react";

interface Props {
  onSubmit: (label: string) => void;
}

export function TodoAddForm({ onSubmit }: Props) {
  const [label, setLabel] = React.useState("");
  const labelValid = !!label.trim();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(label);
        setLabel("");
      }}
    >
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
  );
}

