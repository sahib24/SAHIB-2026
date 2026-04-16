"use client";
import { useState } from "react";

export default function Counter() {
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await fetch("api");
    setLoading(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>

      {open && (
        <div>
          <p>Modal</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
