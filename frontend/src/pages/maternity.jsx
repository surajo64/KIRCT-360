import React from "react";

const Maternity = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          MATERNAL <span className="text-blue-700">& CHILD HEALTH</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Promoting the health and wellbeing of mothers and children through
          innovation, partnership, and community-centered research.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
        {/* Mission Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To promote the health and wellbeing of the mother and child, and to
            prevent morbidity and mortality through collaboration with local,
            national, and international stakeholders.
          </p>
        </div>

        {/* Description Section */}
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Maternal and Child Health Unit collaborates with the{" "}
            <strong>Centre of Excellence in Population Health and Policy (ACEPHAP)</strong>, 
            Bayero University, Kano, under grants from the <strong>World Bank</strong> 
            to develop innovative technologies for pregnant and postpartum mothers.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            These technologies include educational video content and digital linkages 
            to nearby health facilities — helping expectant mothers access safer delivery 
            options and improve maternal-foetal outcomes.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            With support from the <strong>Bill and Melinda Gates Foundation</strong>, the 
            Unit is partnering with ACEPHAP to pilot a community-based intervention 
            assessing the feasibility of prophylactic therapeutics aimed at reducing 
            adverse maternal outcomes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Additionally, the Unit works closely with the{" "}
            <strong>UNDP–UNFPA–UNICEF–WHO–World Bank Special Programme for Research</strong> 
            to train physicians and public health professionals in maternal and child health 
            (MCH) on the effective use of data for decision-making across federal health 
            facilities in Nigeria.
          </p>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center mt-16">
        <p className="text-gray-600 max-w-3xl mx-auto">
          🌸 The Maternal and Child Health Unit remains dedicated to advancing the 
          safety, dignity, and health of mothers and children through science, 
          compassion, and collaborative innovation.
        </p>
      </div>
    </section>
  );
};

export default Maternity;
