"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function CRUDMonday() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
      );
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body: "new post body",
          userId: 1,
        },
      );

      setPosts([res.data, ...posts]);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
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

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditTitle("");
  };

  const openEdit = (post) => {
    setEditId(post.id);
    setEditTitle(post.title);
  };

  return (
    <div className="p-5 ">
      <form onSubmit={handleCreate} className="flex gap-1 mb-4">
        <input
          type="text"
          placeholder="Text Data"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-1"
        />

        <button className="p-1 border">Create</button>
      </form>

      <div>
        {posts.map((post) => (
          <div key={post.id} className="mb-4 border p-3 rounded">
            {editId === post.id ? (
              <input
                type="text"
                placeholder="Text Data"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-1"
              />
            ) : (
              <p>{post.title}</p>
            )}

            <div className="flex gap-2 mt-3">
              {editId === post.id ? (
                <>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className=" text-black px-3 py-1 rounded"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className=" text-black px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => openEdit(post)}
                  className="text-black px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}

              <button
                type="button"
                onClick={() => handleDelete(post.id)}
                className=" text-black px-3 py-1 rounded"
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
