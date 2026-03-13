import React from 'react';
import { FaEye, FaBullseye, FaShieldAlt, FaLightbulb, FaUsers, FaHandshake, FaComments, FaUserTie } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
       <div className="text-center pt-10 mb-8">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-800">
                    CORPORATE <span className="text-blue-800">PROFILE</span><span className="text-red-600">.</span>
                </h2>
            </div>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>

      {/* Vision Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-8 mb-8 border border-blue-200">
        <div className="flex items-center mb-4">
          <FaEye className="text-3xl text-blue-600 mr-4" />
          <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed pl-12">
          To be a leading international hub for multi-disciplinary biomedical, clinical and population-based research across the life course.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-md p-8 mb-8 border border-green-200">
        <div className="flex items-center mb-4">
          <FaBullseye className="text-3xl text-green-600 mr-4" />
          <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed pl-12">
          To improve population health through innovation and discovery.
        </p>
      </div>

      {/* Core Values - PIETE */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Core Values – <span className="text-purple-600">"PIETE"</span></h2>
        
        <div className="grid md:grid-cols-5 gap-4">
          {/* Passion */}
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-red-600 mb-2">P</div>
            <h3 className="font-semibold text-gray-800 mb-2">Passion</h3>
            <p className="text-sm text-gray-600">Driven by commitment to improve health outcomes</p>
          </div>

          {/* Integrity */}
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-blue-600 mb-2">I</div>
            <h3 className="font-semibold text-gray-800 mb-2">Integrity</h3>
            <p className="text-sm text-gray-600">Upholding honesty and moral principles in all endeavors</p>
          </div>

          {/* Excellence */}
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-green-600 mb-2">E</div>
            <h3 className="font-semibold text-gray-800 mb-2">Excellence</h3>
            <p className="text-sm text-gray-600">Striving for the highest quality in research and service</p>
          </div>

          {/* Trust */}
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-orange-600 mb-2">T</div>
            <h3 className="font-semibold text-gray-800 mb-2">Trust</h3>
            <p className="text-sm text-gray-600">Building confidence through reliability and consistency</p>
          </div>

          {/* Ethics */}
          <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-indigo-600 mb-2">E</div>
            <h3 className="font-semibold text-gray-800 mb-2">Ethics</h3>
            <p className="text-sm text-gray-600">Adhering to the highest ethical standards in research</p>
          </div>
        </div>
      </div>

      {/* Guiding Principles */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Guiding Principles</h2>
        
        <div className="space-y-6">
          {/* Accountability and Transparency */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start mb-3">
              <FaShieldAlt className="text-2xl text-blue-600 mr-4 mt-1" />
              <h3 className="text-xl font-semibold text-gray-800">Accountability and Transparency</h3>
            </div>
            <p className="text-gray-700 leading-relaxed pl-10">
              The principle of good governance, openness and responsiveness has been integrated and imbibed in the implementation of the KIRCT and we will continue to strive to serve all Nigerian citizens in an honest, trustworthy and transparent manner.
            </p>
          </div>

          {/* Innovation */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start mb-3">
              <FaLightbulb className="text-2xl text-purple-600 mr-4 mt-1" />
              <h3 className="text-xl font-semibold text-gray-800">Innovation</h3>
            </div>
            <p className="text-gray-700 leading-relaxed pl-10">
              The knowledge economy requires that researchers start questioning the type of knowledge they are producing and the various methods they are using to create this knowledge. Our staff will apply creativity and innovation to identify novel ways of addressing emerging health challenges affecting the communities we serve. KIRCT strives to be a place of learning and discovery, where innovation is encouraged and supported.
            </p>
          </div>

          {/* Leadership */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start mb-3">
              <FaUserTie className="text-2xl text-green-600 mr-4 mt-1" />
              <h3 className="text-xl font-semibold text-gray-800">Leadership</h3>
            </div>
            <p className="text-gray-700 leading-relaxed pl-10">
              Leaders bring ideas, resources and people together. We will continue to identify shared interests and find opportunities to maximize the clinical, diagnostic, research and training environment provided by our Centre.
            </p>
          </div>

          {/* Team-based Research */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start mb-3">
              <FaUsers className="text-2xl text-orange-600 mr-4 mt-1" />
              <h3 className="text-xl font-semibold text-gray-800">Team-based Research</h3>
            </div>
            <p className="text-gray-700 leading-relaxed pl-10">
              Our staff energy, enthusiasm, and dedication are key factors in our success. We are committed to maintaining a positive, team-based research environment that optimizes the use of our skills, strengths and passion.
            </p>
          </div>

          {/* Collaboration */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start mb-3">
              <FaHandshake className="text-2xl text-red-600 mr-4 mt-1" />
              <h3 className="text-xl font-semibold text-gray-800">Collaboration</h3>
            </div>
            <p className="text-gray-700 leading-relaxed pl-10">
              KIRCT seeks opportunities to build partnerships at the community, national, and international levels. We work with our partners to advance shared values, priorities, ideas, and the use of available resources in a sustainable way.
            </p>
          </div>

          {/* Communication */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start mb-3">
              <FaComments className="text-2xl text-indigo-600 mr-4 mt-1" />
              <h3 className="text-xl font-semibold text-gray-800">Communication</h3>
            </div>
            <p className="text-gray-700 leading-relaxed pl-10">
              Better communication is one of the vital attributes of quality researchers. Research is shared to have value. We will actively continue to look for opportunities to communicate the process and outcomes of our research and to encourage others to do the same.
            </p>
          </div>

          {/* Professionalism */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start mb-3">
              <FaShieldAlt className="text-2xl text-gray-600 mr-4 mt-1" />
              <h3 className="text-xl font-semibold text-gray-800">Professionalism</h3>
            </div>
            <p className="text-gray-700 leading-relaxed pl-10">
              The Centre is committed to the highest standards across our practices and policies and to a spirit of openness, which is demonstrated by regular internal and external reviews and evaluations.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4 text-center">Our Commitment</h3>
        <p className="text-lg text-center leading-relaxed">
          KIRCT is dedicated to advancing biomedical research through our core values of <strong>PIETE</strong> and our seven guiding principles, ensuring we remain at the forefront of healthcare innovation while serving our communities with integrity and excellence.
        </p>
      </div>
    </div>
  );
};

export default Profile;