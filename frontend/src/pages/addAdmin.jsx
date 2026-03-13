import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import LoadingOverlay from "../components/loadingOverlay.jsx";

const AddAdmin = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
    password: "",
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.users || []);
      console.log(data.users)
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setSelectedUser(null);
    setFormData({ name: "", email: "", password: "", role: "admin" });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedUser) {
        // Update user
        const { data } = await axios.post(
          `${backendUrl}/api/admin/update/${selectedUser._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.success)
           toast.success("User updated successfully!");
        
      } else {
        // Add user
        const { data } = await axios.post(
          `${backendUrl}/api/admin/create`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.success) 
          toast.success("User added successfully!");
      }
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-blue-800 text-center mb-6">
        MANAGE USERS / ADMINS
      </h1>

      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 w-full sm:w-1/3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={openAddModal}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white font-semibold grid grid-cols-4 sm:grid-cols-5 p-3 border-b border-blue-200">
          <span>#</span>
          <span>Name</span>
          <span>Email</span>
          <span className="hidden sm:block">Role</span>
          <span className="text-right pr-3">Actions</span>
        </div>

        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, i) => (
            <div
              key={user._id}
              className="grid grid-cols-4 sm:grid-cols-5 items-center text-gray-700 border-b px-3 py-2 hover:bg-blue-50 transition"
            >
              <span>{i + 1}</span>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span className="hidden sm:block capitalize">{user.role}</span>
              <div className="flex justify-end">
                <button 
                  onClick={() => openEditModal(user)}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-1 rounded-full mr-2"
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">No users found.</p>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-red-600 text-2xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold text-blue-800 text-center mb-4">
              {selectedUser ? "Update User" : "Add New User"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="admin">Admin</option>
                  <option value="hod">HOD</option>
                  <option value="employee">Employee</option>
                </select>
              </div>

              {!selectedUser && (
                <div>
                  <label className="block text-blue-700 font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  {selectedUser ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default AddAdmin;
