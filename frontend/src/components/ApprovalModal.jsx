import React, { useState } from "react";

const ApprovalModal = ({ isOpen, onClose, onSubmit, applicantName, type }) => {
  const [startDate, setStartDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ startDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100] p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-teal-800 text-center mb-4">
          Approval Details
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Set the expected start date for <span className="font-semibold">{applicantName}</span>'s {type}.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Start Date
            </label>
            <input
              type="date"
              required
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Confirm Approval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApprovalModal;
