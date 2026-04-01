"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserForm() {
  const initialForm = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  // handle change (deep nested)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // GEO
    if (name === "lat" || name === "lng") {
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          geo: {
            ...prev.address.geo,
            [name]: value,
          },
        },
      }));
    }

    // ADDRESS
    else if (["street", "suite", "city", "zipcode"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    }

    // COMPANY
    else if (["companyName", "catchPhrase", "bs"].includes(name)) {
      const key = name === "companyName" ? "name" : name;

      setForm((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          [key]: value,
        },
      }));
    }

    // NORMAL
    else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        form,
      );

      console.log(res.data);
      toast.success("User created successfully");

      setForm(initialForm);
    } catch (err) {
      console.log(err);
      toast.error("Error submitting data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-175 mx-auto mt-10 p-6 bg-gray-200 rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Full User Form</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border border-gray-600 rounded"
          />
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border border-gray-600 rounded"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-600 rounded"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border border-gray-600 rounded"
          />
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website"
            className="w-full p-2 border border-gray-600 rounded"
          />

          {/* Address */}
          <input
            name="street"
            value={form.address.street}
            onChange={handleChange}
            placeholder="Street"
            className="w-full p-2 border border-gray-600 rounded"
          />
          <input
            name="suite"
            value={form.address.suite}
            onChange={handleChange}
            placeholder="Suite"
            className="w-full p-2 border border-gray-600 rounded"
          />
          <input
            name="city"
            value={form.address.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full p-2 border border-gray-600 rounded"
          />
          <input
            name="zipcode"
            value={form.address.zipcode}
            onChange={handleChange}
            placeholder="Zipcode"
            className="w-full p-2 border border-gray-600 rounded"
          />

          {/* GEO */}
          <input
            name="lat"
            value={form.address.geo.lat}
            onChange={handleChange}
            placeholder="Latitude"
            className="w-full p-2 border border-gray-600 rounded"
          />
          <input
            name="lng"
            value={form.address.geo.lng}
            onChange={handleChange}
            placeholder="Longitude"
            className="w-full p-2 border border-gray-600 rounded"
          />

          {/* Company */}
          <input
            name="companyName"
            value={form.company.name}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-2 border border-gray-600 rounded"
          />
          <input
            name="catchPhrase"
            value={form.company.catchPhrase}
            onChange={handleChange}
            placeholder="Catch Phrase"
            className="w-full p-2 border border-gray-600 rounded"
          />
          <input
            name="bs"
            value={form.company.bs}
            onChange={handleChange}
            placeholder="Business"
            className="w-full p-2 border border-gray-600 rounded"
          />
        </div>

        <button disabled={loading} className="px-6 py-3 bg-black text-white ROUNDED">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
