"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CRUD() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
        );
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
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newPost,
      );

      setPosts((prev) => [res.data, ...prev]); 
      setTitle("");
      setBody("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">CRUD</h1>

    
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

      {loading && <p>Loading...</p>}

    
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
