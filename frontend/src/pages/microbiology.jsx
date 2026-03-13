import React from "react";


// Direct imports - update paths as needed
import M50  from '../assets/phoenix-M50-3.png';
import MGIT from '../assets/mgit.png';
import Bact from '../assets/bact.png';
import Vitek from '../assets/vitek.png';
import Microscope from '../assets/microscope.png';
import MGIT320 from '../assets/mgit320.png';

const Microbiology = () => {
  const equipmentList = [
    {
      title: "Phoenix M50 Automated Microbial Identification System",
      points: [
        "Rapid identification of a wide range of bacteria and fungi.",
        "Performs Antimicrobial Susceptibility Testing (AST) for resistance profiling.",
        "Supports high-throughput processing for multiple samples.",
        "Compact, user-friendly design for efficient diagnostics.",
      ],
      image:M50,
    },
    {
      title: "BACTEC MGIT 960",
      points: [
        "Fluorescence-based monitoring for rapid tuberculosis (TB) culture detection.",
        "Reduces incubation times for faster diagnosis and intervention.",
        "Automated, scalable system supporting up to 960 tubes.",
        "Accurate, reliable, and efficient for TB drug susceptibility testing.",
      ],
      image: MGIT,
    },
    {
      title: "Bact-Alert System",
      points: [
        "Automated microbial detection in blood and body fluid samples.",
        "Enhanced accuracy and faster results for bloodstream infection diagnostics.",
        "Closed system design ensures safety and contamination prevention.",
      ],
      image: Bact,
    },
    {
      title: "Vitek System",
      points: [
        "Rapid microbial identification (bacteria, yeast, fungi) within hours.",
        "Provides antibiotic susceptibility testing for optimized treatment plans.",
        "High throughput and integrated identification-AST workflow.",
        "Reliable, clinically relevant results for critical diagnostics.",
      ],
      image: Vitek,
    },
    {
      title: "Light and Fluorescent Microscopes",
      points: [
        "High-resolution imaging for detailed cellular and tissue analysis.",
        "Fluorescence capabilities for advanced visualization.",
        "Versatile applications across clinical and life sciences research.",
      ],
      image: Microscope,
    },
    {
      title: "BACTEC MGIT 320",
      points: [
        "Fluorescence-based TB culture growth detection with reduced diagnostic time.",
        "Ideal for medium-throughput labs with automated data management.",
        "Reliable results for drug susceptibility and early TB diagnosis, similar to MGIT 960.",
      ],
      image: MGIT320,
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          MICROBIOLOGY <span className="text-blue-700">RESEARCH UNIT</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Advancing biomedical discovery through innovative microbiological research,
          technology, and collaboration.
        </p>
      </div>

      {/* Overview */}
      <div className="max-w-8xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">
          Overview of the Microbiology Unit
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Microbiology Research Unit</strong> at the{" "}
          <strong>Kano Independent Research Centre Trust (KIRCT)</strong> is equipped for
          culturing microorganisms, performing susceptibility testing, and identifying
          microorganisms using state-of-the-art technologies.
        </p>

        {/* Subunits */}
        <h4 className="text-xl font-semibold text-blue-800 mt-6 mb-2">Subunits</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
          <li>Public Health Laboratory</li>
          <li>AMR Laboratory (Full Automation)</li>
          <li>Microbial Genomics</li>
          <li>Virology / Cell Culture</li>
        </ul>

        {/* Mission */}
        <h3 className="text-2xl font-bold text-blue-900 mb-3">Mission</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          The Microbiology Unit at KIRCT is dedicated to understanding complex interactions
          between microorganisms and their hosts, focusing on improving human health and
          disease prevention. Our mission is to apply microbiological research to address
          pressing health challenges in Nigeria, particularly in infectious diseases and
          antimicrobial resistance.
        </p>

        {/* Objectives */}
        <h3 className="text-2xl font-bold text-blue-900 mb-3">Objectives</h3>
        <ul className="list-decimal list-inside text-gray-700 space-y-2 mb-8">
          <li>
            Conduct research in microbiology, focusing on the isolation, identification,
            and characterization of microorganisms causing diseases in Nigeria.
          </li>
          <li>
            Develop and implement diagnostic tools and therapeutic strategies for
            infectious disease prevention and treatment.
          </li>
          <li>
            Investigate the role of microorganisms in disease pathogenesis to identify new
            targets for antimicrobial therapy.
          </li>
          <li>
            Train and mentor local researchers, clinicians, and students in microbiology
            research and its applications.
          </li>
          <li>
            Collaborate with national and international organizations to advance
            microbiology research and translation in Nigeria.
          </li>
        </ul>

        {/* Equipment Section */}
        <h3 className="text-2xl font-bold text-blue-900 mb-6">Core Equipment</h3>

        <div className="space-y-10">
          {equipmentList.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start gap-8 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              {/* Text Section */}
              <div className="md:w-3/4">
                <h4 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Image Section */}
              
                <div className="flex-shrink-0 w-full md:w-1/3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-xl object-cover w-full h-48 md:h-56 shadow-md"
                  />
     
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16">
        <p className="text-gray-600 max-w-3xl mx-auto">
          🧫 <strong>KIRCT Microbiology Unit</strong> — advancing microbiological
          innovation for a healthier Nigeria and Africa.
        </p>
      </div>
    </section>
  );
};

export default Microbiology;
