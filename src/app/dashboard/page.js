"use client";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-center text-red-500 font-bold text-[26px]">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        {cards
          .filter((card) => card.active)
          .map((card) => (
            <div key={card.id} className="p-4 rounded-xl bg-green-300 border">
              <h2 className="text-lg font-bold">{card.title}</h2>
            </div>
          ))}
      </div>

      <div className="w-full flex justify-center">
        <button
          onClick={handleLogout}
          className="border w-20 rounded py-1 bg-red-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
