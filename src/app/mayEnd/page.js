"use client";

import axios from "axios";

import { useState, useEffect } from "react";

export default function MayEnd() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [editID, setEditId] = useState(null);
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
          body: "post body",
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
        `https://jsonplaceholder.typicode.com/posts/${editID}`,
        {
          title: editTitle,
          body: "update body",
        },
      );
      setPosts(
        posts.map((post) =>
          post.id === editID ? { ...post, title: res.data.title } : post,
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
      const res = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );

      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const openEdit = (post) => {
    setEditId(post.id);
    setEditTitle(post.title);
  };

  const openCancle = () => {
    setEditId(null);
    setEditTitle("");
  };

  return (
    <div className="p-5 ">
      <form onSubmit={handleCreate} className="flex gap-1 mb-4">
        <input
          type="text"
          placeholder="Text data"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-1"
        />
        <button className="p-1 border">Create</button>
      </form>

      <div>
        {posts.map((post) => (
          <div key={post.id} className="mb-4 border p-3 rounded">
            {post.id === editID ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-1"
              />
            ) : (
              <p> {post.title}</p>
            )}

            <div className="flex gap-2 mt-3">
              {post.id === editID ? (
                <div>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className=" text-black px-3 py-1 rounded"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={openCancle}
                    className=" text-black px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
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
