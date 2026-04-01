"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ContactForm() {
  const initialForm = {
    postId: 1,
    name: "",
    email: "",
    body: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        form,
      );

      console.log("Response:", res.data);

      toast.success("Data submitted successfully ");

      // reset form
      setForm(initialForm);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg bg-gray-300 ">
      <h2 className="text-2xl font-bold mb-4 text-center"> Post API Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
     
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full border px-4 py-2 rounded bg-white"
        />

        
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full border px-4 py-2 rounded bg-white"
        />

       
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Your Message"
          required
          className="w-full border px-4 py-2 rounded bg-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded cursor-pointer transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
