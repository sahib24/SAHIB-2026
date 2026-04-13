"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateData() {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setEditId(post.id);
    setTitle(post.title);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${editId}`,
        {
          title: title,
        },
      );

      setPosts((prev) =>
        prev.map((post) =>
          post.id === editId ? { ...post, title: res.data.title } : post,
        ),
      );

      setEditId(null);
      setTitle("");
    } catch (err) {
      console.log("Update Error:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    setDeletingId(id);

    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.log("Delete Error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4">
      {editId && (
        <form onSubmit={handleUpdate} className="my-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-3 py-2 ml-1 rounded-r-[7px] cursor-pointer"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      )}

      {posts.map((post) => (
        <div key={post.id} className="p-2 my-2 border">
          <h3>{post.title}</h3>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleEdit(post)}
              className="bg-green-500 text-white px-2 py-1 cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(post.id)}
              disabled={deletingId === post.id}
              className="bg-red-500 text-white px-2 py-1 cursor-pointer"
            >
              {deletingId === post.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
