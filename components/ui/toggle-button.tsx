import { useState } from "react";
import { Button } from "./button";

export const ToggleButton = ({defaultChecked = false, label, name}: {defaultChecked?: boolean; label: React.ReactNode; name: string}) => {
  const [value, setValue] = useState(defaultChecked);

  return (
    <>
      <Button
        type="button"
        variant={value ? "secondary" : "ghost"}
        onClick={() => setValue(!value)}
      >
          {label}
      </Button>
      <input type="checkbox" name={name} checked={value} onChange={() => setValue(value)} className="hidden" />
    </>
  );
}