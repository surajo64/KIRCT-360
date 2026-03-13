import React from "react";

const Publications = () => {
  const papers = [
    {
      title:
        "Socioeconomic and Clinical Determinants of Nutritional Phenotypes among Children with Sickle Cell Disease",
      link: "https://www.researchgate.net/publication/392445108_Socioeconomic_and_Clinical_Determinants_of_Nutritional_Phenotypes_among_Children_with_Sickle_Cell_Disease",
    },
    {
      title:
        "Predictors of Human Immunodeficiency Virus (HIV) Acquisition among Children 0–14 Years in Nigeria",
      link: "https://ijtmrph.org/predictors-of-human-immunodeficiency-virus-among-children-014-years-in-nigeria/",
    },
    {
      title:
        "Intent to Receive Human Papillomavirus Vaccination among School-going Pre-teens and Adolescent Girls",
      link: "https://www.researchgate.net/publication/392277992_Intent_to_Receive_Human_Papillomavirus_Vaccination_among_School-going_Pre-teens_and_Adolescent_Girls",
    },
    {
      title:
        "Drivers of Human Immunodeficiency Virus among Pregnant Women in Conflict and Non-conflict Zones of Nigeria",
      link: "https://www.researchgate.net/publication/392694042_Drivers_of_Human_Immunodeficiency_Virus_among_Pregnant_Women_in_Conflict_and_Non-conflict_Zones_of_Nigeria",
    },
    {
      title:
        "Post COVID-19 Resurgence of Diphtheria in Kano, Nigeria: Analysis of 18,320 Cases",
      link: "https://www.researchgate.net/publication/394014985_Post_COVID_19_resurgence_of_diphtheria_in_Kano_Nigeria_analysis_of_18320_cases",
    },
    {
      title:
        "HPV Vaccine Hesitancy among Parents and Caregivers of Adolescents in Northern Nigeria",
      link: "https://www.researchgate.net/publication/386081622_HPV_vaccine_hesitancy_among_parents_and_caregivers_of_adolescents_in_Northern_Nigeria",
    },
    {
      title:
        "New Paradigm for Battling Hospital-Acquired Infections in Developing Countries – International Journal of Maternal and Child Health and AIDS",
      link: "https://www.researchgate.net/publication/391597354_New_Paradigm_for_Battling_Hospital-Acquired_Infections_in_Developing_Countries_International_Journal_of_Maternal_and_Child_Health_and_AIDS",
    },
    {
      title: "HIV‐Tuberculosis Co‐infection in Conflict Zones of Nigeria",
      link: "https://www.ovid.com/journals/tmih/fulltext/10.1111/tmi.14112~hivtuberculosis-coinfection-in-conflict-zones-of-nigeria",
    },
    {
      title:
        "Detection of a New blaOXA-51-Like Variant (blaOXA-1328) and a Novel Sequence Type (ST3457/2790) in Acinetobacter baumannii Isolated from Community Sewage and an Incinerator Surface in Nigeria",
      link: "https://bmcresnotes.biomedcentral.com/articles/10.1186/s13104-025-07384-z",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          KIRCT <span className="text-blue-700">PUBLICATIONS</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Explore recent scholarly outputs, research findings, and scientific
          contributions from the{" "}
          <span className="font-semibold text-blue-800">
            Kano Independent Research Centre Trust (KIRCT)
          </span>{" "}
          team.
        </p>
      </div>

      {/* Publications List */}
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <ul className="space-y-6">
          {papers.map((paper, index) => (
            <li
              key={index}
              className="border-l-4 border-blue-600 pl-4 hover:shadow-md transition-shadow bg-gray-50 p-4 rounded-lg"
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                {paper.title}
              </h3>
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 underline text-sm md:text-base"
              >
                {paper.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Publications;
