import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import LoadingOverlay from "../components/loadingOverlay.jsx";
import InterviewModal from "../components/InterviewModal.jsx";
import ApprovalModal from "../components/ApprovalModal.jsx";

const ManageInterns = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [targetAppId, setTargetAppId] = useState(null);
  const [targetAppName, setTargetAppName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch all internship applications
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get-internships`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(data)) {
        setApplications(data);
      } else if (Array.isArray(data.apps)) {
        setApplications(data.apps);
      } else if (Array.isArray(data.data)) {
        setApplications(data.data);
      } else {
        setApplications([]);
        console.warn("Unexpected internships response:", data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load internship applications.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle status change
  const handleStatusChange = async (id, status, extraData = {}) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/internships/${id}/status`,
        { status, ...extraData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: data.application.status } : app
        )
      );

      toast.success(`Internship ${status} successfully. Email sent to ${data.application.email}`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  const openInterviewModal = (app) => {
    setTargetAppId(app._id);
    setTargetAppName(app.name);
    setIsInterviewModalOpen(true);
  };

  const handleInterviewSubmit = (details) => {
    handleStatusChange(targetAppId, "Invite", details);
  };

  const openApprovalModal = (app) => {
    setTargetAppId(app._id);
    setTargetAppName(app.name);
    setIsApprovalModalOpen(true);
  };

  const handleApprovalSubmit = (details) => {
    handleStatusChange(targetAppId, "Approved", details);
  };

  // Filter applications by name or department
  const filteredApps = applications.filter(
    (a) =>
      a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-blue-800 text-center mb-6">
        INTERNSHIP APPLICATION MANAGEMENT
      </h1>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 w-full sm:w-1/3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Applications Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-blue-100">
        {/* Table Header */}
        <div className="bg-blue-600 text-white sm:grid grid-cols-[0.5fr_2fr_3fr_2fr_2fr_2fr_1fr_3fr] font-semibold text-sm px-4 py-3">
          <span>#</span>
          <span>Name</span>
          <span className="hidden sm:block">Institution</span>
          <span>Department</span>
          <span>Course</span>
          <span className="hidden sm:block">Duration</span>
          <span className="hidden sm:block">Status</span>
          <span className="text-right pr-3">Actions</span>
        </div>

        {/* Table Body */}
        {filteredApps.length > 0 ? (
          filteredApps
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((app, i) => (
              <div
                key={app._id}
                className="sm:grid grid-cols-[0.5fr_2fr_3fr_2fr_2fr_2fr_1fr_3fr] items-center text-gray-700 border-b px-3 py-2 hover:bg-blue-50 transition"
              >
                <span>{(currentPage - 1) * itemsPerPage + i + 1}</span>
                <span>{app.name}</span>
                <span className="hidden sm:block">{app.institution}</span>
                <span>{app.department}</span>
                <span>{app.course}</span>
                <span className="hidden sm:block text-sm">
                  {app.startDate} → {app.endDate}
                </span>
                {/* Status badge */}
                <span className="hidden sm:block">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      app.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : app.status === "Invite"
                        ? "bg-green-100 text-green-800"
                        : app.status === "Approved"
                        ? "bg-teal-100 text-teal-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </span>

                <div className="flex justify-end gap-2">
                  {/* View button */}
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded-full transition"
                  >
                    View
                  </button>

                  {/* Invite */}
                  {app.status === "Pending" && (
                    <button
                      onClick={() => openInterviewModal(app)}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs px-4 py-1 rounded-full transition"
                    >
                      Invite
                    </button>
                  )}

                  {/* Approve */}
                  {app.status === "Invite" && (
                    <button
                      onClick={() => openApprovalModal(app)}
                      className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-4 py-1 rounded-full transition"
                    >
                      Approve
                    </button>
                  )}

                  {/* Reject */}
                  {["Pending", "Invite"].includes(app.status) && (
                    <button
                      onClick={() => handleStatusChange(app._id, "Rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-full transition"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500 py-6">
            No internship applications found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredApps.length > 0 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 rounded bg-blue-700 text-white disabled:bg-gray-300"
          >
            Prev
          </button>
          <span className="font-medium text-gray-700">
            Page {currentPage} of {Math.ceil(filteredApps.length / itemsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage * itemsPerPage >= filteredApps.length}
            className="px-4 py-1 rounded bg-blue-700 text-white disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}

      {/* View Details Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto p-4"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-2 right-3 text-red-600 text-2xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold text-blue-800 text-center mb-4">
              Internship Application Details
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Name:</strong> {selectedApp.name}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <p><strong>Phone:</strong> {selectedApp.phone}</p>
              <p><strong>Institution:</strong> {selectedApp.institution}</p>
              <p><strong>Department:</strong> {selectedApp.department}</p>
              <p><strong>Course:</strong> {selectedApp.course}</p>
              <p><strong>Level:</strong> {selectedApp.level}</p>
              <p><strong>Duration:</strong> {selectedApp.startDate} → {selectedApp.endDate}</p>
              <p><strong>Reason:</strong> {selectedApp.reason}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>

              {selectedApp.file && (
                <p>
                  <strong>Attached File:</strong>{" "}
                  <a
                    href={selectedApp.file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View File
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {isLoading && <LoadingOverlay />}
      <InterviewModal
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
        onSubmit={handleInterviewSubmit}
        applicantName={targetAppName}
      />
      <ApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onSubmit={handleApprovalSubmit}
        applicantName={targetAppName}
        type="Internship"
      />
    </div>
  );
};

export default ManageInterns;
