"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeCrud() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "https://jsonplaceholder.typicode.com/users";

  // READ
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API);

      const modifiedData = res.data.map((item) => ({
        id: item.id,
        name: item.name,
        position: "Frontend Developer",
      }));

      setEmployees(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // CREATE
  const handleAdd = async () => {

    try {
      const res = await axios.post(API, {
        name,
        position,
      });

      const newEmployee = {
        id: Date.now(),
        ...res.data,
      };

      setEmployees([newEmployee, ...employees]);
      setName("");
      setPosition("");
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      const filtered = employees.filter((employee) => employee.id !== id);

      setEmployees(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const handleEdit = (employee) => {
    setName(employee.name);
    setPosition(employee.position);
    setEditId(employee.id);
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put(`${API}/${editId}`, {
        name,
        position,
      });

      const updatedData = employees.map((employee) =>
        employee.id === editId ? { ...employee, name, position } : employee,
      );

      setEmployees(updatedData);

      setName("");
      setPosition("");
      setEditId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Employee CRUD App</h1>

      {/* Form */}
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="border p-2 w-full rounded"
        />

        {editId ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 rounded"
          >
            Add
          </button>
        )}
      </div>

      {/* Employee List */}
      <div className="space-y-3">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{employee.name}</h2>
              <p>{employee.position}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(employee)}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(employee.id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
