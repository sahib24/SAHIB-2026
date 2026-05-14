"use client";

import { useState } from "react";

export default function PostCRUD() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editId) {
      const updatedPosts = posts.map((post) =>
        post.id === editId ? { ...post, title } : post,
      );
      setPosts(updatedPosts);
      setEditId(null);
    } else {
      const newPost = {
        id: Date.now(),
        title,
      };
      setPosts([...posts, newPost]);
    }

    setTitle("");
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setEditId(post.id);
  };

  const handleDelete = (id) => {
    const filtered = posts.filter((post) => post.id !== id);
    setPosts(filtered);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Post CRUD Example</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter post title"
          className="border p-2 flex-1 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit" className=" text-black px-4 rounded">
          {editId ? "Update Post" : "Add Post"}
        </button>
      </form>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{post.title}</span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(post)}
                className=" px-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(post.id)}
                className=" text-black px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
