import React from "react";

// Direct imports - update paths as needed
import Solo from '../assets/solo.png';
import Miseq200 from '../assets/miseq-200.png';
import Miseq100 from '../assets/miseqi-100.png';
import PCR from '../assets/PCR-1.png';
import Quant from '../assets/QUANT-12K.1-1.png';
import UV from '../assets/uv.png';
import Flex from '../assets/flex.png';
import Thermo from '../assets/doc2.png';
import idigbeImage from '../assets/idigbe.png';

const Genomics = () => {
  return (
    <div className="bg-gray-50 py-12 px-6 md:px-16">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
            GENOMICS <span className="text-blue-700">RESEARCH UNIT</span>
            <span className="text-red-600">.</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Advancing genomics research to improve public health and reduce
            disease burden in Nigeria.
          </p>
        </div>

        {/* Overview Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Genomics and Molecular Biology Lab
          </h2>
          <p className="text-gray-700 mb-4">
            This lab is equipped with state-of-the-art equipment for molecular
            biology techniques such as PCR, sequencing, and gene expression
            analysis.
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Gene Expression Analysis</li>
            <li>Genotyping</li>
            <li>Sequencing</li>
          </ul>
        </section>

        {/* Mission Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Mission</h2>
          <p className="text-gray-700">
            The Genomics Centre at Kano Independent Research Centre Trust (KIRCT)
            is committed to advancing the field of genomics in Nigeria, with a
            focus on improving public health and reducing the burden of diseases.
            Our mission is to apply cutting-edge genomics technologies and
            expertise to address communicable and non-communicable diseases
            across the country.
          </p>
        </section>

        {/* Objectives Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Objectives
          </h2>
          <ol className="list-decimal ml-6 text-gray-700 space-y-2">
            <li>
              Establish a world-class genomic facility in Nigeria with
              state-of-the-art equipment.
            </li>
            <li>
              Conduct genomics research focusing on preeclampsia, diabetes, and
              hypertension.
            </li>
            <li>
              Develop genomic-based diagnostic and therapeutic strategies.
            </li>
            <li>
              Train and mentor local researchers and clinicians in genomics
              applications.
            </li>
            <li>
              Collaborate with national and international organizations to
              advance genomic science.
            </li>
          </ol>
        </section>

        {/* Equipment Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Key Equipment and Technologies
          </h2>

          <div className="space-y-10">
            {[
              {
                title: "GridION ONT-PROMETHION 2 SOLO",
                img: Solo,
                points: [
                  "Real-Time Analysis: Get immediate sequencing results.",
                  "Scalability: Supports up to 5 MinION flow cells simultaneously.",
                  "Versatility: Perfect for genome sequencing, transcriptomics, and targeted studies.",
                  "Streamlined Workflow: Includes onboard compute for basecalling and analysis.",
                ],
              },
              {
                title: "ProFlex™ PCR System",
                img: PCR,
                points: [
                  "Versatile block configurations for different sample sizes.",
                  "Touchscreen interface with Wi-Fi and remote access.",
                  "Precise thermal control ensures reproducible amplification.",
                  "Supports advanced features like gradient PCR and fast cycling.",
                ],
              },
              {
                title: "NanoDrop Oneᶜ UV-Vis Spectrophotometer",
                img: UV,
                points: [
                  "Microvolume Analysis with as little as 1–2 µL sample.",
                  "Detect contaminants using built-in spectral analysis.",
                  "Rapid results and user-friendly touchscreen interface.",
                ],
              },
              {
                title: "Qubit™ Flex Fluorometer",
                img: Flex,
                points: [
                  "Detect low-concentration DNA, RNA, and protein samples.",
                  "Analyze up to 8 samples simultaneously.",
                  "Requires minimal sample volume, preserving resources.",
                ],
              },
              {
                title: "QuantStudio™ 12k Flex Real-Time PCR System",
                img: Quant,
                points: [
                  "High sensitivity for low-abundance targets.",
                  "Supports multiple formats (96-well, 384-well).",
                  "Cloud-enabled system for remote monitoring and data sharing.",
                ],
              },
              {
                title: "Illumina MiSeq i100 plus",
                img: Miseq100,
                points: [
                  "Delivers results up to 4× faster than previous models.",
                  "Supports up to 200 million paired-end reads per run.",
                  "Onboard DRAGEN analysis for rapid data processing.",
                ],
              },
              {
                title: "NextSeq 2000 Systems",
                img: Miseq200,
                points: [
                  "High throughput (10–540 GB per run) and flexible read lengths.",
                  "Enhanced XLEAP-SBS chemistry for superior quality.",
                  "Integrated DRAGEN platform for on-instrument data analysis.",
                ],
              },
              {
                title: "Thermo Scientific™ KingFisher™ Flex",
                img: Thermo,
                points: [
                  "Automated nucleic acid extraction for up to 96 samples per run.",
                  "Magnetic bead-based technology ensures purity and high yield.",
                  "LIMS integration and touchscreen controls for traceability and ease of use.",
                ],
              },
            ].map((equipment, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col md:flex-row items-center md:items-start gap-6"
              >
                {/* Text Section */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">
                    {equipment.title}
                  </h3>
                  <ul className="list-disc ml-6 text-gray-700 space-y-1">
                    {equipment.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                {/* Image Section */}
                <div className="flex-shrink-0 w-full md:w-1/3">
                  <img
                    src={equipment.img}
                    alt={equipment.title}
                    className="rounded-xl object-cover w-full h-48 md:h-56 shadow-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Genomics;
