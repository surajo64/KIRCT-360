import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import LoadingOverlay from "../components/loadingOverlay.jsx";
import InterviewModal from "../components/InterviewModal.jsx";
import ApprovalModal from "../components/ApprovalModal.jsx";

const JobApplication = () => {
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


  const fetchApplications = async () => {
  setIsLoading(true);
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/applications`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Make sure `data` is an array
    if (Array.isArray(data)) {
      setApplications(data);
    } else if (Array.isArray(data.apps)) {
      setApplications(data.apps);
    } else {
      setApplications([]);
      console.warn("Unexpected applications response:", data);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to load job applications.");
  } finally {
    setIsLoading(false);
  }
};


  // Update status handler
  const handleStatusChange = async (id, status, extraData = {}) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/applications/${id}/status`,
        { status, ...extraData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: data.application.status } : app))
      );

      toast.success(`Application ${status} successfully. Email sent to ${data.application.email}`);
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

  useEffect(() => {
    fetchApplications();
    console.log(applications);
  }, []);


  const filteredApps = applications.filter(
    (a) =>
      a.namwe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-blue-800 text-center mb-6">
        JOB APPLICATION MANAGEMENT
      </h1>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 w-full sm:w-1/3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Job Applications Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-blue-100">
        {/* Table Header */}
        <div className="bg-blue-600 text-white sm:grid grid-cols-[0.5fr_2fr_3fr_2fr_2fr_2fr_1fr_3fr] font-semibold text-sm px-4 py-3">
          <span>#</span>
          <span>Name</span>
          <span className="hidden sm:block">Email</span>
          <span>Phone</span>
          <span>Position</span>
          <span className="hidden sm:block">Qualification</span>
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
                <span className="hidden sm:block">{app.email}</span>
                <span>{app.phone || "N/A"}</span>
                <span>{app.position}</span>
                <span className="hidden sm:block">{app.qualification || "N/A"}</span>
                {/* Status badge */}
                <span className="hidden sm:block">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${app.status === "Pending"
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
                  {/* View button: always visible */}
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded-full transition"
                  >
                    View
                  </button>

                  {/* Invite button: only if Pending */}
                  {(app.status === "Pending") && (
                    <button
                      onClick={() => openInterviewModal(app)}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs px-4 py-1 rounded-full transition"
                    >
                      Invite
                    </button>
                  )}

                  {/* Approve button: if Pending or Invite */}
                  {["Invite"].includes(app.status) && (
                    <button
                      onClick={() => openApprovalModal(app)}
                      className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-4 py-1 rounded-full transition"
                    >
                      Approve
                    </button>
                  )}

                  {/* Reject button: if Pending or Invite */}
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
            No job applications found.
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
              Job Application Details
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Name:</strong> {selectedApp.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedApp.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedApp.phone}
              </p>
              <p>
                <strong>Position:</strong> {selectedApp.position}
              </p>
              <p>
                <strong>Experience:</strong> {selectedApp.experience || "N/A"}
              </p>
              <p>
                <strong>Qualification:</strong> {selectedApp.qualification || "N/A"}
              </p>
              <p>
                <strong>Application Date:</strong>{" "}
                {new Date(selectedApp.createdAt).toLocaleDateString()}
              </p>
              {selectedApp.cv && (
                <p>
                  <strong>CV:</strong>{" "}
                  <a
                    href={selectedApp.cv}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View CV
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
        type="Job"
      />
    </div>
  );
};

export default JobApplication;
