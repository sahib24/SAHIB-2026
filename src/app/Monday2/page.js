"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`bg-gray-900 text-white w-64 p-5 space-y-6 fixed md:relative z-50 h-full transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h1 className="text-2xl text-center font-bold text-indigo-400">
          DevPanel
        </h1>

        <nav className="space-y-4 ">
          <div className="">
            {" "}
            <Link href="" className="block  hover:bg-gray-800 p-2 rounded">
              Dashboard
            </Link>
            <Link href="" className="block hover:bg-gray-800 p-2 rounded">
              Analytics
            </Link>
            <Link href="" className="block hover:bg-gray-800 p-2 rounded">
              Projects
            </Link>
            <Link href="" className="block hover:bg-gray-800 p-2 rounded">
              Settings
            </Link>
          </div>
        </nav>

        <button className="bg-red-500 w-full py-2 rounded mt-10">Logout</button>
      </div>

      <div className="flex-1 md:ml-64">
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
            ☰
          </button>

          <input
            type="text"
            placeholder="Search anything..."
            className="border px-4 py-2 rounded-lg w-1/2 hidden md:block"
          />

          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/40" className="rounded-full" />
            <span className="font-semibold">Sahib</span>
          </div>
        </header>

        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
              <h2 className="text-gray-500">Users</h2>
              <p className="text-2xl font-bold">12,450</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
              <h2 className="text-gray-500">Revenue</h2>
              <p className="text-2xl font-bold">$34,890</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
              <h2 className="text-gray-500">Orders</h2>
              <p className="text-2xl font-bold">1,240</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
              <h2 className="text-gray-500">Growth</h2>
              <p className="text-2xl font-bold">+24%</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow h-80">
              <h2 className="font-bold mb-4">Analytics Overview</h2>
              <div className="h-full flex items-center justify-center text-gray-400">
                📊 Chart Area (Recharts / Chart.js use করতে পারো)
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow h-80">
              <h2 className="font-bold mb-4">Recent Activity</h2>

              <ul className="space-y-3 text-sm">
                <li>✔ User John signed up</li>
                <li>✔ Order #123 completed</li>
                <li>✔ New payment received</li>
                <li>✔ Server deployed</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold mb-4">Latest Orders</h2>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">ID</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td>#101</td>
                  <td>Ali</td>
                  <td className="text-green-500">Paid</td>
                  <td>$120</td>
                </tr>

                <tr className="border-b">
                  <td>#102</td>
                  <td>Sara</td>
                  <td className="text-yellow-500">Pending</td>
                  <td>$90</td>
                </tr>

                <tr>
                  <td>#103</td>
                  <td>Rahim</td>
                  <td className="text-red-500">Failed</td>
                  <td>$200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
