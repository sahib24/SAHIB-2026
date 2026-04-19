"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Demo() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ role: "admin" });
  const [data, setData] = useState([{ id: 1, name: "Sahib" }]);
  const [show, setShow] = useState(false);

  const pathname = usePathname();

  // Loading
  if (loading) return <p>Loading...</p>;

  // Auth check
  if (!user) return <p>Please login</p>;

  return (
    <>
      {/* Route based */}
      {pathname === "/" && <h1>Home</h1>}

      {/* Toggle */}
      <button onClick={() => setShow(!show)}>Menu</button>
      {show && <p>Menu Open</p>}

      {/* Role based */}
      {user.role === "admin" && <button>Delete</button>}

      {/* Data check */}
      {data?.length > 0 ? (
        data.map((item) => <p key={item.id}>{item.name}</p>)
      ) : (
        <p>No Data</p>
      )}
    </>
  );
}
