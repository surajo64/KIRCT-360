import React, { useState } from "react";
import dgImage from "../assets/doc1.png";
import es from "../assets/David.png";
import Admin from "../assets/admin.png";
import HR from "../assets/hr.png";
import IT from "../assets/it.png";
import Legal from "../assets/legal.png";
import Bus from "../assets/bus.png";
import CMD from "../assets/cmd.png";
import Acc from "../assets/denis.png";
import ibrahimImage from "../assets/upload_area.png";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: "Prof. Hamisu Salihu",
      title: "Director General / CEO",
      image: dgImage,
      description:
        "Oversees research direction, institutional growth, and partnerships at KIRCT.",
      details:
        "Prof. Hamisu Salihu leads the Centre with extensive experience in public health research and management, ensuring excellence and innovation in biomedical science.",
    },
    {
      id: 2,
      name: "David Odiwo FCA",
      title: "Executive Secretary",
      image: es,
      description:
        "Principal Partner, David commenced his accounting career as an audit trainee in Anjous, Uku, Eweka and Co Chartered Accountants Benin City in 1983, he worked with S.S.",
      details:
        "Principal Partner, David commenced his accounting career as an audit trainee in Anjous, Uku, Eweka and Co Chartered Accountants Benin City in 1983, he worked with S.S. Afemikhe and Co Chartered Accountants, Lagos from 1988 to 1990. Qualified as a Chartered Accountant (Institute of Chartered Accountants of Nigeria) in 1991 and joined Guinness Nigeria Plc as an Internal Auditor.He Worked with Commercial Trust bank Limited from 1992 to 1993 as an Internal Auditor and Operations Manager from 1994 to 1998 in the bank’s Onitsha Branch. He also worked as a Consultant for Deo–Tseena Consulting and was General Manager Finance and Investments, Securities Trading & Investments Limited before becoming the principal partner of David Odiwo and Co (Chartered Accountants). He has over twenty years post qualification experience spanning Auditing, Consultancy, Taxation, Banking and financial services. His experience spans Auditing of Major companies as well as consulting in diverse sectors of the Nigerian economy such as value for money audits for major companies in the oil and gas industry as well as firms in the capital market. David holds an HND in accountancy from Auchi Polytechnic, Auchi. Edo state and is currently a fellow of the Institute of Chartered Accountants of Nigeria (ICAN) and an associate member of the Business Recovery and Insolvency Practitioners Association of Nigeria (BRIPAN).",
    },
    {
      id: 3,
      name: "Prof. Jameel Ismail Ahmad",
      title: "CMD KIRCT Kilimanjaro hospital",
      image: CMD,
      description:
        "A Cardiovascular and Thoracic Surgeon, an Associate Professor of Surgery and a healthcare entrepreneur.",
      details:
        "A Cardiovascular and Thoracic Surgeon, an Associate Professor of Surgery and a healthcare entrepreneur. He completed a training in Cardiovascular and Thoracic Surgery in 2014 (in Nigeria, Ghana and India) and he currently offers specialized cardiovascular and Thoracic surgical services, training and research as well as engaging in healthcare entrepreneurship after obtaining a Masters in business Administration (specialization in entrepreneurship and venture creation) in 2020.",
    },
    {
      id: 4,
      name: "Iliyasu Salihu",
      title: "Head Of Administration",
      image: Admin,
      description:
        "Oversees hematology and clinical research focusing on sickle cell disease.",
      details:
        "Dr. Idris specializes in hematology and clinical trials, leading a team focused on improving diagnostic and treatment outcomes in blood disorders.",
    },
     {
      id: 5,
      name: "Hassana Kassim",
      title: "Head of Human Resource",
      image: HR,
      description:
        "Leads infectious disease research, focusing on malaria, TB, and HIV studies.",
      details:
        "Prof. Hamza is a physician and infectious disease expert with numerous research contributions in Nigeria’s public health ecosystem.",
    },
    {
      id: 6,
      name: "Denis Isho",
      title: "Head of Account",
      image: Acc,
      description:
        "Expert in cardiovascular health and women’s health initiatives.",
      details:
        "Prof. Hadiza Saidu drives key programs on cardiac research and advocacy for women’s health improvement across northern Nigeria.",
    },
    {
      id: 7,
      name: "Dr. Nasiru Abdullahi",
      title: "Head of Research Lab",
      image: ibrahimImage,
      description:
        "Oversees hematology and clinical research focusing on sickle cell disease.",
      details:
        "Dr. Idris specializes in hematology and clinical trials, leading a team focused on improving diagnostic and treatment outcomes in blood disorders.",
    },
     {
      id: 8,
      name: "Eng. Muhammad Sabo",
      title: "Head of Maintenace",
      image: ibrahimImage,
      description:
        "Expert in cardiovascular health and women’s health initiatives.",
      details:
        "Prof. Hadiza Saidu drives key programs on cardiac research and advocacy for women’s health improvement across northern Nigeria.",
    },
    {
      id: 9,
      name: "Surajo Umar Danja",
      title: "Head of IT Department",
      image: IT,
      description:
        "Danja Surajo Umar is an experienced IT Consultant with a strong academic background and over 5 years of hands-on experience in network administration.",
      details:
        "Danja Surajo Umar is an experienced IT Consultant with a strong academic background and over 5 years of hands-on experience in network administration, IT infrastructure, and web technologies. With a Master’s degree in Information Technology and a proven record across educational institutions and public sector agencies, Danja brings a strategic approach to integrating technology solutions that enhance operational efficiency and data security within financial environments. His expertise spans secure network configuration, structured cabling, and custom web development using frameworks such as ASP.NET, PHP, and React—ensuring accounting systems are both scalable and secure. Danja’s teaching and administrative roles have equipped him with the skills to communicate technical concepts clearly to non-technical stakeholders, making him a valuable bridge between IT and finance teams. Core Competencies Network Security & Device Configuration Financial Systems Support & Infrastructure Optimization Full-Stack Web Development (ASP.NET, React, PHP) Data Integrity & Backup Solutions User Training & Documentation IT Compliance for Financial Processes",
    },
    {
      id: 10,
      name: "Barr. Nazir Ibrahim",
      title: "Head of Legal Department",
      image: Legal,
      description:
        "Oversees hematology and clinical research focusing on sickle cell disease.",
      details:
        "Dr. Idris specializes in hematology and clinical trials, leading a team focused on improving diagnostic and treatment outcomes in blood disorders.",
    },
     {
      id: 11,
      name: "Dr. Hassan Adam",
      title: "Head of Epidemiology Research",
      image: ibrahimImage,
      description:
        "Oversees hematology and clinical research focusing on sickle cell disease.",
      details:
        "Dr. Idris specializes in hematology and clinical trials, leading a team focused on improving diagnostic and treatment outcomes in blood disorders.",
    },
    {
      id: 12,
      name: "Imran Nasir Tahir",
      title: "Head of Business Development",
      image: Bus,
      description:
        "Oversees hematology and clinical research focusing on sickle cell disease.",
      details:
        "Dr. Idris specializes in hematology and clinical trials, leading a team focused on improving diagnostic and treatment outcomes in blood disorders.",
    },
  ];

  const dg = teamMembers[0];
  const others = teamMembers.slice(1);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
            OUR <span className="text-blue-800">TEAM</span>
             <span className="text-red-600">.</span>
          </h2>
           <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Meet the exceptional professionals driving the Kano Independent
            Research Centre Trust’s mission to advance biomedical and
            translational research.
          </p>
        </div>

        {/* DG Section */}
        <div className="flex justify-center mb-16">
          <div
            className="bg-white rounded-2xl shadow-xl w-full sm:w-2/3 md:w-1/2 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={() => openModal(dg)}
          >
            <div className="h-80 relative overflow-hidden">
              <img
                src={dg.image}
                alt={dg.name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">{dg.name}</h3>
                <p className="text-blue-200 text-sm">{dg.title}</p>
              </div>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-700 text-sm mb-3">{dg.description}</p>
              <span className="text-blue-600 text-sm font-semibold flex justify-center items-center">
                View profile →
              </span>
            </div>
          </div>
        </div>

        {/* Other Team Members */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => openModal(member)}
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-lg">
                    {member.name}
                  </h3>
                  <p className="text-blue-200 text-bold text-sm">{member.title}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                  {member.description}
                </p>
                <span className="text-blue-600 text-sm font-semibold flex items-center">
                  View profile →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

{/* Profile Modal */}
{isModalOpen && selectedMember && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white rounded-2xl max-w-lg w-full relative overflow-hidden shadow-2xl my-8">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-700 hover:text-red-600 text-2xl font-bold z-10"
      >
        &times;
      </button>

      {/* Image Section (fit properly without cutting) */}
      <div className="w-full bg-gray-100 flex items-center justify-center">
        <img
          src={selectedMember.image}
          alt={selectedMember.name}
          className="object-contain max-h-80 w-auto"
        />
      </div>

      {/* Info Section (scrollable if long) */}
      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-blue-800 mb-2 text-center">
          {selectedMember.name}
        </h3>
        <p className="text-gray-500 mb-4 text-center">{selectedMember.title}</p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {selectedMember.details}
        </p>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Team;
