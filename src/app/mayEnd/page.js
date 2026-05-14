"use client";

import axios from "axios";

import { useState, useEffect } from "react";

export default function MayEnd() {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [editID, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
      );
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <div>jfwhfbvsbhb</div>;
}
