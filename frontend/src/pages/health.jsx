import React from "react";

const Health = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          HEALTH METRICS <span className="text-blue-700">& ARTIFICIAL INTELLIGENCE</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Leveraging data science and artificial intelligence to revolutionize public health
          and improve healthcare systems across Nigeria and beyond.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
        {/* Mission Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To advance public health and healthcare delivery through the development and
            application of health metrics and artificial intelligence (AI) for improved
            population health outcomes and optimized healthcare systems.
          </p>
        </div>

        {/* Description Section */}
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Health Metrics and AI Unit consists of computer and data scientists who
            engage in advanced <strong>“BIG DATA”</strong> analytics, integrating information
            from various sources including public health records, medical records,
            administrative data, and even social media streams.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The unit designed and implemented the Centre’s current{" "}
            <strong>Electronic Medical Record (EMR)</strong> system — one of the digital
            platforms being evaluated by the <strong>Federal Ministry of Health</strong> for
            national adoption in federal hospitals and disease surveillance programs.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The EMR unifies clinical, laboratory, and epidemiologic data into one cohesive
            system. It is now being enhanced with an <strong>AI-driven pipeline</strong> to
            boost predictive analytics, decision support, and automation across departments.
          </p>
          <p className="text-gray-700 leading-relaxed">
            In collaboration with the{" "}
            <strong>University of Health Sciences, Houston, Texas (USA)</strong>, the Unit is
            establishing a <strong>Healthcare Artificial Intelligence (HAI) Training Centre</strong> 
            in Kano to build Nigeria’s capacity in the growing field of digital and AI-powered
            healthcare.
          </p>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center mt-16">
        <p className="text-gray-600 max-w-3xl mx-auto">
          🤖 The Health Metrics & AI Unit stands at the forefront of innovation — combining
          technology, research, and compassion to shape the future of healthcare in Africa.
        </p>
      </div>
    </section>
  );
};

export default Health;
