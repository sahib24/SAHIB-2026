"use client";

import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={() => setIsOpen(!false)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Modal
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 left-3/5 top-1/4 bg-red-300 w-100 h-60 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
