"use client";
import { useState } from "react";
import axios from "@/plugins/axios";

export default function PostCRUDInlineUpdate() {
  const [formData, setFormData] = useState({ userId: "", title: "", body: "" });
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);

  // handle create form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // CREATE post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/posts", formData);
      const newPost = { ...res.data, id: Date.now(), editing: false };
      setPosts((prev) => [newPost, ...prev]);
      setFormData({ userId: "", title: "", body: "" });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE post
  const handleDelete = async (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    await axios.delete(`/posts/${id}`).catch((err) => console.log(err));
  };

  // toggle edit mode inline
  const toggleEdit = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, editing: !post.editing } : post,
      ),
    );
  };

  // inline input change
  const handleInlineChange = (id, e) => {
    const { name, value } = e.target;
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, [name]: value } : post)),
    );
  };

  // inline update submit
  const handleInlineUpdate = async (post) => {
    await axios
      .put(`/posts/${post.id}`, {
        userId: post.userId,
        title: post.title,
        body: post.body,
        id: post.id,
      })
      .catch((err) => console.log(err));

    // turn off editing mode
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, editing: false } : p)),
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Posts Form</h1>

      {/* CREATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mb-6"
      >
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Create Post"}
        </button>
      </form>

      {/* POSTS LIST */}
      <div className="max-w-md mx-auto grid gap-4">
        {posts.length === 0 && (
          <p className="text-center text-gray-500">No posts yet</p>
        )}

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            {post.editing ? (
              <div className="space-y-2">
                <input
                  type="number"
                  name="userId"
                  value={post.userId}
                  onChange={(e) => handleInlineChange(post.id, e)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={(e) => handleInlineChange(post.id, e)}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="body"
                  value={post.body}
                  onChange={(e) => handleInlineChange(post.id, e)}
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleInlineUpdate(post)}
                    className="bg-green-500 text-white px-3 py-1 rounded-[5px]  transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => toggleEdit(post.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded  transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-1">
                  User ID: {post.userId}
                </p>
                <h2 className="font-semibold mb-2">{post.title}</h2>
                <p className=" font-semibold text-sm  mb-3 line-clamp-3">
                  {post.body}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => toggleEdit(post.id)}
                    className="text-white border px-3 py-1 rounded-[5px] bg-green-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-white border bg-red-500 px-3 py-1 rounded-[5px] hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
