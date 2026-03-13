import React from "react";

const TbUnit = () => {
  const equipmentList = [
    {
      title: "GeneXpert MTB/RIF System",
      points: [
        "Automated molecular diagnostic system for rapid detection of Mycobacterium tuberculosis.",
        "Simultaneously detects rifampicin resistance for drug-resistant TB screening.",
        "Delivers results within 2 hours with high sensitivity and specificity.",
      ],
      image: "/images/genexpert.jpg", // Replace with your actual image later
    },
    {
      title: "BACTEC MGIT 960",
      points: [
        "Automated, fluorescence-based detection of mycobacterial growth.",
        "Supports both drug susceptibility testing and culture-based diagnosis.",
        "High throughput system — up to 960 samples at once.",
      ],
      image: "/images/bactec-mgit-960.jpg",
    },
    {
      title: "TB Culture and Microscopy Unit",
      points: [
        "Performs smear microscopy using Ziehl-Neelsen and fluorescent staining.",
        "Uses solid (Löwenstein-Jensen) and liquid culture media for TB growth.",
        "Ensures biosafety level 3 (BSL-3) compliance for TB handling.",
      ],
      image: "/images/microscopy.jpg",
    },
    {
      title: "Drug Susceptibility Testing Lab",
      points: [
        "Performs first and second-line drug resistance analysis.",
        "Supports molecular and phenotypic DST workflows.",
        "Essential for monitoring multidrug-resistant TB (MDR-TB) cases.",
      ],
      image: "/images/dst-lab.jpg",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          TUBERCULOSIS <span className="text-blue-700">RESEARCH UNIT</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Combating Tuberculosis through innovative research, diagnostics, and
          technology for a healthier Nigeria.
        </p>
      </div>

      {/* Overview Section */}
      <div className="max-w-8xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">
          Overview of the TB Unit
        </h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Tuberculosis (TB) Unit</strong> at{" "}
          <strong>Kano Independent Research Centre Trust (KIRCT)</strong> is
          dedicated to the diagnosis, treatment, and research of TB in Nigeria.
          The unit is equipped with modern tools for rapid TB detection,
          antimicrobial resistance studies, and epidemiological surveillance.
        </p>

        {/* Subunits Section */}
        <h4 className="text-xl font-semibold text-blue-800 mt-6 mb-2">Subunits</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
          <li>TB Diagnosis</li>
          <li>TB Research</li>
          <li>Drug Resistance Testing</li>
          <li>Culture and Microscopy</li>
        </ul>

        {/* Mission Section */}
        <h3 className="text-2xl font-bold text-blue-900 mb-3">Mission</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          The Tuberculosis (TB) Unit at KIRCT is committed to addressing the TB
          epidemic in Nigeria through innovative research, diagnosis, treatment,
          and prevention strategies. Our mission is to reduce the burden of TB
          in Nigeria by improving understanding of the disease, developing new
          diagnostic tools and treatments, and promoting effective prevention
          strategies.
        </p>

        {/* Objectives Section */}
        <h3 className="text-2xl font-bold text-blue-900 mb-3">Objectives</h3>
        <ul className="list-decimal list-inside text-gray-700 space-y-2 mb-8">
          <li>
            Conduct research on TB focusing on epidemiology, pathogenesis,
            diagnosis, treatment, and prevention.
          </li>
          <li>
            Develop new diagnostic tools and technologies for rapid detection of
            TB bacteria.
          </li>
          <li>
            Investigate novel therapeutic strategies for TB treatment, including
            drug development and combination therapy.
          </li>
          <li>
            Promote effective prevention strategies for TB control, including
            vaccination and infection control measures.
          </li>
          <li>
            Train and mentor local researchers, clinicians, and students in TB
            research and its applications.
          </li>
        </ul>

        {/* Equipment Section */}
        <h3 className="text-2xl font-bold text-blue-900 mb-6">
          Key Equipment and Facilities
        </h3>

        <div className="space-y-10">
          {equipmentList.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start gap-8 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              {/* Text Section */}
              <div className="md:w-3/4">
                <h4 className="text-xl font-semibold text-blue-800 mb-2">
                  {item.title}
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Image Section */}
              <div className="md:w-1/4 flex justify-center">
                <div className="w-48 h-48 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16">
        <p className="text-gray-600 max-w-3xl mx-auto">
          🧬 <strong>KIRCT TB Research Unit</strong> — advancing TB science and
          innovation for a healthier Nigeria.
        </p>
      </div>
    </section>
  );
};

export default TbUnit;
