"use client";
import { useEffect, useState } from "react";
import axios from "@/plugins/axios";

export default function PostCRUD() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts");
        const data = res.data.slice(0, 10).map((p) => ({
          ...p,
          type: "api",
        }));
        setPosts(data);
        console.log(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-400 p-6">
      {loading && <p className="text-center text-white text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-2xl hover:shadow-xl transition duration-300"
            >
              <p className="text-xl text-black font-bold mb-2">
                User ID: {post.userId}
              </p>

              <h2 className="text-lg font-semibold text-gray-600 mb-2 leading-tight">
                {post.title}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
