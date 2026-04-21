// const clubs = [
//   {
//     id: 1,
//     name: "Manchester United",
//     country: "England",
//     founded: 1878,
//   },
//   {
//     id: 2,
//     name: "Real Madrid",
//     country: "Spain",
//     founded: 1902,
//   },
// ];

// export default function Monday() {
//   return (
//     <div className="h-screen flex justify-center flex-col items-center gap-4">
//       <h2 className="">Data show</h2>
//       {clubs.map((club) => (
//         <div key="club.id" className="flex  flex-col"><h2>{club.name} </h2>
//         <p>{club.country} </p>
//         <p>{club.founded} </p>
//         </div>

//       ))}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";

// export default function ToggleDesign() {
//   const [isOn, setIsOn] = useState(false);

//   return (
//     <div className="h-screen flex flex-col justify-center items-center gap-6">
//       <div
//         onClick={() => setIsOn(!isOn)}
//         className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300
//         ${isOn ? "bg-green-500" : "bg-gray-400"}`}
//       >
//         <div
//           className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-all duration-300
//           ${isOn ? "translate-x-8" : "translate-x-0"}`}
//         ></div>
//       </div>

//       <p className="text-xl font-semibold">{isOn ? "ON " : "OFF "}</p>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";

// export default function Dropdown() {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState("Select");

//   const options = ["Profile", "Settings", "Logout"];

//   const handleSelect = (item) => {
//     setSelected(item);
//     setOpen(false);
//   };

//   return (
//     <div>
//       <button onClick={() => setOpen(!open)}>{selected}</button>
//       {open && (
//         <ul>
//           {options.map((item, index) => (
//             <li key={index} onClick={() => handleSelect(item)}>
//               {item}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";

// export default function Form() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("submit", formData);

//     setFormData({
//       name: "",
//       email: "",
//       message: "",
//     });
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-2 p-6 shadow-md"
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="border p-2 bg-white"
//           required
//         />

//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="border p-2 bg-white"
//           required
//         />

//         <textarea
//           name="message"
//           placeholder="Message"
//           value={formData.message}
//           onChange={handleChange}
//           className="border p-2 bg-white"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-green-500 text-white py-2 rounded w-25"
//         >
//           submit
//         </button>
//       </form>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";

// export default function Monday() {
//   const [click, setClick] = useState(false);

//   return (
//     <div className="h-screen flex justify-center flex-col items-center gap-4">
//       <div>
//         <button
//           className="border p-1 cursor-pointer"
//           onClick={() => setClick(!click)}
//         >
//           click
//         </button>

//         <div>
//           <p className={click ? "text-green-500" : "text-red-500"}>
//             {click ? "Menu Open" : "Menu Close"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";

// export default function Toggle() {
//   const [click, setClick] = useState(false);
//   const [show, setShow] = useState(false);

//   const handleClick = () => {
//     setClick(!click);
//     setShow(true);
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>click</button>

//       {show && (
//         <p className={click ? "text-green-300" : "text-red-300"}>
//           {click ? "1111" : "22222"}
//         </p>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function Toggle() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={
        dark
          ? "h-screen w-full flex justify-center items-center  flex-col bg-black text-white"
          : "h-screen w-full flex justify-center items-center  flex-col bg-white text-black"
      }
    >
      <button className="border px-4 py-2" onClick={() => setDark(!dark)}>
        Change Theme
      </button>
    </div>
  );
}
