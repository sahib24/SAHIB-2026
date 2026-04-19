"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "sahib@gmail.com" && password === "1234") {
      localStorage.setItem("myKey", "true");
      router.push("/dashboard");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 shadow p-3">
        {" "}
        <h1 className="text-red-500 text-center">Login</h1>
        <form onSubmit={handleLogin} autoComplete="off">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border mb-2 p-1"
            autoComplete="new-email"
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-1"
            autoComplete="new-password"
          />
          <br />

          <button
            type="submit"
            className="border p-1 mt-4 bg-green-400 rounded-sm text-white cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
