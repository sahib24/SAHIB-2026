"use client";
import { useEffect, useState } from "react";
import axios from "@/plugins/axios";

export default function CRUD() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/posts");
        setPosts(res.data.slice(5, 10));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreate = async () => {
    if (!title || !body) return;
    const newPost = {
      title,
      body,
      userId: 1,
    };
    try {
      const res = await axios.post("/posts", newPost);
      setPosts((prev) => [res.data, ...prev]);
      setTitle("");
      setBody("");
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  const handleUpdate = async (id) => {
    const updatedData = {
      title: editTitle,
      body: editBody,
    };
    try {
      await axios.patch(`/posts/${id}`, updatedData);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)),
      );
      setEditingId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);

      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4"> CRUD</h1>

      <div className="mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 mr-2"
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-5 py-2"
        >
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-3 mb-2">
            {editingId === post.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-1 mb-1"
                />
                <input
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="border p-1 mb-1"
                />

                <button
                  onClick={() => handleUpdate(post.id)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="font-semibold">{post.title}</h2>
                <p>{post.body}</p>

                <button
                  onClick={() => startEdit(post)}
                  className="bg-green-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
              </>
            )}

            <button
              onClick={() => handleDelete(post.id)}
              className="bg-red-500 text-white px-2 py-1"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
