"use client";

import { useState } from "react";
import axios from "axios";

export default function Api() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.put(
        "https://jsonplaceholder.typicode.com/users/1",
        formData,
      );

      console.log("Updated Data:", res.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border"
        />

        <button type="submit">{loading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
}
