import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import LoadingOverlay from "../components/loadingOverlay.jsx";

const Internship = () => {
  const { backendUrl } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    institution: "",
    course: "",
    department: "",
    level: "",
    startDate: "",
    endDate: "",
    reason: "",
    file: null,
  });

  const departments = [
    "Bioinformatics",
    "Molecular Biology",
    "Microbiology",
    "Genomics and Proteomics",
    "Clinical Laboratory",
    "ICT and Data Science",
    "Administration",
    "Accounts and Finance",
    "Procurement",
    "Research and Development",
    "Quality Control",
  ];

  // Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

   try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("gender", formData.gender);
      form.append("institution", formData.institution);
      form.append("course", formData.course);
      form.append("department", formData.department);
      form.append("level", formData.level);
      form.append("startDate", formData.startDate);
      form.append("endDate", formData.endDate);
      form.append("reason", formData.reason);
      if (formData.file) form.append("file", formData.file);

      const { data } = await axios.post(`${backendUrl}/api/admin/apply`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("🎉 Internship application submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
          institution: "",
          course: "",
          department: "",
          level: "",
          startDate: "",
          endDate: "",
          reason: "",
          file: null,
        });
      } else {
        toast.error(data.message || "Submission failed, please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          KIRCT Internship Application Form  <span className="text-red-600">.</span>
        </h1>
       <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>

        <p className="text-gray-600 text-center mb-8">
          Please fill out the form below carefully. All fields marked{" "}
          <span className="text-red-500">*</span> are required.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +234 812 345 6789"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="institution"
                required
                value={formData.institution}
                onChange={handleChange}
                placeholder="Enter institution name"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course of Study <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                placeholder="Enter course of study"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                required
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level / Qualification <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="level"
                required
                value={formData.level}
                onChange={handleChange}
                placeholder="e.g. ND II, HND I, B.Sc Final Year"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload CV / Letter (optional)
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-white"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                required
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Applying / Cover Letter <span className="text-red-500">*</span>
            </label>
            <textarea
              name="reason"
              required
              value={formData.reason}
              onChange={handleChange}
              placeholder="Briefly explain why you want to intern at KIRCT..."
              rows="4"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default Internship;
