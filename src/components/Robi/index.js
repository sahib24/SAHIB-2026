// "use client";
// import { useState } from "react";

// export default function Robi() {
//   const [text, setText] = useState("Manchester is");

//   function update() {
//     setText("Red");
//     console.log(text);

//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="flex flex-col gap-4">
//         <div className="text-center">{text}</div>

//         <button
//           onClick={update}
//           className=" px-6 py-3 bg-red-600 text-white"
//         >
//           Click
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function page() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     async function loadData() {
//       const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//       setPosts(res.data);
//     }
//     loadData();
//   }, []);

//   return (
//     <div>
//       {posts.slice(0, 5).map((post) => (
//         <p key={post.id}>{post.id} <br/> {post.title}<br/> {post.body}</p>
//       ))}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import axios from "axios";

export default function CreateData() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: title,
          body: body,
          userId: 1,
        },
      );

      const newPost = {
        ...res.data,
        id: Date.now(),
      };

      setPosts((prev) => [newPost, ...prev]);

      setTitle("");
      setBody("");
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleCreate} className="flex flex-col gap-2 max-w-md">
        <input
          type="text"
        
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />

        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 w-25 text-white p-2 rounded-md cursor-pointer"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      <div className="mt-4">
        {posts.map((post) => (
          <div key={post.id} className=" p-2 my-2 bg-gray-100 w-75">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
