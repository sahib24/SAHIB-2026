"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchPosts = async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
    );
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async () => {
    if (!title) return;

    const res = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      title,
      body: "Demo body",
    });

    setPosts([res.data, ...posts]);
    setTitle("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

    // UI update
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleUpdate = async () => {
    if (!editTitle) return;

    await axios.put(`https://jsonplaceholder.typicode.com/posts/${editId}`, {
      title: editTitle,
    });

    const updated = posts.map((post) =>
      post.id === editId ? { ...post, title: editTitle } : post,
    );

    setPosts(updated);
    setEditId(null);
    setEditTitle("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD App</h1>

      {/* CREATE */}
      <input
        type="text"
        placeholder="New title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>

      <hr />

      {/* LIST */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          {editId === post.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button onClick={handleUpdate}>Save</button>
            </>
          ) : (
            <>
              <h3>{post.title}</h3>
              <button
                onClick={() => {
                  setEditId(post.id);
                  setEditTitle(post.title);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
