import React, { useState } from 'react';

// Direct imports - update paths as needed
import dgImage from '../assets/doc1.png'; 
import chairmanImage from '../assets/Prof.-Aliyu.png';
import hadizaImage from '../assets/prof-hadiza.png';
import hamzaImage from '../assets/hamza.png';
import ibrahimImage from '../assets/Dr-Idris-scaled.png';
import esImage from '../assets/David.png';
import hwilliamImage from '../assets/williams.png';
import ehmaImage from '../assets/ehma.png';
import idigbeImage from '../assets/idigbe.png';

const Board = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = {
    dg: dgImage,
    chairman: chairmanImage,
    hadiza: hadizaImage,
    hamza: hamzaImage,
    ibrahim: ibrahimImage,
    es: esImage,
    hwilliam: hwilliamImage,
    ehma: ehmaImage,
    idigbe: idigbeImage,
  };

  const trustees = [
    {
      id: 1,
      name: "Prof. Aliyu Abdu",
      title: "Chairman, Board of Trustees",
      credentials: "Professor of Medicine, Nephrologist, and Administrator",
      position: "Board Chairman",
      institution: "Kano Independent Research Centre Trust",
      description: "Distinguished Professor of Medicine, Nephrologist, and Administrator leading the Board of Trustees in governing KIRCT operations and strategic direction.",
      detailedDescription: " Prof Aliyu Abdu is a Professor of Medicine at Bayero University Kano, Consultant Physician and Nephrologist at Aminu Kano Teaching Kano, Provost college of Health Sciences Northwest University and Chairman Bayero University Health Research Ethics Committee. Prof Aliyu Abdu obtained his MBBS degree from the University of Jos in 1994. He was a resident doctor at different times at Aminu Kano Teaching Hospital (AKTH), Jos University Teaching Hospital, and Obafemi Awolowo University Teaching Hospital (OAUTH) Ile Ife and thereafter passed the fellowship exams of the National Postgraduate Medical College of Nigeria (NPMCN) in 2006 in internal medicine (Nephrology). This qualifies him to practice as a consultant physician and Nephrologist at AKTH.  He got a scholarship from the International Society for Peritoneal Dialysis (ISPD) in 2007 to study at the University of Witwatersrand Johannesburg from where he obtained an MSc and much later a PhD degree. He also had a Doctor of Medicine degree in 2021 from the NPMC. Additionally, he had a certificate in Project Management in Global Health from the University of Washington and a diploma in Research Ethics from the Center for Bioethics and Research, Ibadan. Prof Abdu is involved in research work, clinical services, training, administration, and community service. He is the site principal investigator (PI) for many international collaborative researches funded through NIH grants such as the multi-center studies under the H3Africa Kidney Disease Research Consortium, and is a co-investigator in research collaborations with Vanderbilt University Institute for Global Health (VIGH) such as the R3 Study, the VRAMP and VNET grants. He mentored many students and resident doctors and successfully supervised 15 residents who are now consultants practicing in different parts of the world. He also mentored awardees of the International Society of Nephrology (ISN) fellowship and the Vanderbilt-Emory-Cornell-Duke (VECD) Global Health Fellowship under the Fogarty International Center. He was a former head of the department of Medicine BUK and AKTH, former deputy Dean of the faculty of clinical sciences, and later deputy provost of the College of Health Sciences BUK and later Provost of college of Health Sciences North West University. He was a member of the governing board and various committees of many national and international government and nongovernmental organizations in health and higher education. He served as a technical resource person at various times during accreditation exercises of both postgraduate and undergraduate programs for the NUC , MDCN and NPMCN. He is a reviewer to many national and international academic journals as well as an assessor to many universities for professorial assessments. He has been honored and awarded by; Fellow of the Royal College of Physicians London  sept 2022, Fellow Academy of Medical Sciences of Nigeria July 2021 , Awarded ISPD fellowship grant to study at the University of Witwatersrand  2007, Aminu Kano Teaching Hospital Merit Award winner 2001 Nigerian Association of Nephrology/Jansen Cilag Best Renal Resident Doctor in Nigeria 2002 Key Opinion Leader in Kidney Transplantation in Africa award by the The Transplantation Society (TTS), November 2007",      
      image: images.chairman,
      role: "Chairman"
    },
    {
      id: 2,
      name: "Dr. Ibrahim Musa Idris",
      title: "Board Member",
      credentials: "",
      position: "Board Member",
      institution: "Kano Independent Research Centre Trust",
      description: "Member of the Board of Trustees contributing to the governance and strategic oversight of KIRCT.",
      detailedDescription: " Dr Idris is a Consultant Haematologist, Special Adviser to Kano State Governor on Health Services, and Personal Physician. Dr. Idris leads a multidisciplinary team of highly recognized and motivated investigators in several investigator-initiated and industry-sponsored clinical research. He is board-certified in Hematology and Transfusion Medicine by the National Postgraduate Medical College of Nigeria. He completed his residency and fellowship training in 2016, and is currently serving as a Consultant Special Grade I at Aminu Kano Teaching Hospital. He earned MBBS from Bayero University Kano (2006) and a Master's degree in Epidemiology (2016) from Texas A&M University, College Station, TX, United States. He is completing a Master's in Clinical Research at the Medical University of South Carolina. His career trajectory is focused on understanding the clinical epidemiology and treatment strategies of sickle cell disease (SCD)-related neurological injuries (silent cerebral infarcts and strokes), recurrent ischemic priapism, and sexual dysfunctions. He is the Principal Investigator of Stroke Prevention in the Young Adults with Sickle Cell Anemia (SPIYA II) cohort, Priapism in Nigeria (PIN) Trial, and Sickle Cell Ostenecrosis (SICKLON) prospective cohort study. His work on priapism and stroke fetched him three prestigious fellowships (1. VECD-Fogarty Global Health Fellowship, 2. American Society of Hematology [ASH] Clinical Research Training Institute Fellowship, and TALENTS Fellowship). He is also one of the 12 faculty members in the field of Hematology across the world awarded with the ASH Global Research Award in 2021.",
      image: images.ibrahim,
      role: "Trustee"
    },
    {
      id: 3,
      name: "Prof. Emmanuel Oni Idigbe",
      title: "Board Member",
      credentials: "",
      position: "Board Member",
      institution: "Kano Independent Research Centre Trust",
      description: "Member of the Board of Trustees providing expertise and guidance for the Centre's research initiatives.",
      detailedDescription: "Professor Emmanuel Oni Idigbe, a Nigerian, is a Medical Microbiologist with over 40 years' experience in Public Health Research and Administration. He obtained a B.Sc. (2nd Class Upper Division in Microbiology) from the University of Nigeria, Nsukka in 1974 and a Ph.D. from the University of Glasgow, Scotland in 1979.  He joined the services of the Nigerian Institute of Medical Research (NIMR), Lagos in 1980 as a Research Fellow II and after several years of active and dedicated service, he rose through the professional/academic ranks to become the Director-General /CEO of the Institute in 2000, a position he held for 2 tenures between 2000-2008. In 2010, he was appointed Adjunct Professor of Medical Microbiology at the Institute of Global Health, Feinberg School of Medicine, Northwestern University Chicago, USA. On completion of his tenure as Director-General, he served as the Coordinator of Research Planning and Management in the Institute from 2008 to 2017 when he finally disengaged from the services of the Institute. On final disengagement in 2017, he was appointed the CEO of Human Development and Public Health Initiative (HUDPHI), a health-based NGO in Nigeria, focused on health systems strengthening and community health services. In addition, Professor Idigbe is currently engaged as a Consultant to the Africa Center for Disease Control and Prevention (Africa CDC) on strengthening National Public Health Institutes in the East African Member States as well as with the African Society for Laboratory Medicine (ASLM) on Surveillance for Antimicrobial Resistance in 14 Member States of the African Region. Over his 40 years of research and academic pursuits, Professor Idigbe acquired adequate hands-on experience in management and administration, directing and coordinating public health research as well as conducting workforce development programs; health systems strengthening and establishment of strategic partnerships at the national and international levels. He also has ample experience working with funding agencies, governmental and non-governmental organizations at these various levels.",
      image: images.idigbe,
      role: "Trustee"
    },
    {
      id: 4,
      name: "Prof. Hadiza Saídu",
      title: "Board Member",
      credentials: "",
      position: "Board Member",
      institution: "Kano Independent Research Centre Trust",
      description: "Member of the Board of Trustees overseeing the Centre's operations and research programs.",
      detailedDescription: "Prof Sa'idu is a professor of medicine, consultant cardiologist at Bayero University Kano/Murtala Muhammad Specialist Hospital, Chief Medical Director of Muhammad Abdullahi Wase Specialist Hospital, a researcher and a women's health advocate. She is a member Nigerian Cardiac Society, the European Society of Cardiologists, the Medical Women Association of NIGERIA, NIGERIA Medical Association. She earned her MBBS from the University of Maiduguri in 2001 and completed her residency program and fellowship training in 2011. She has published over 50 articles in international medical journals and presented at more than 20 international conferences, including the World Congress of Cardiology and the European Society of Cardiology Congress. She's also a co-author of two book chapters on cardiovascular health in developing countries. Prof Saidu is a profound leader who has led a team of over a hundred female medical professionals in community health initiatives. She is an advocate for policies to improve women's health and gender equity in healthcare and has secured funding and partnerships for association projects. She has been awarded and recognized by different bodies.",
      image: images.hadiza,
      role: "Trustee"
    },
    {
      id: 5,
      name: "Prof. Muhammad Hamza",
      title: "Board Member",
      credentials: "",
      position: "Board Member",
      institution: "Kano Independent Research Centre Trust",
      description: "Member of the Board of Trustees contributing to the strategic direction and governance of KIRCT.",
      detailedDescription: "Prof Hamza is a Professor of Medicine, Consultant Physician (Infectious Diseases), Director Centre for Infectious Diseases Research (CIDR), BUK, Kano. He obtained MBBS at Ahmadu Bello University Zaria, in 2002, and completed his residency program and fellowship training in 2011. He is a researcher with an interest in Malaria, Tuberculosis, Human Immunodeficiency Virus, Snakebite, and Neglected Tropical Diseases. He has served as the Adult ART focal person and Chairman HIV Quality of Care Committee for Aminu Kano Teaching Hospital for over 10 years.  He participated in hospital and community-based studies and provided technical assistance for the Planning, Training, Implementation, Supervision, Monitoring, and Evaluation of Nigeria's National Immunization program. He also participated as a co-investigator in several community-based studies including 'Effectiveness of Transfluthrin-Coated Inflammable-Fumes Insecticide-Paper (RamboTM) in the Prevention of Malaria in Kano, Nigeria' and 'Health and Sickness Among Nomadic Fulani Herders: Perception, Predisposition, Occurrence, and Prevention of Malaria, Tuberculosis (TB), Diabetes Mellitus, Hypertension and Sickle cell Disease'. Prof Hamza collaborated with his colleagues to conduct studies to determine the pathophysiology of venom-induced consumptive coagulopathy among victims of carpet viper bites in Gombe state, Nigeria and explored the prevalence of HIV-associated dementia (HAD) in Kano North West Nigeria. He also collaborates with other researchers to publish several peer-reviewed papers. He took part in caring for and managing patients with COVID-19 during the last pandemic.",
      image: images.hamza,
      role: "Trustee"
    },
    {
      id: 6,
      name: "Dr. Amha Kebede",
      title: "Board Member",
      credentials: "",
      position: "Board Member",
      institution: "Kano Independent Research Centre Trust",
      description: "Member of the Board of Trustees providing oversight and guidance for the Centre's activities.",
      detailedDescription: "Dr. Amha Kebede is a public health professional with a biomedical sciences specialization with over 25 years of experience in public health research and leadership.  He has direct experience leading the Ethiopian Public Health Institute (EPHI), coordinating and directing programs in capacity development, and establishing national, regional, and international strategic partnerships. He has published over seventy-six scientific articles in reputable international and local peer-reviewed journals. He has extensive experience working with national and international organizations, as well as funding agencies. He has served and continues to serve on the boards of numerous international and national organizations. In addition, he has served as Project Lead for the African Society for Laboratory Medicine (ASLM).  He is currently a Senior Advisor to both the Ministry of Health (MOH) and the Armauer Hansen Research Institute (AHRI) in Ethiopia.",
      image: images.ehma,
      role: "Trustee"
    },
    {
      id: 7,
      name: "Prof. Hamisu Salihu",
      title: "Director General & Chief Executive Officer",
      credentials: "MD, PhD",
      position: "Director General & CEO",
      institution: "Kano Independent Research Centre Trust",
      description: "Founding Director General and Chief Executive Officer responsible for the day-to-day management and leadership of KIRCT operations and research programs.",
      detailedDescription: "The current and founding Director-General/CEO of KIRCT is Professor Hamisu Salihu (MD, PhD) who was previously the Director at Baylor College of Medicine Centre of Excellence (COE) in the United States of America (USA). He is a Professor of Medicine & Public Health, and a US-licensed physician with strong expertise in population-based research. As of February 2025, he had published about 500 peer-reviewed articles mostly in high-impact journals. Over the decades, he has brought to his research enterprise approximately 250 million US dollars in grant funding individually or collaboratively. These include grants funded by the NIH (National Institutes of Health), the CDC (Centers for Disease Control and Prevention), AHRQ (Agency for Healthcare Research and Quality) and HRSA (Health Resources and Services Administration), just to mention a few examples. The impact of his scientific contributions and leadership in research enterprise is reflected in national and international recognition. Earlier in his career, he was described by the New York Times as one of the world's leading researchers in stillbirth (New York Times, April 1, 2008). He was featured in Time Magazine as a pioneer in the epidemiology of the male biologic clock in humans (Time, April 22, 2013).",
      image: images.dg,
      role: "CEO"
    },
    {
      id: 8,
      name: "David Odiwo",
      title: "Executive Secretary",
      credentials: "",
      position: "Executive Secretary",
      institution: "Kano Independent Research Centre Trust",
      description: "Executive Secretary managing administrative operations and supporting the Board of Trustees and management in executing their duties.",
      detailedDescription: "Principal Partner, David commenced his accounting career as an audit trainee in Anjous, Uku, Eweka and Co Chartered Accountants Benin City in 1983, he worked with S.S. Afemikhe and Co Chartered Accountants, Lagos from 1988 to 1990. Qualified as a Chartered Accountant (Institute of Chartered Accountants of Nigeria) in 1991 and joined Guinness Nigeria Plc as an Internal Auditor.He Worked with Commercial Trust bank Limited from 1992 to 1993 as an Internal Auditor and Operations Manager from 1994 to 1998 in the bank's Onitsha Branch. He also worked as a Consultant for Deo–Tseena Consulting and was General Manager Finance and Investments, Securities Trading & Investments Limited before becoming the principal partner of David Odiwo and Co (Chartered Accountants). He has over twenty years post qualification experience spanning Auditing, Consultancy, Taxation, Banking and financial services. His experience spans Auditing of Major companies as well as consulting in diverse sectors of the Nigerian economy such as value for money audits for major companies in the oil and gas industry as well as firms in the capital market. David holds an HND in accountancy from Auchi Polytechnic, Auchi. Edo state and is currently a fellow of the Institute of Chartered Accountants of Nigeria (ICAN) and an associate member of the Business Recovery and Insolvency Practitioners Association of Nigeria (BRIPAN).",
      image: images.es,
      role: "Executive Secretary"
    },
    {
      id: 9,
      name: "Professor William Ampofo, PhD",
      title: "Board Member",
      credentials: "",
      position: "Board Member",
      institution: "Kano Independent Research Centre Trust",
      description: "Professor William Kwabena Ampofo is an academician and a senior researcher affiliated with the University of Ghana and the Noguchi Memorial Institute for Medical Research, where he has made significant contributions to the fields of infectious diseases and public health.",
      detailedDescription: "Professor William Kwabena Ampofo is an academician and a senior researcher affiliated with the University of Ghana and the Noguchi Memorial Institute for Medical Research, where he has made significant contributions to the fields of infectious diseases and public health. His extensive career reflects a commitment to advancing medical research in Ghana and beyond, particularly in the areas of viral infections and epidemiology. Prof Ampofo is a dedicated researcher with a focus on molecular and serological investigations of viruses, and prevention of viral infections and antiviral therapy. He led various nationwide and international public health engagements focused on influenza, HIV and emergency operations. He has also served on WHO advisory groups for influenza including global influenza vaccine production, immunization and pandemic influenza preparedness. He is currently Head of the Virology Department at the Noguchi Memorial Institute for Medical Research (NMIMR), College of Health Sciences, University of Ghana.",
      image: images.hwilliam,
      role: "Trustee"
    }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'Chairman':
        return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white';
      case 'CEO':
        return 'bg-gradient-to-r from-green-600 to-green-700 text-white';
      case 'Executive Secretary':
        return 'bg-gradient-to-r from-purple-600 to-purple-700 text-white';
      case 'Trustee':
        return 'bg-gradient-to-r from-gray-600 to-gray-700 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getRoleBorderColor = (role) => {
    switch (role) {
      case 'Chairman':
        return 'border-l-blue-500';
      case 'CEO':
        return 'border-l-green-500';
      case 'Executive Secretary':
        return 'border-l-purple-500';
      case 'Trustee':
        return 'border-l-gray-500';
      default:
        return 'border-l-gray-400';
    }
  };

  // Fallback component for missing images with better fitting
  const ProfileImage = ({ src, alt, className, onClick }) => {
    const [imgSrc, setImgSrc] = React.useState(src);
    const [hasError, setHasError] = React.useState(false);
    
    const handleError = () => {
      if (!hasError) {
        setHasError(true);
        setImgSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9maWxlIEltYWdlPC90ZXh0Pjwvc3ZnPg==');
      }
    };

    React.useEffect(() => {
      setImgSrc(src);
      setHasError(false);
    }, [src]);

    return (
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onClick={onClick}
      />
    );
  };

  const openMemberDetail = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    document.body.style.overflow = 'unset';
  };

  const MemberCard = ({ member, isLeadership = false }) => (
    <div 
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isLeadership ? 'md:col-span-1' : ''
      }`}
      onClick={() => openMemberDetail(member)}
    >
      {/* Image Section with Better Fitting */}
      <div className={`relative overflow-hidden ${isLeadership ? 'h-80' : 'h-72'}`}>
        <ProfileImage
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onClick={() => openMemberDetail(member)}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Role Badge */}
        <div className="absolute top-4 left-4">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${getRoleColor(member.role)} shadow-lg`}>
            {member.role}
          </span>
        </div>

        {/* Name and Title */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
          <p className="text-blue-200 text-sm">{member.title}</p>
          <div className="flex items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xs bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
              Click for details →
            </span>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {member.credentials && (
          <div className="mb-3">
            <p className="text-blue-600 font-semibold text-sm">{member.credentials}</p>
          </div>
        )}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{member.description}</p>
        <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
          <span>View full profile</span>
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-8xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="text-center pt-10 mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-800">
              BOARD <span className="text-blue-800">OF TRUSTEES</span><span className="text-red-600">.</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The Government of Kano State, along with Pfizer Inc., has established a Board of Trustees consisting of seven members and one Executive Secretary to manage the operations of the Kano Independent Research Centre Trust (KIRCT).
          </p>
        </div>

        {/* Leadership Section - Chairman, CEO, and Executive Secretary */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Executive Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {trustees.filter(t => t.role === 'Chairman' || t.role === 'CEO' || t.role === 'Executive Secretary').map((leader) => (
              <MemberCard key={leader.id} member={leader} isLeadership={true} />
            ))}
          </div>
        </div>

        {/* Board Members Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Board Members</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustees.filter(t => t.role === 'Trustee').map((trustee) => (
              <MemberCard key={trustee.id} member={trustee} />
            ))}
          </div>
        </div>

        {/* Board Structure Information */}
        <div className="bg-white rounded-2xl p-8 border border-blue-200 shadow-lg mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Board Composition</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-3 h-3 bg-blue-600 rounded-full mt-1 mr-4 flex-shrink-0"></span>
                  <span className="text-lg">7 Board Members appointed by Kano State Government and Pfizer Inc.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-3 h-3 bg-blue-600 rounded-full mt-1 mr-4 flex-shrink-0"></span>
                  <span className="text-lg">1 Executive Secretary for administrative operations</span>
                </li>
                <li className="flex items-start">
                  <span className="w-3 h-3 bg-blue-600 rounded-full mt-1 mr-4 flex-shrink-0"></span>
                  <span className="text-lg">Led by distinguished Professor of Medicine and Nephrologist</span>
                </li>
                <li className="flex items-start">
                  <span className="w-3 h-3 bg-blue-600 rounded-full mt-1 mr-4 flex-shrink-0"></span>
                  <span className="text-lg">Separate executive leadership for day-to-day management</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Governance Structure</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                The Board of Trustees provides strategic oversight and governance for the Kano Independent
                Research Centre Trust, with the Director General and CEO managing daily operations and
                the Executive Secretary supporting administrative functions.
              </p>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <p className="text-gray-700 text-lg">
                  <strong className="text-blue-800">Board Leadership:</strong> Prof. Aliyu Abdu - Chairman<br />
                  <strong className="text-green-700">Management:</strong> Prof. Hamisu Salihu - Director General & CEO<br />
                  <strong className="text-purple-700">Administration:</strong> David Odiwo - Executive Secretary
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Information */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-6">Established Through Partnership</h3>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              KIRCT represents a successful collaboration between the Government of Kano State and Pfizer Inc.,
              demonstrating commitment to advancing biomedical research and healthcare in Nigeria.
            </p>
            <div className="flex justify-center items-center space-x-12 opacity-95">
              <div className="text-center">
                <div className="text-3xl font-bold">Kano State</div>
                <div className="text-lg opacity-90">Government</div>
              </div>
              <div className="text-4xl">×</div>
              <div className="text-center">
                <div className="text-3xl font-bold">Pfizer Inc.</div>
                <div className="text-lg opacity-90">Global Pharmaceutical</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Member Detail Modal with Proper Scrolling */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div 
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col lg:flex-row h-full overflow-hidden">
              {/* Fixed Sidebar - No Scroll */}
              <div className="lg:w-1/3 bg-gradient-to-b from-blue-50 to-gray-100 p-8 flex flex-col items-center justify-start lg:sticky lg:top-0 lg:h-full">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <ProfileImage
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Role Badge */}
                <div className="mt-8 text-center">
                  <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getRoleColor(selectedMember.role)} shadow-lg`}>
                    {selectedMember.role}
                  </span>
                </div>

                {/* Quick Info */}
                <div className="mt-6 text-center space-y-2">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Position</h4>
                  <p className="text-gray-700 font-medium">{selectedMember.position}</p>
                  
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-4">Institution</h4>
                  <p className="text-gray-700 font-medium">{selectedMember.institution}</p>
                </div>
              </div>

              {/* Scrollable Content Section */}
              <div className="lg:w-2/3 p-8 lg:p-12 overflow-y-auto flex-1">
                <div className={`border-l-4 ${getRoleBorderColor(selectedMember.role)} pl-6 mb-8`}>
                  <h2 className="text-4xl font-bold text-gray-800 mb-3">{selectedMember.name}</h2>
                  <p className="text-xl text-blue-600 font-semibold mb-4">{selectedMember.title}</p>
                  
                  {selectedMember.credentials && (
                    <div className="mb-6">
                      <p className="text-gray-700 font-semibold text-lg bg-blue-50 inline-block px-4 py-2 rounded-lg">
                        {selectedMember.credentials}
                      </p>
                    </div>
                  )}
                </div>

                {/* Professional Biography */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    Professional Biography
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div className="max-h-96 overflow-y-auto pr-4 custom-scrollbar">
                      <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                        {selectedMember.detailedDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Information Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Role & Responsibilities</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedMember.description}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Institutional Affiliation</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedMember.institution}</p>
                  </div>
                </div>

                {/* Contact/Additional Info Placeholder */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    For inquiries regarding {selectedMember.name}'s role at KIRCT, please contact the Executive Secretary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Board;