// "use client";

// import { useState } from "react";

// export default function Page() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="h-screen flex justify-center items-center gap-1 flex-col">
//       <div className="">
//         {" "}
//         <button
//           className="border p-1 cursor-pointer  "
//           onClick={() => setOpen(!open)}
//         >
//           click
//         </button>
//         <div> {open && <p>Menu Open</p>}</div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";

// export default function StatusBox() {
//   const [isActive, setIsActive] = useState(false);

//   return (
//     <div className="p-5 h-screen flex flex-col justify-center items-center">
//       <button
//         onClick={() => setIsActive(!isActive)}
//         className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         click
//       </button>

//       <div
//         className={`text-white p-5 rounded ${
//           isActive ? "bg-green-500 w-25 text-center" : "bg-red-500 w-25 text-center"
//         }`}
//       >
//         {isActive ? "Active" : "Inactive"}
//       </div>
//     </div>
//   );
// }

// "use client";

// export default function UserList() {
//   const users = [
//     { id: 1, name: "Rahim", isActive: true },
//     { id: 2, name: "Karim", isActive: false },
//     { id: 3, name: "Sakib", isActive: true },
//     { id: 4, name: "Jamal", isActive: false },
//     { id: 5, name: "Alvi", isActive: true },
//     { id: 6, name: "Hasib", isActive: false },
//     { id: 7, name: "Ibrahim", isActive: true },
//     { id: 8, name: "sam", isActive: false },
//   ];

//   return (
//     <div className="p-5 h-screen flex flex-col justify-center items-center">
//       <h1>Active</h1>
//       {users
//         .filter((user) => user.isActive)
//         .map((item) => (
//           <p key={item.id}>{item.name}</p>
//         ))}
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";

// export default function SearchExample() {
//   const [search, setSearch] = useState("");

//   const items = ["Apple", "Banana", "Orange", "Mango", "Pineapple"];

//   const filteredItems = items.filter((item) =>
//     item.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="p-5">
//       <input
//         type="text"
//         placeholder="Search fruit..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="border p-2"
//       />

//       <ul>
//         {filteredItems.length > 0 ? (
//           filteredItems.map((item, index) => <li key={index}>{item}</li>)
//         ) : (
//           <p>No result found</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (email === "admin@gmail.com" && password === "1234") {
//       localStorage.setItem("token", "my-login-token");
//       router.push("/dashboard");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleLogin}
//       className="h-screen flex justify-center items-center "
//       autoComplete="off"
//     >
//       <div className="flex flex-col w-50 gap-2  border p-4 rounded-md ">
//         {" "}
//         <input
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           className="p-1 border rounded"
//           autoComplete="new-email"
//         />
//         <input
//           placeholder="Password"
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="p-1 border rounded"
//           autoComplete="new-password"
//         />
//         <button
//           type="submit"
//           className="border w-13 p-1 cursor-pointer rounded text-[12px] bg-gray-200"
//         >
//           Login
//         </button>
//       </div>
//     </form>
//   );
// }
