import React from "react";
import {
  CalendarDays,
  Users,
  Target,
  BookOpen,
  Microscope,
  Cpu,
} from "lucide-react";

const TrainingUpcoming = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          UPCOMING <span className="text-blue-700">TRAININGS</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Empowering professionals through innovation, bioinformatics, and
          genomic capacity building for effective AMR surveillance.
        </p>
      </div>

      {/* Training Card */}
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h3 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <Microscope className="text-blue-600" /> Bioinformatics Training Workshop for AMR Surveillance
        </h3>

        <p className="text-gray-600 leading-relaxed mb-8">
          <strong>KIRCT</strong>, in partnership with the{" "}
          <strong>GHRU</strong>, is hosting a comprehensive Bioinformatics
          Training Workshop to strengthen capacity for genomic surveillance of
          antimicrobial resistance (AMR). The training will run from{" "}
          <strong>6th to 25th October 2025</strong> and will feature lectures,
          demonstrations, and hands-on analysis sessions led by experienced
          bioinformaticians and microbiologists.
        </p>

        {/* Key Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
            <CalendarDays className="text-blue-700 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-800">Duration</h4>
              <p className="text-gray-600">6th – 25th October 2025</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
            <Users className="text-blue-700 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-800">Target Audience</h4>
              <p className="text-gray-600">
                Microbiologists, bioinformaticians, clinicians, interns, and postgraduate researchers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
            <Cpu className="text-blue-700 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-800">Training Type</h4>
              <p className="text-gray-600">Hands-on & Lecture Sessions</p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h4 className="text-xl font-semibold text-blue-700 mb-2">
              Description of the Training
            </h4>
            <p>
              This intensive workshop is designed to equip participants with
              essential knowledge and practical skills for analyzing microbial
              genomic data for AMR surveillance. The training covers key aspects
              such as data quality control, genome assembly, phylogenetic
              analysis, AMR gene detection, plasmid analysis, and data
              visualization.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-xl font-semibold text-blue-700 mb-2">
              Topics Covered
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Introduction to Bioinformatics, Databases, and Microreact Visualization</li>
              <li>Tool Installation & Environment Setup</li>
              <li>Quality Control, Trimming, and MultiQC</li>
              <li>Genome Assembly (SPAdes, ConFinder, BactInspector) and Phylogenetics (Snippy)</li>
              <li>AMR Gene Detection (AMRFinderPlus, PlasmidFinder) and Interpretation</li>
              <li>GitHub Basics, MLST, and SNP Phylogeny Batch Runs</li>
            </ul>
          </div>

          {/* Objectives */}
          <div>
            <h4 className="text-xl font-semibold text-blue-700 mb-2">
              Learning Objectives
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Understand bioinformatics principles and their application in AMR genomic surveillance.</li>
              <li>Perform quality control, genome assembly, and phylogenetic analyses of bacterial data.</li>
              <li>Detect and interpret AMR genes and plasmids using standard tools.</li>
              <li>Use visualization platforms to communicate genomic data effectively.</li>
              <li>Apply GitHub for collaborative and reproducible genomic analysis.</li>
              <li>Integrate genomic data with phenotypic resistance profiles to enhance surveillance efforts.</li>
            </ul>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default TrainingUpcoming;
