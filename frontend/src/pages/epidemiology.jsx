import React from "react";

const Epidemiology = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          EPIDEMIOLOGY <span className="text-blue-700">& POPULATION HEALTH</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Exploring the social ecology of diseases and driving public health innovations
          through data-driven research and global collaboration.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
        {/* Mission */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To explore and understand the social ecology of disease causation and
            develop effective strategies to prevent and control diseases.
          </p>
        </div>

        {/* Description */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            This unit collaborates with the <strong>Kano CDC</strong> (Centre for Disease Control),
            the <strong>Kano State Tuberculosis and Leprosy Control Programme</strong>, and the{" "}
            <strong>Kano State Ministry of Health</strong> to conduct community-based disease
            assessments and surveillance. It also partners with federal agencies such as{" "}
            <strong>NACA</strong> (National Agency for the Control of AIDS) and the{" "}
            <strong>National Tuberculosis and Leprosy Control Programme</strong> to perform
            programmatic and individual-level assessments.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Researchers at KIRCT recently collaborated with NACA to conduct the world’s largest
            HIV/AIDS survey in Nigeria. They were instrumental in establishing the quality
            assurance matrix for validating the BIG database used for the survey.
          </p>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 text-sm mb-6">
            Salihu HM, Yusuf Z, Dongarwar D, Aliyu SH, Yusuf RA, Aliyu MH, Aliyu G. Development of a
            Quality Assurance Score for the Nigeria AIDS Indicator and Impact Survey (NAIIS)
            Database: Validation Study. *Journal of Medical Internet Research (Formative Research)*,
            2022; 6(1):e25752. doi: 10.2196/25752.
          </blockquote>
          <p className="text-gray-700 leading-relaxed">
            The Unit currently manages an ongoing grant to train NACA staff in data system
            management and analytics of “BIG DATA”.
          </p>
        </div>

        {/* Contributions Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">
            Contributions to Global Health
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Epidemiologists from the Centre played a vital role during the COVID-19 pandemic,
            contributing to several international initiatives:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li>
              Established an international and secure informatics infrastructure to investigate
              COVID-19 in collaboration with scientists from the US, Canada, Singapore, China,
              Italy, France, Switzerland, Germany, Belgium, and Australia as part of the{" "}
              <strong>SCOR Consortium</strong>.
            </li>
            <li>
              The Chairman, <strong>Professor Habib AG</strong>, served as Nigeria’s Principal
              Investigator for WHO-organized COVID-19 therapeutic trials in Africa.
            </li>
            <li>
              The <strong>Pandemic Efficiency Index (PEI)</strong> for global COVID-19 mortality
              ranking was developed by KIRCT’s Director General, <strong>Professor Salihu HM</strong>.
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-16">
        <p className="text-gray-600 max-w-3xl mx-auto">
          🌍 Through collaboration, innovation, and scientific excellence, the Epidemiology and
          Population Health Unit continues to advance KIRCT’s mission of improving public health
          in Nigeria and beyond.
        </p>
      </div>
    </section>
  );
};

export default Epidemiology;
