"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
        );

        setData(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred</p>;

  return (
    <div>
      {data.slice(0, 8).map((post) => (
        <div key={post.id}>
          <h1>Title: {post.title}</h1>
          <p>Body: {post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
