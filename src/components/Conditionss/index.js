// "use client";

// import { useState } from "react";

// export default function click() {
//   const [show, setShow] = useState(false);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="flex flex-col gap-2">
//         {" "}
//         <div
//           className="cursor-pointer p-1 border w-10"
//           onClick={() => setShow(!show)}
//         >
//           click
//         </div>
//         {show && (
//           <div className="">
//             <p>hi</p>
//             <p>hu</p>
//             <p>ho</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
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
      {data.slice(0, 5).map((post) => (
        <div key={post.id}>
          <h1>Title: {post.title}</h1>
          <p>Body: {post.body}</p>
        </div>
      ))}
    </div>
  );
}
