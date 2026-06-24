import React from "react";
import crag1 from "../assets/crag1.jpg";
import crag2 from "../assets/crag2.jpg";
import crag3 from "../assets/crag3.jpg";
import crag4 from "../assets/crag4.jpg";
import crag5 from "../assets/crag5.png";

const ClimateResilience = () => {
    return (
        <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
                    CLIMATE RESILIENCE <span className="text-blue-700">ACTION GROUP (CRAG)</span>
                    <span className="text-red-600">.</span>
                </h2>
                <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
                <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                    Advancing climate resilience through research, community engagement, and strategic partnerships.
                </p>
            </div>

            {/* Hero Image Section */}
            <div className="max-w-6xl mx-auto mb-16 overflow-hidden rounded-2xl shadow-2xl transition-transform hover:scale-[1.01]">
                <img
                    src={crag1}
                    alt="Climate Resilience Activity"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
                {/* Mission */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">🎯</span>
                        Mission
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        To advance climate resilience through climate-health research, community engagement, environmental stewardship, and strategic partnerships that strengthen adaptive capacity, protect health, and promote sustainable development.
                    </p>
                </div>

                {/* Description Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">📝</span>
                            Description
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            The Climate Resilience Action Group (CRAG) is a multidisciplinary initiative of the Kano Independent Research Centre Trust (KIRCT) established to address the growing impacts of climate change on health, livelihoods, and the environment. CRAG works at the intersection of climate change, public health, research, and community development to generate evidence, promote climate literacy, strengthen community resilience, and support sustainable environmental action and climate-resilient development.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Through research, awareness campaigns, stakeholder engagement, environmental interventions, and strategic partnerships, CRAG seeks to translate climate science into practical solutions that improve health outcomes and support climate adaptation in vulnerable communities.
                        </p>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img src={crag2} alt="CRAG Session" className="w-full h-auto" />
                    </div>
                </div>

                {/* Core Areas of Interest */}
                <div className="mb-16 bg-blue-50 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Core Areas of Interest</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            "Climate and Health Research",
                            "Climate Literacy and Public Awareness",
                            "Community Resilience and Adaptation",
                            "Environmental Sustainability",
                            "Climate-Health Surveillance",
                            "Climate Innovation and Sustainable Technologies",
                            "Climate Policy, Partnerships and Advocacy"
                        ].map((area, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex items-center gap-3 hover:shadow-md transition-shadow">
                                <span className="text-blue-500 text-xl font-bold">•</span>
                                <span className="text-gray-800 font-medium">{area}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Our Activities Section */}
                <div className="mb-12">
                    <h3 className="text-3xl font-bold text-blue-900 mb-8 border-b-2 border-red-500 pb-2 inline-block">Our Activities</h3>

                    <div className="space-y-12">
                        {/* Activity 1 */}
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <h4 className="text-xl font-bold text-blue-800 mb-3">1. Public Awareness and Climate Literacy</h4>
                                <p className="text-gray-700 leading-relaxed">
                                    We educate and sensitize the public, healthcare workers, students, and community stakeholders on how climate change affects physical and mental health and the actions required to build resilience.
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-md">
                                <img src={crag3} alt="Public Awareness Activity" className="w-full h-48 object-cover" />
                            </div>
                        </div>

                        {/* Activity 2 & 3 Combined */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
                                <h4 className="text-xl font-bold text-blue-800 mb-3">2. Community Outreach and Stakeholder Engagement</h4>
                                <p className="text-gray-700">We engage communities, traditional leaders, schools, healthcare facilities, and development partners to strengthen climate resilience and promote locally driven solutions.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
                                <h4 className="text-xl font-bold text-blue-800 mb-3">3. Climate-Health Research</h4>
                                <p className="text-gray-700">Through scientific research, we investigate how extreme heat and environmental stress affect human health, including mental health, maternal health, and infectious diseases, generating evidence that informs policy and action.</p>
                            </div>
                        </div>

                        {/* Image Row for more visual interest */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <img src={crag4} alt="Classroom Discussion" className="rounded-xl shadow-lg w-full h-64 object-cover" />
                            <img src={crag5} alt="Community Presentation" className="rounded-xl shadow-lg w-full h-64 object-cover" />
                        </div>

                        {/* Activity 4 & 5 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                                <h4 className="text-xl font-bold text-green-800 mb-3">4. Environmental Action</h4>
                                <p className="text-gray-700">We support tree planting, ecosystem restoration, sustainable waste management, and other environmental initiatives that contribute to climate adaptation and mitigation.</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                                <h4 className="text-xl font-bold text-blue-800 mb-3">5. Climate Innovation and Partnerships</h4>
                                <p className="text-gray-700">We collaborate with national and international partners to develop innovative and sustainable climate solutions, including waste-to-value systems, climate-health interventions, and community resilience projects.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Quote Section */}
            <div className="text-center mt-16 py-8 border-t border-gray-200">
                <p className="text-gray-600 max-w-3xl mx-auto italic text-lg">
                    "Building climate-resilient communities for a healthier, sustainable future."
                </p>
            </div>
        </section>
    );
};

export default ClimateResilience;
