"use client";
import axios from "@/plugins/axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/posts`)
      .then((data) => {
        setPosts(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <h1 className="text-3xl font-bold text-green-400 text-center mb-8 mt-10">
        All API DATA
      </h1>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-5 rounded-2xl  hover:shadow-xl transition duration-300"
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
    </div>
  );
}
