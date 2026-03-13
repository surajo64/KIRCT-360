import React from "react";

const Grant = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800">
          GRANT MANAGEMENT OFFICE <span className="text-red-600">(GMO)</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Overview */}
      <section className="bg-white shadow-md rounded-lg p-8 mb-8">
        <p className="text-gray-700 leading-relaxed mb-4">
          The Grant Management Office (GMO) serves as the backbone of the
          organization’s resource mobilization, grants administration, and donor
          compliance systems. In an increasingly competitive and highly
          regulated funding environment, the GMO provides structured support
          throughout the full grant lifecycle — from the identification of
          funding opportunities to the final close-out of awards.
        </p>
        <p className="text-gray-700 leading-relaxed">
          During the year under review, the GMO worked closely with Principal
          Investigators (PIs), Finance, Procurement, Monitoring and Evaluation
          (M&E) units, and Executive Management to ensure that donor-funded
          projects were developed, implemented, and reported in full compliance
          with donor guidelines and institutional policies.
        </p>
      </section>

      {/* Functional Phases */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Pre-Award Management
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Funding opportunity identification</li>
            <li>Proposal design and budgeting</li>
            <li>Submission and negotiation</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Post-Award Management
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Grant activation and implementation oversight</li>
            <li>Expenditure control and reporting</li>
            <li>Audit support and grant close-out</li>
          </ul>
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-white shadow-md rounded-lg p-8 mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Objectives and Mandate
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Strengthen institutional grant acquisition capacity</li>
          <li>Support development of competitive donor-responsive proposals</li>
          <li>Ensure transparent and accountable use of donor resources</li>
          <li>Promote coordination across technical and administrative units</li>
          <li>Safeguard organizational reputation and compliance</li>
          <li>Diversify funding sources for sustainability</li>
          <li>Provide leadership in grant risk management</li>
        </ul>
      </section>

      {/* Core Functions */}
      <section className="bg-gray-50 border rounded-lg p-8 mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Mandate and Core Functions
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Pre-award coordination and proposal development</li>
          <li>Budgeting guidance and compliance review</li>
          <li>Donor liaison and contract negotiation</li>
          <li>Grant execution oversight and close-out</li>
          <li>Monitoring, reporting, and audit support</li>
          <li>Capacity building for PIs and project teams</li>
          <li>Maintenance of grant registers and documentation</li>
        </ul>
      </section>

      {/* Workflow Table */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          GMO Workflows and Responsibilities
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="border px-4 py-2">Grant Phase</th>
                <th className="border px-4 py-2">Major Activities</th>
                <th className="border px-4 py-2">Primary Responsibility</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="border px-4 py-2">Pre-Award</td>
                <td className="border px-4 py-2">
                  Opportunity identification, proposal submission
                </td>
                <td className="border px-4 py-2">GMO, PI, Finance</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Negotiation</td>
                <td className="border px-4 py-2">
                  Donor clarification, budget revision
                </td>
                <td className="border px-4 py-2">
                  GMO, Management, Finance
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Activation</td>
                <td className="border px-4 py-2">
                  Grant setup and reporting calendar
                </td>
                <td className="border px-4 py-2">GMO, Finance</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Implementation</td>
                <td className="border px-4 py-2">
                  Program execution and spending control
                </td>
                <td className="border px-4 py-2">
                  PI, Finance, Procurement
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Reporting</td>
                <td className="border px-4 py-2">
                  Narrative and financial reporting
                </td>
                <td className="border px-4 py-2">
                  PI, Head of Accounts, GMO
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Close-Out</td>
                <td className="border px-4 py-2">
                  Final reconciliation and closure
                </td>
                <td className="border px-4 py-2">
                  GMO, Head of Accounts
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-white shadow-md rounded-lg p-8 mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Key Achievements
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            Successful implementation of NACA (Dec 2023–Dec 2024), Zocare (Jan
            2024–Dec 2024), and Azithromycin grants (Jan 2024–Dec 2025)
          </li>
          <li>Strengthened grant management systems and documentation</li>
          <li>Improved donor reporting timeliness and audit outcomes</li>
          <li>Enhanced collaboration across internal units</li>
          <li>Standardized grant templates and checklists</li>
          <li>Capacity building support to project teams</li>
        </ul>
      </section>

      {/* Challenges & Outlook */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Challenges Encountered
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Exchange rate fluctuations affecting budgets</li>
            <li>Funding gaps between project cycles</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Strategic Priorities
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Automation of grant tracking systems</li>
            <li>Diversification of funding sources</li>
            <li>Expanded PI training on donor compliance</li>
            <li>Strengthened internal controls and SOPs</li>
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-700 leading-relaxed">
          The Grant Management Office remains committed to excellence in grant
          stewardship, donor accountability, and institutional sustainability.
          Through continuous system strengthening and collaboration, the GMO
          will continue to advance the organization’s mission.
        </p>
      </section>
    </div>
  );
};

export default Grant;
