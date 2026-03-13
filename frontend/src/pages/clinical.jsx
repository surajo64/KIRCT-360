import React from "react";
import { Microscope, Activity, HeartPulse, Stethoscope, Droplet } from "lucide-react";

const Clinical = () => {
  const sections = [
    {
      title: "1. Hematology",
      icon: <Droplet className="text-blue-600 w-6 h-6" />,
      services: [
        "Blood Group",
        "Packed Cell Volume (PCV)",
        "Full Blood Count (CBC)",
        "Haemoglobin Genotype",
      ],
    },
    {
      title: "2. Chemical Pathology",
      icon: <Activity className="text-blue-600 w-6 h-6" />,
      services: [
        "Electrolyte",
        "Urea, Electrolytes & Creatinine",
        "Urea/Creatinine",
        "Uric Acid",
        "Fasting Blood Sugar",
        "Random Blood Sugar (RBS)",
        "Lipid Profile",
        "Liver Function Test (LFT)",
      ],
    },
    {
      title: "3. Microbiology / Parasitology / Immunology",
      icon: <Microscope className="text-blue-600 w-6 h-6" />,
      services: [
        "Malaria Rapid Diagnostic Test (MRDT)",
        "Malarial Parasite (MP) Microscopy",
        "Hepatitis B Surface Antigen (HBsAg)",
        "Hepatitis C Virus (HCV)",
        "High Vaginal Swab (HVS) MCS",
        "Retrovirus Screening (RVS)",
        "HIV-COMBO",
        "H. PYLORI Test",
        "Pregnancy Test (PT)",
        "Seminal Fluid Analysis",
        "Serum Alpha-Feto Protein",
        "Serum HCG",
        "Stool Analysis",
        "Stool MCS",
        "Urinalysis",
        "Urine MCS",
        "VDRL",
        "Widal Test",
        "Wound Swab MCS",
      ],
    },
    {
      title: "4. Ultrasound Scan of All Body Parts",
      icon: <Stethoscope className="text-blue-600 w-6 h-6" />,
      services: [
        "Ultrasound Guided Biopsy",
        "Doppler Ultrasound Scan",
        "Breast Ultrasound Scan",
        "Thyroid Ultrasound Scan",
        "Lesional Ultrasound Scan",
        "Transvaginal Ultrasound Scan",
        "Transrectal Ultrasound Scan",
        "Abdominal Ultrasound Scan",
        "Pelvic Ultrasound Scan",
        "Abdominopelvic Ultrasound Scan",
        "Obstetric Ultrasound Scan",
      ],
    },
    {
      title: "5. Cardiac Diagnostic Services",
      icon: <HeartPulse className="text-blue-600 w-6 h-6" />,
      services: ["ECG", "Adult Echocardiography", "Paediatric Echocardiography"],
    },
    {
      title: "6. Lung Function Test",
      icon: <Droplet className="text-blue-600 w-6 h-6" />,
      services: ["Spirometry"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
         CLINICAL DIAGNOSTIC LABORATORY <span className="text-red-600">.</span>
        </h1>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our comprehensive laboratory services are designed to provide accurate,
          reliable, and timely diagnostic results to support patient care and
          medical research.
        </p>
      </div>

      <div className="grid gap-10">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">{section.icon}</div>
              <h2 className="text-2xl font-bold text-blue-800">{section.title}</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-gray-700 text-sm">
              {section.services.map((service, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2 hover:bg-blue-100 transition"
                >
                  <span className="text-blue-600 font-semibold">•</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Clinical;
