import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* About Us Section */}
      <section className="w-full bg-white py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-wide text-blue-800">
              ABOUT <span className="text-blue-800">US</span>
              <span className="text-red-600">.</span>
            </h2>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-700 leading-relaxed text-lg">
            {/* Left Column */}
            <div>
              <p className="mb-6">
                Kano Independent Research Centre Trust is a non-profit
                multi-million dollar Biomedical Research institute established by
                Pfizer Inc. for the Kano State Government to conduct Biomedical
                (and Healthcare) Research with focus on communicable and
                non-communicable diseases of public health importance in Nigeria
                and the African continent.
              </p>
              <button
                onClick={() => navigate("/research-lab")}
                className="relative inline-block px-8 py-3 font-semibold text-white text-sm lg:text-base bg-red-600 hover:bg-red-700 transition-all duration-300 [clip-path:polygon(0_0,calc(100%-15px)_0,100%_50%,calc(100%-15px)_100%,0_100%,0_0)] rounded-l-full"
              >
                OUR SERVICES
              </button>
            </div>

            {/* Right Column */}
            <div>
              <p className="mb-6">
                Donors of the project and pharmaceutical giant, Pfizer, built the
                facility to function as both a primary health facility as well as
                a complementary tertiary health facility to the already existing
                health institutions in Kano State. The Centre is administered by a
                board of seven members appointed by Pfizer Inc. and the Kano State
                Government. The board is led by a distinguished Professor of
                Medicine, a Nephrologist, and an Administrator, Prof Aliyu Abdu.
              </p>
              <button
                onClick={() => navigate("/board")}
                className="relative inline-block px-8 py-3 font-semibold text-white text-sm lg:text-base bg-red-600 hover:bg-red-700 transition-all duration-300 [clip-path:polygon(0_0,calc(100%-15px)_0,100%_50%,calc(100%-15px)_100%,0_100%,0_0)] rounded-l-full"
              >
                BOARD OF TRUSTEES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Research Areas Section */}
      <section className="py-16 lg:py-20 bg-blue-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-200/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200/15 rounded-full blur-lg animate-pulse delay-500"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Section Header */}
            <div className="text-center mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-100 mb-6">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Research Excellence</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Cutting-Edge <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Research Areas</span>
              </h2>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              </div>

              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Pioneering biomedical research across multiple disciplines to address Africa's most pressing health challenges through innovation and collaboration.
              </p>
            </div>

            {/* Enhanced Research Areas Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  title: "Epidemiology & Population Health",
                  description:
                    "Studying disease patterns and population health dynamics through advanced statistical modeling and field research.",
                  icon: "📊",
                  gradient: "from-blue-500 to-blue-600",
                  bgGradient: "from-blue-50 via-white to-blue-100/50",
                  delay: 0,
                  path: "/epidemiology",
                },
                {
                  title: "Genomics Research",
                  description:
                    "Advanced genetic research for disease understanding using state-of-the-art sequencing technologies.",
                  icon: "🧬",
                  gradient: "from-purple-500 to-purple-600",
                  bgGradient: "from-purple-50 via-white to-purple-100/50",
                  delay: 100,
                  path: "/genomics",
                },
                {
                  title: "Microbiology & Infectious Diseases",
                  description:
                    "Combating infectious diseases through cutting-edge microbial research and pathogen analysis.",
                  icon: "🔬",
                  gradient: "from-green-500 to-green-600",
                  bgGradient: "from-green-50 via-white to-green-100/50",
                  delay: 200,
                  path: "/microbiology",
                },
                {
                  title: "Health Metrics & AI",
                  description:
                    "Leveraging artificial intelligence for advanced health data analysis and predictive modeling.",
                  icon: "🤖",
                  gradient: "from-orange-500 to-orange-600",
                  bgGradient: "from-orange-50 via-white to-orange-100/50",
                  delay: 300,
                  path: "/health-metrics",
                },
                {
                  title: "Vaccine Research",
                  description:
                    "Developing and testing innovative vaccines for prevalent and emerging infectious diseases.",
                  icon: "💉",
                  gradient: "from-red-500 to-red-600",
                  bgGradient: "from-red-50 via-white to-red-100/50",
                  delay: 400,
                  path: "/vaccine-research",
                },
                {
                  title: "Maternal & Child Health",
                  description:
                    "Improving health outcomes for mothers and children through comprehensive care and research.",
                  icon: "👶",
                  gradient: "from-pink-500 to-pink-600",
                  bgGradient: "from-pink-50 via-white to-pink-100/50",
                  delay: 500,
                  path: "/maternal-child",
                },
                {
                  title: "TB Research Unit",
                  description:
                    "Specialized research on tuberculosis prevention, treatment, and drug resistance mechanisms.",
                  icon: "🫁",
                  gradient: "from-teal-500 to-teal-600",
                  bgGradient: "from-teal-50 via-white to-teal-100/50",
                  delay: 600,
                  path: "/tb-unit",
                },
                {
                  title: "Clinical Diagnostics",
                  description:
                    "Advanced diagnostic methods and laboratory services for accurate disease detection.",
                  icon: "🏥",
                  gradient: "from-indigo-500 to-indigo-600",
                  bgGradient: "from-indigo-50 via-white to-indigo-100/50",
                  delay: 700,
                  path: "/clinical-lab",
                },
              ].map((area, index) => (
                <div
                  key={index}
                  onClick={() => navigate(area.path)}
                  className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2"
                  style={{
                    animationDelay: `${area.delay}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Main Card */}
                  <div className={`relative bg-gradient-to-br ${area.bgGradient} p-6 lg:p-8 rounded-3xl border border-gray-200/50 backdrop-blur-sm h-full flex flex-col transition-all duration-500 group-hover:scale-105 group-hover:border-gray-300/70`}>

                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    </div>

                    {/* Icon Container */}
                    <div className={`relative z-10 inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mb-6 rounded-2xl bg-gradient-to-br ${area.gradient} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out`}>
                      <span className="text-2xl lg:text-3xl">{area.icon}</span>

                      {/* Icon Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out delay-200"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight group-hover:text-gray-800 transition-colors duration-300">
                        {area.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed flex-1 text-sm lg:text-base group-hover:text-gray-700 transition-colors duration-300">
                        {area.description}
                      </p>

                      {/* Animated Read More Link */}
                      <div className="mt-4 lg:mt-6 pt-4 border-t border-gray-200/50 group-hover:border-gray-300/70 transition-colors duration-300">
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 group-hover:text-gray-700 transition-colors duration-300 group/link">
                          <span>Explore Research</span>
                          <svg
                            className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl ${area.gradient} rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${area.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                    <div className="absolute inset-[2px] rounded-3xl bg-white"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16 lg:mt-20">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-200/50 max-w-4xl mx-auto">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Collaborate on Groundbreaking Research?
                </h3>
                <p className="text-gray-600 text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                  Join us in our mission to advance healthcare through innovative research and strategic partnerships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => navigate("/contact")} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Start Collaboration
                  </button>
                  <button onClick={() => navigate("/publications")} className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Publications
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add custom animations */}
        <style jsx>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Clinical Diagnostic Laboratory</h3>
                <p className="text-gray-600 mb-4">
                  State-of-the-art diagnostic services supporting healthcare providers and
                  research initiatives with accurate and timely results.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Comprehensive blood tests and analysis</li>
                  <li>• Molecular diagnostics</li>
                  <li>• Microbiology testing</li>
                  <li>• Pathology services</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Central Research Laboratory</h3>
                <p className="text-gray-600 mb-4">
                  Advanced research facilities equipped with cutting-edge technology to
                  support groundbreaking biomedical research.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Genomic sequencing</li>
                  <li>• Cell culture facilities</li>
                  <li>• Advanced microscopy</li>
                  <li>• Data analysis support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborations Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Collaborations</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Building strong partnerships for global health impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">International Partnerships</h3>
                <p className="text-gray-600">
                  Collaborating with global research institutions, universities, and
                  international health organizations to advance biomedical research.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">National Collaborations</h3>
                <p className="text-gray-600">
                  Working with Nigerian universities, government agencies, and healthcare
                  institutions to address local health challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-200">Research Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-blue-200">Publications</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">20+</div>
                <div className="text-blue-200">Collaborations</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Join Us in Advancing Healthcare Research
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a researcher, collaborator, or interested in our work,
              we invite you to be part of our mission to improve health outcomes in Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </Link>
              <Link
                to="/job-vacancy"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Career Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home