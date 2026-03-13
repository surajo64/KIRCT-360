import React from "react";

const Studies = () => {
  return (

    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          RESEARCH <span className="text-blue-700">STUDIES </span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
To generate high-impact research, produce evidence-based results,
            and publish findings to contribute to general knowledge.
        </p>
      </div>

    <div className="max-w-7xl mx-auto px-6 py-10 bg-white shadow-lg rounded-2xl">
    
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Mission:</h2>
        <p className="text-gray-700 leading-relaxed">
          To bridge the gap between research and real-world impact, ensuring
          equitable access to products of research, particularly for underserved
          populations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Objectives:
        </h2>
        <ul className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>
            To generate high-impact research, produce evidence-based results,
            and publish findings to contribute to general knowledge.
          </li>
          <li>
            To promote ethical research practices, ensuring all studies meet the
            highest ethical standards and maintain transparency and compliance.
          </li>
          <li>
            To enhance healthcare access by focusing on diseases prevalent in
            the community and developing affordable solutions.
          </li>
          <li>
            To foster collaboration and innovation through strong partnerships
            with national and international research institutes, non-governmental,
            and governmental bodies.
          </li>
          <li>
            To empower communities and increase awareness of research studies
            through education and outreach.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Study Logistics
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600">
              1. Pre-Implementation Logistics
            </h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Study Materials Preparation</li>
              <li>Regulatory Documentation</li>
              <li>Site Setup</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600">
              2. Initiation Phase Logistics
            </h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Shipping of Investigational Products and Supplies</li>
              <li>Centralized Laboratory Services</li>
              <li>Site and Investigator Readiness</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600">
              3. Implementation Phase Logistics
            </h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Patient Enrolment and Coordination</li>
              <li>Investigational Product (IP) Dispensation</li>
              <li>Logistics of Monitoring and Visits</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600">
              4. Data Management and Analysis Logistics
            </h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Data Collection Systems</li>
              <li>Interim Analysis Logistics (if applicable)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600">
              5. Close-Out and Completion Phase Logistics
            </h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Final Data Collection and Reporting</li>
              <li>Return of Supplies and IP</li>
              <li>Regulatory Reporting and Submissions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600">
              6. Post-Implementation Logistics
            </h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Long-Term Follow-Up and Monitoring</li>
              <li>Archiving</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    </section>
  );
};

export default Studies;
