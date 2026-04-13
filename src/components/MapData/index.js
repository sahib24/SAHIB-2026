"use client";

const users = [
  {
    id: 1,
    title: "zzzzzzzzzzz",
    subTitle: "zxzxzxzxzxzx",
    description: "ancallcvk cAKLMFCamnmspv caSMNMASPVm",
  },
  {
    id: 2,
    title: "zzzzzzzzzzz",
    subTitle: "zxzxzxzxzxzx",
    description: "ancallcvk cAKLMFCamnmspv caSMNMASPVm",
  },
  {
    id: 3,
    title: "zzzzzzzzzzz",
    subTitle: "zxzxzxzxzxzx",
    description: "ancallcvk cAKLMFCamnmspv caSMNMASPVm",
  },
];

export default function Maping() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
      {users.map((user) => (
        
        <div key={user.id} className="p-4 border rounded-lg w-80 ">
          <h1 className="font-bold text-lg">{user.title}</h1>
          <h2 className="text-sm text-gray-500">{user.subTitle}</h2>
          <p>{user.description}</p>
        </div>
      ))}
    </div>
  );
}
