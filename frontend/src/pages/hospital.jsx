import React from "react";

const Hospital = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          HOSPITAL <span className="text-blue-700">COMPLEX</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Providing high-quality medical care and advanced healthcare services for the
          people of Kano and beyond.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
        {/* Mission Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To provide high-quality medical services in Kano and beyond.
          </p>
        </div>

        {/* Description Section */}
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>Kano Independent Research Centre Trust (KIRCT)</strong> proudly
            operates its own hospital complex known as{" "}
            <strong>KIRCT Kilimanjaro Hospital</strong>, a premier healthcare institution
            located within the KIRCT campus in Kano, Nigeria.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Officially launched on <strong>9th November 2023</strong>, the hospital stands
            as a beacon of excellence in patient care, offering a calm, aesthetically
            designed environment where patients can heal and recover comfortably.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Equipped with <strong>state-of-the-art facilities</strong> and a team of highly
            skilled medical professionals, KIRCT Kilimanjaro Hospital provides outpatient
            consultations, laboratory, and pharmaceutical services supported by a
            fully-integrated <strong>Electronic Medical Records (EMR)</strong> system
            developed internally at KIRCT.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The hospital operates daily from <strong>8:00 AM to 6:00 PM (Monday to
            Sunday)</strong>, with plans to expand to <strong>24-hour operations and
            inpatient services by August 2024</strong>.
          </p>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center mt-16">
        <p className="text-gray-600 max-w-3xl mx-auto">
          🏥 <strong>KIRCT Kilimanjaro Hospital</strong> — Combining compassion, innovation,
          and technology to redefine healthcare delivery in Northern Nigeria.
        </p>
      </div>
    </section>
  );
};

export default Hospital;
