"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const cards = [
  { id: 1, title: "Card 1", active: true },
  { id: 2, title: "Card 2", active: true },
  { id: 3, title: "Card 3", active: true },
  { id: 4, title: "Card 4", active: false },
  { id: 5, title: "Card 5", active: true },
  { id: 6, title: "Card 6", active: true },
  { id: 7, title: "Card 7", active: false },
  { id: 8, title: "Card 8", active: true },
];

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-center text-red-500 font-bold text-[26px]">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        {cards
          .filter((card) => card.active)
          .map((card) => (
            <div key={card.id} className="p-4 rounded-xl  bg-green-300 border">
              <h2 className="text-lg font-bold">{card.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
