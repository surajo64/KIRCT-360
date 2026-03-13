import React from "react";

const National = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          NATIONAL <span className="text-blue-700">COLLABORATORS</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          KIRCT partners with leading national institutions and government
          bodies to strengthen health systems, enhance research capacity, and
          drive innovation in healthcare delivery across Nigeria.
        </p>
      </div>

      {/* Collaborators List */}
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8">
        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            National Implementation Science Alliance (NISA)
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Implementation Research and Policy Translation.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Africa Center of Excellence in Population Health and Policy (ACEPHAP),
            Bayero University, Kano
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Maternal and Child Health Research and Training.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Federal Ministry of Health, Nigeria
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: National Health Policy, Regulation, and Research
            Support.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Nigerian Institute of Medical Research Foundation (NIMR)
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Biomedical Research and Clinical Trials.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Kano State Ministry of Health
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Public Health Initiatives and Disease Control.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Kano Center for Disease Control (Kano CDC)
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Disease Surveillance, Prevention, and Response.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            EHA Clinics and E-Health Africa Foundation
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Digital Health Innovation and Healthcare Access.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Presidential Initiative for Unlocking the Healthcare Value Chain (PVAC)
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Strengthening Nigeria’s Healthcare Economy and
            Local Manufacturing.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            National Biotechnology Research and Development Agency (NBRDA)
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Biotechnology Research, Development, and Capacity
            Building.
          </p>
        </div>
      </div>
    </section>
  );
};

export default National;
