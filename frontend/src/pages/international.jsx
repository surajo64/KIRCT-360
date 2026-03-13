import React from "react";

const International = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          INTERNATIONAL <span className="text-blue-700">COLLABORATORS</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          KIRCT partners with globally recognized institutions to foster
          knowledge exchange, research collaboration, and innovation in science
          and healthcare.
        </p>
      </div>

      {/* Collaborators Section */}
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8">
        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Vanderbilt University, Nashville, USA
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Sleep Medicine and Sleep Laboratory Research.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            University of Alabama at Birmingham, USA
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Paediatrics, Infectious Disease Surveillance,
            and Sickle Cell Registry.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            University of Texas Health Centre (UTHealth), Houston, USA
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Healthcare Digitalization and Medical Data
            Integration.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Texas Biomedical Research Institute (I•CARE), San Antonio, USA
          </h3>
          <p className="text-gray-700 mt-2">
            Collaboration Focus: Biomedical Research and Infectious Disease
            Control.
          </p>
        </div>
      </div>
    </section>
  );
};

export default International;
