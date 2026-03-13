import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingOverlay from "../components/loadingOverlay.jsx";
import { AppContext } from "../context/AppContext";


const Job = () => {
  const { backendUrl } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    cv: null,
    coverLetter: "",
  });

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get-job-vacancies`);
      if (data.success) {
        setJobs(data.vacancies);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      toast.error("Failed to load job vacancies");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "",
      cv: null,
      coverLetter: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // start loading

    try {
      // Create FormData
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("gender", formData.gender);
      form.append("address", formData.address || "");
      form.append("qualification", formData.qualification);
      form.append("experience", formData.experience || 0);
      form.append("position", selectedJob.title);
      form.append("coverLetter", formData.coverLetter);
      if (formData.cv) form.append("cv", formData.cv);

      // Send to backend
      const { data } = await axios.post(
        `${backendUrl}/api/admin/applyJob`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.application) {
        toast.success("🎉 Job application submitted successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
          address: "",
          qualification: "",
          experience: "",
          cv: null,
          coverLetter: "",
        });
        closeModal();
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          AVAILABLE <span className="text-blue-700">JOB VACANCY</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        </div>

      <div className="space-y-8">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              {job.title}
            </h2>

            {job.description && (
              <p className="text-gray-600 mb-4">{job.description}</p>
            )}

            {job.sections.map((section, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold text-gray-800">
                  {section.heading}
                </h3>
                <ul className="list-disc list-inside text-gray-600 pl-4 mt-1 space-y-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="whitespace-pre-line">{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-6">
              <button
                onClick={() => handleApplyClick(job)}
                className={`px-5 py-2 rounded-lg transition ${job.status === "on going"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-100 cursor-not-allowed"
                  }`}
              >
                Click Here to Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative overflow-y-auto max-h-[90vh] animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            {/* Conditional Content */}
            {selectedJob?.status === "on going" ? (
              <>
                <h2 className="text-2xl font-bold text-blue-700 mb-2">
                  Apply for {selectedJob.title}
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                  Please complete the form carefully. Fields marked{" "}
                  <span className="text-red-500">*</span> are required.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Grid for personal info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Enter your full name"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Enter your email"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="e.g. +234 812 345 6789"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleFormChange}
                        className="w-full border rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Position & Address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position Applied <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={selectedJob.title || ""}
                        readOnly
                        className="w-full border rounded-lg p-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                        placeholder="Residential address"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Education and Experience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Highest Qualification <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="qualification"
                        required
                        value={formData.qualification}
                        onChange={handleFormChange}
                        placeholder="e.g. B.Sc. Microbiology"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleFormChange}
                        placeholder="e.g. 3"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Resume / CV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFormChange}
                      className="w-full border rounded-lg p-2 bg-white"
                    />
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter / Statement of Interest{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="coverLetter"
                      required
                      value={formData.coverLetter}
                      onChange={handleFormChange}
                      rows="5"
                      placeholder="Briefly explain why you are applying for this position..."
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  {/* Submit */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Vacancy Closed
                </h2>
                <p className="text-gray-600">
                  Thank you for your interest in working with{" "}
                  <strong>KIRCT</strong>. This vacancy is closed.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default Job;
