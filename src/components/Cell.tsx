
import { useState } from "react";

type Props = {
  raw: string;
  display: string | number;
  onChange: (value: string) => void;
};

const Cell = ({
  raw,
  display,
  onChange,
}: Props) => {
  const [editing, setEditing] = useState(false);

  return (
    <input
      className={`cell ${
  display === "#ERROR" ||
  display === "#CIRCULAR"
    ? "error-cell"
    : ""
}`}
      value={
        editing
          ? raw
          : String(display || "")
      }
      onFocus={() => setEditing(true)}
      onBlur={() => setEditing(false)}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
};

export default Cell;