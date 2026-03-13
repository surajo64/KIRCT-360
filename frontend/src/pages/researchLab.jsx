import React from "react";
import { FlaskConical, Cpu, BookOpenCheck, Users, Microscope, BarChart3 } from "lucide-react";

const ResearchLab = () => {
  const sections = [
    {
      title: "Next-Generation Sequencing (NGS) Services",
      icon: <Microscope className="text-blue-700 w-6 h-6" />,
      details: [
        "Whole-genome sequencing",
        "Exome sequencing",
        "Targeted sequencing",
        "RNA-seq",
      ],
    },
    {
      title: "Genomic Analysis",
      icon: <Cpu className="text-blue-700 w-6 h-6" />,
      details: [
        "Data pre-processing and quality control",
        "Genome assembly and annotation",
        "Variant detection and annotation",
        "Functional analysis and prediction",
      ],
    },
    {
      title: "Genotyping Services",
      icon: <BarChart3 className="text-blue-700 w-6 h-6" />,
      details: [
        "Microarray-based genotyping",
        "Restriction Fragment Length Polymorphism (RFLP)",
        "TaqMan SNP",
      ],
    },
    {
      title: "Gene Expression Analysis",
      icon: <FlaskConical className="text-blue-700 w-6 h-6" />,
      details: [
        "RNA-seq for transcriptome analysis",
        "Microarray-based gene expression analysis",
        "qRT-PCR for gene-specific expression analysis",
      ],
    },
    {
      title: "Research Collaboration",
      icon: <Users className="text-blue-700 w-6 h-6" />,
      details: [
        "Study design and planning",
        "Data analysis and interpretation",
        "Manuscript preparation and publication",
      ],
    },
    {
      title: "Training and Education",
      icon: <BookOpenCheck className="text-blue-700 w-6 h-6" />,
      details: [
        "Training and workshops for researchers and students",
        "Hands-on experience in genomics and bioinformatics",
        "Collaborative academic and industry programs",
      ],
    },
  ];
 
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 lg:px-24">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
           CENTRAL RESEARCH LABORATORY <span className="text-red-600">.</span>
        </h1>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="text-gray-600 max-w-8xl mx-auto leading-relaxed">
          The Central Research Laboratory at <span className="font-semibold text-blue-800">Kano Independent Research Centre Trust (KIRCT)</span> 
          serves as the hub of innovation and scientific exploration. 
          Equipped with state-of-the-art technology and a team of dedicated experts, 
          it supports advanced research in genomics, bioinformatics, and healthcare innovation.
        </p>
      </div>

      {/* Overview Section */}
      <div className="max-w-8xl mx-auto mb-16 bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        <p className="text-gray-700 leading-relaxed text-justify">
          Our laboratory is designed to drive scientific advancement through interdisciplinary
          research, focusing on high-throughput sequencing, advanced data analytics, and 
          bioinformatics-driven discovery. The Central Research Lab plays a key role in 
          supporting clinical and academic research projects, empowering discoveries that
          contribute to improved healthcare outcomes.
        </p>
      </div>

      {/* Core Functions */}
      <div className="max-w-8xl mx-auto grid gap-10">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-blue-100 rounded-full">{section.icon}</div>
              <h2 className="text-2xl font-bold text-blue-800">{section.title}</h2>
            </div>
            <ul className="list-disc pl-8 text-gray-700 space-y-2">
              {section.details.map((item, i) => (
                <li key={i} className="hover:text-blue-700 transition-colors">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default ResearchLab;
