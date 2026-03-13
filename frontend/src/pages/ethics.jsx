import React from "react";

const Ethics = () => {
    return (
        <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-800">
                    KIRCT <span className="text-blue-800">ETHICS COMMITTEE</span><span className="text-red-600">.</span>
                </h2>

                <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
                <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                    Upholding the highest ethical standards in research to protect the
                    rights, dignity, and well-being of participants.
                </p>
            </div>

            {/* Content Container */}
            <div className="max-w-8xl mx-auto bg-white shadow-md rounded-2xl p-8 md:p-12 border border-gray-100">
                {/* Overview Section */}
                <h3 className="text-2xl font-bold text-blue-800 mb-4">
                    Overview of the Committee
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    The Director-General, Kano Independent Research Centre Trust (KIRCT),
                    constitutes the Committee to ensure that all research conducted under
                    its purview adheres to the highest ethical standards. The Committee
                    reviews all research proposals involving human participants to ensure
                    that they are scientifically sound and that the dignity, rights,
                    safety, and well-being of all participants are protected.
                </p>

                {/* How to Apply */}
                <h3 className="text-2xl font-bold text-blue-800 mb-4">How to Apply</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    A written application in the prescribed form (Annexure-2A-B)
                    requesting an ethical review of proposed biomedical research shall be
                    submitted by a qualified researcher responsible for the ethical and
                    scientific conduct of the study. The application should be submitted
                    to:
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-lg mb-6 text-gray-800">
                    <p className="font-semibold">The Secretary,</p>
                    <p>KIRCT - Health Research Ethics Committee</p>
                    <p>Office of the Legal Adviser, Administrative Block,</p>
                    <p>Kano Independent Research Centre Trust,</p>
                    <p>Dawakin Kudu Road, Off Kano/Kaduna Expressway, Kano.</p>
                    <p className="mt-2">
                        Email:{" "}
                        <a
                            href="mailto:ibrahim.nazir@kirct.com"
                            className="text-blue-700 underline"
                        >
                            ibrahim.nazir@kirct.com
                        </a>{" "}
                        and copied to <em>(additional address as applicable)</em>
                    </p>
                </div>

                {/* Application Requirements */}
                <h3 className="text-2xl font-bold text-blue-800 mb-4">
                    Application Requirements
                </h3>
                <ul className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
                    <li>
                        The Principal Investigator (PI) should forward nine (9) copies of
                        the proposal along with the application and documents duly signed by
                        all investigators and collaborators.
                    </li>
                    <li>
                        Applications must be received by the Secretary at least two (2)
                        weeks before the Committee’s scheduled meeting.
                    </li>
                    <li>
                        The Secretary shall acknowledge receipt of each submission. Incomplete
                        submissions will require additional materials as notified via email
                        or telephone.
                    </li>
                    <li>
                        Applicants will receive written feedback within 8 weeks of
                        submission, except for incomplete applications.
                    </li>
                    <li>
                        Any supplementary information requested by the Committee must be
                        submitted within one week, and not later than ten (10) days before
                        the next meeting.
                    </li>
                    <li>
                        All documents must be written in English. Materials in other
                        languages should include certified translations.
                    </li>
                    <li>
                        Interdisciplinary, inter-institutional, or external projects
                        involving KIRCT resources must also be submitted for review.
                    </li>
                    <li>
                        All relevant supporting documents must accompany the application.
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Ethics;
