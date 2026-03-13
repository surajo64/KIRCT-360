import React, { useState } from "react";
import { Users, X } from "lucide-react";

const TrainingCompleted = () => {
  const [showModal, setShowModal] = useState(false);

  const trainees = [
    "Amina S. Musa",
    "Bashir M. Idris",
    "Fatima L. Aliyu",
    "Mohammed A. Danjuma",
    "Halima Yusuf",
    "Usman Bello",
    "Zainab Abdul",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6">
        {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          COMPLETED <span className="text-blue-700"> TRAININGS</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Combating Tuberculosis through innovative research, diagnostics, and
          technology for a healthier Nigeria.
        </p>
      </div>
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
       
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Course Title:</strong> Analysis with Missing Data and
            Statistical Analysis Using R Software
          </p>

          <p>
            <strong>Tutor:</strong> Dr. Ibrahim Yusuf Ibrahim
          </p>

          <p>
            <strong>Duration:</strong> 2024 – 2025
          </p>

          <div className="flex items-center space-x-2">
            <Users className="text-blue-600" size={20} />
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition"
            >
              View List of Trainees
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              List of Trainees
            </h2>

            <ul className="space-y-2 text-gray-700">
              {trainees.map((name, index) => (
                <li
                  key={index}
                  className="border-b py-2 hover:bg-blue-50 rounded-lg px-2 transition"
                >
                  {index + 1}. {name}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCompleted;
