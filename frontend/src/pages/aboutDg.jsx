import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import images - adjust based on your actual assets
import dgImage from '../assets/doc1.png'; // Assuming doc1 is DG's image
import logo from '../assets/logo.png';
import doc2 from '../assets/doc2.png';
import doc3 from '../assets/doc3.png';

const AboutDG = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const achievements = [
    {
      number: "500+",
      title: "Peer-Reviewed Publications",
      description: "Published in high-impact journals"
    },
    {
      number: "$250M",
      title: "Grant Funding",
      description: "Secured for research enterprise"
    },
    {
      number: "965+",
      title: "Individuals Mentored",
      description: "Across various career stages"
    },
    {
      number: "15+",
      title: "Years Leadership",
      description: "In biomedical research"
    }
  ];

  const innovations = [
    {
      title: "CHAT Technology",
      acronym: "Community Health Analytics Training",
      description: "A technology platform that facilitates delivery of programs, educational products and digital content in a simplified format using the MDI (multi-dimensional intelligence) model.",
      impact: "Enhances comprehension and accelerates attainment of capacity-building competencies."
    },
    {
      title: "CPI System",
      acronym: "Community Priority Index",
      description: "A ranking system based on a machine learning algorithm used in the administration and management of resources.",
      impact: "Published in Computational and Mathematical Methods in Medicine 2015."
    },
    {
      title: "CII Framework",
      acronym: "Collective Impact Index",
      description: "A novel instrument to evaluate and foster collaborative partnerships in public health.",
      impact: "Utility in coalition building to address public health threats."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-6xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Meet Our Director General/CEO
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                  Professor Hamisu Salihu (MD, PhD)
                </p>
                <p className="text-lg text-blue-200 mb-8">
                  Visionary Leader in Biomedical Research and Public Health Innovation
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/research"
                    className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    Explore Research
                  </Link>
                  <Link
                    to="/contact"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>

              {/* Profile Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-2 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img
                    src={dgImage}
                    alt="Professor Hamisu Salihu"
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-red-600 text-white p-4 rounded-2xl shadow-2xl">
                  <div className="text-2xl font-bold">MD, PhD</div>
                  <div className="text-sm">Director General/CEO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Leadership Profile</h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    The current and founding Director-General/CEO of KIRCT is <strong>Professor Hamisu Salihu (MD, PhD)</strong> who was previously the Director at Baylor College of Medicine Centre of Excellence (COE) in the United States of America.
                  </p>
                  <p>
                    He is a Professor of Medicine & Public Health, and a US-licensed physician with strong expertise in population-based research. As of February 2025, he had published about <strong>500 peer-reviewed articles</strong> mostly in high-impact journals.
                  </p>
                  <p>
                    Over the decades, he has brought to his research enterprise approximately <strong>250 million US dollars</strong> in grant funding individually or collaboratively. These include grants funded by the NIH, CDC, AHRQ, and HRSA.
                  </p>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-gradient-to-br from-blue-50 to-gray-100 p-6 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Career Highlights</h3>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="bg-white p-4 rounded-xl shadow-md border border-gray-100 transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="text-2xl font-bold text-blue-900">{achievement.number}</div>
                      <div className="font-semibold text-gray-900">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">National & International Recognition</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Media Features</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Featured in <strong>New York Times</strong> as one of the world's leading researchers in stillbirth (April 1, 2008)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Featured in <strong>Time Magazine</strong> as a pioneer in the epidemiology of the male biologic clock (April 22, 2013)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Leadership Roles</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Member, National Panel advising US Secretary of Health (DHHS)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Board of Directors, American College of International Medicine</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Founding Member, SCOR Consortium for global health</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Innovations & Technologies</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {innovations.map((innovation, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{innovation.title}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{innovation.acronym}</p>
                  <p className="text-gray-700 mb-4">{innovation.description}</p>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">{innovation.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Transformative Leadership at KIRCT</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6 text-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">First Indigenous EMR System</h4>
                      <p>Pioneered the first Electronic Medical Record system in Kano State, now deployed across multiple facilities.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">State-of-the-Art Facilities</h4>
                      <p>Established hospital and laboratory complex for Genomics, AMR research, and clinical trials.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Cutting-Edge Biorepository</h4>
                      <p>Creating advanced biorepository for future research and vaccine development.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                <blockquote className="text-xl italic text-blue-100 leading-relaxed">
                  "My vision is to make KIRCT one of the top high-performing health research centers in the world in the area of innovation, discovery, entrepreneurship, and impact. This is possible given the talent, assets, and social capital available at KIRCT."
                </blockquote>
                <div className="mt-6 text-white font-semibold">
                  — Professor Hamisu Salihu
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Learn More About Our Work</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover how Professor Salihu's leadership is driving innovation and excellence in biomedical research at KIRCT.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/research"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Our Research Programs
              </Link>
              <Link
                to="/contact"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Contact Leadership
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutDG;