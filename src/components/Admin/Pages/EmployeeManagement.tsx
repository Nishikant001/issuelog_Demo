import React, { useState } from "react";
import { MdFlipCameraIos } from "react-icons/md";
import Navbar from "../Component/Navbar";
import Dashboard from "../Component/Dashboard";

export default function EmployeeManagement() {
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const toggleDashboard = () => {
    setIsDashboardVisible((prevState) => !prevState);
  };

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
      email: "john@example.com",
      phone: "123-456-7890",
      modules: ["ABAP"],
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    position: "",
    email: "",
    phone: "",
    modules: [],
    newModule: "",
    image: null,
    preview: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file, preview: URL.createObjectURL(file) });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      ...form,
      id: editingId || Date.now(),
      modules: form.modules,
    };
    if (form.image instanceof File) {
      newEmployee.image = URL.createObjectURL(form.image);
    }

    if (editingId) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingId ? newEmployee : emp))
      );
      setEditingId(null);
    } else {
      setEmployees([...employees, newEmployee]);
    }

    setForm({
      id: "",
      name: "",
      position: "",
      email: "",
      phone: "",
      modules: [],
      newModule: "",
      image: null,
      preview: "",
    });
  };

  const handleEdit = (id) => {
    const emp = employees.find((emp) => emp.id === id);
    setForm({
      ...emp,
      preview: emp.image,
      newModule: "",
    });
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const addModule = () => {
    if (form.newModule.trim()) {
      setForm({
        ...form,
        modules: [...form.modules, form.newModule.trim()],
        newModule: "",
      });
    }
  };

  const updateModule = (index, value) => {
    const updatedModules = [...form.modules];
    updatedModules[index] = value;
    setForm({ ...form, modules: updatedModules });
  };

  const deleteModule = (index) => {
    const updatedModules = form.modules.filter((_, i) => i !== index);
    setForm({ ...form, modules: updatedModules });
  };

  return (
    <>
      <Dashboard isVisible={isDashboardVisible} />
      <Navbar onToggleDashboard={toggleDashboard} />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {editingId ? "Edit Employee" : "Add New Employee"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-50 h-50 mt-20 bg-gray-100 rounded-full relative overflow-hidden shadow border-2 border-amber-50">
                {form.preview ? (
                  <img
                    src={form.preview}
                    alt="Preview"
                    className="w-full h-full object-cover shadow-2xl "
                  />
                ) : (
                  <span className="text-gray-400 flex items-center justify-center h-full">
                    No Image
                  </span>
                )}
                <label
                  htmlFor="image-upload"
                  title="Change Photo"
                  className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-200"
                >
                  <MdFlipCameraIos className="text-gray-600 h-7 w-7 mr-7" />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md shadow-2xl"
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={form.position}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md shadow-2xl"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md shadow-2xl"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md shadow-2xl"
              />
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Modules
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full"
                    >
                      <input
                        type="text"
                        value={mod}
                        onChange={(e) => updateModule(idx, e.target.value)}
                        className="bg-transparent outline-none w-20 shadow-2xl"
                      />
                      <button
                        type="button"
                        onClick={() => deleteModule(idx)}
                        className="text-red-500 font-bold shadow-2xl"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <select
                    value={form.newModule}
                    onChange={(e) =>
                      setForm({ ...form, newModule: e.target.value })
                    }
                    className="border p-2 rounded-md w-full shadow-2xl"
                  >
                    <option value="Abap">Abap</option>
                    <option value="Sap">Sap</option>
                    <option value="Webdevelopment">Webdevelopment</option>
                    <option value="Abap">Abap</option>
                  </select>
                  <button
                    type="button"
                    onClick={addModule}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className=" shadow-2xl w-full bg-blue-400 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
              >
                {editingId ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </form>
        </div>

        {/* Employee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {employees.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No employees yet.
            </p>
          ) : (
            employees.map((emp) => (
              <div
                key={emp.id}
                className="bg-gray-200 p-4 rounded-xl shadow hover:shadow-2xl transition-transform hover:-translate-y-1 text-center"
              >
                <img
                  src={emp.image}
                  alt={emp.name}
                  className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">{emp.name}</h3>
                <p className="text-sm text-gray-500">{emp.position}</p>
                <p className="text-sm text-gray-600">📧 {emp.email}</p>
                <p className="text-sm text-gray-600">📞 {emp.phone}</p>
                <div className="flex flex-wrap justify-center mt-3 gap-1">
                  {emp.modules.map((mod, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(emp.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
