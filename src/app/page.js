"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // GET
  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
      );

      setPosts(res.data);
    } catch (error) {
      console.log("GET error:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body: "New post body",
          userId: 1,
        },
      );

      setPosts([res.data, ...posts]);
      setTitle("");
    } catch (error) {
      console.log("CREATE error:", error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.log("DELETE error:", error);
    }
  };

  // OPEN EDIT
  const openEdit = (post) => {
    setEditId(post.id);
    setEditTitle(post.title);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editTitle.trim()) return;

    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${editId}`,
        {
          title: editTitle,
          body: "Updated body",
        },
      );

      setPosts(
        posts.map((post) =>
          post.id === editId ? { ...post, title: res.data.title } : post,
        ),
      );

      setEditId(null);
      setEditTitle("");
    } catch (error) {
      console.log("UPDATE error:", error);
    }
  };

  // CANCEL EDIT
  const handleCancel = () => {
    setEditId(null);
    setEditTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">CRUD</h1>

      {/* CREATE */}
      <form onSubmit={handleCreate} className="flex gap-2 justify-center mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-1/3"
          placeholder="Enter title"
        />
        <button className="bg-blue-500 text-white px-4 rounded">Add</button>
      </form>

      {/* LIST */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
      
            {editId === post.id ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-2 w-full rounded"
              />
            ) : (
              <h2 className="font-bold">{post.title}</h2>
            )}

            {/* BUTTONS */}
            <div className="flex gap-2 mt-3">
              {editId === post.id ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => openEdit(post)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
