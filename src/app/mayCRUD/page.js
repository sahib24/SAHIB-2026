"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export default function CRUD() {
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
    } catch (err) {
      console.log(err);
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
          body: "create body",
          userId: 1,
        },
      );
      setPosts([res.data, ...posts]);
      setTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) return;
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${editId}`,
        {
          title: editTitle,
          body: "update body",
        },
      );
      setPosts(
        posts.map((post) =>
          post.id === editId ? { ...post, title: res.data.title } : post,
        ),
      );

      setEditId(null);
      setEditTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const openEdit = (post) => {
    setEditId(post.id);
    setEditTitle(post.title);
  };

  const closeEdit = () => {
    setEditId(null);
    setEditTitle("");
  };

  return (
    <div className="p-5">
      <form onSubmit={handleCreate} className="">
        <input
          type="text"
          placeholder="Text data"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-1"
        />

        <button className="border p-1">create</button>
      </form>

      <div className="">
        {posts.map((post) => (
          <div key={post.id} className="border mt-4">
            {post.id === editId ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-1"
              />
            ) : (
              <p>{post.title}</p>
            )}

            <div className="flex ">
              {post.id === editId ? (
                <div>
                  <button
                    type="button"
                    className=" text-black px-3 py-1 rounded"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className=" text-black px-3 py-1 rounded"
                    onClick={closeEdit}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className=" text-black px-3 py-1 rounded"
                  onClick={() => openEdit(post)}
                >
                  Edit
                </button>
              )}

              <button
                type="button"
                className=" text-black px-3 py-1 rounded"
                onClick={() => handleDelete(post.id)}
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
