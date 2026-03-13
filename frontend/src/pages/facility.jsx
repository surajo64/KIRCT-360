import React from 'react';

const facility = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="text-center pt-10 mb-8">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-800">
                    FACILITY <span className="text-blue-800">DESCRIPTION</span><span className="text-red-600">.</span>
                </h2>
                <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
            </div>


            {/* Main Facility Overview */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-blue-100">
                <p className="text-gray-700 leading-relaxed mb-6">
                    KIRCT is a non-profit multi-million dollar Biomedical Research institute that was built by Pfizer as an international donation with the Kano State Government as custodian. The facility was initially utilized as a teaching hospital due to its huge size. However, in 2021, the Kano State Government decided to convert the facility into an independent research trust that is free from the influence of Government or other private entity.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Accordingly, a board of trustees was formed and a Founding CEO/Director (Professor Hamisu M. Salihu) was appointed following an exhaustive international search. KIRCT is located on the suburb of Kano City in northern Nigeria with a population (i.e., Kano City only) of about 4.5 million people. Kano State itself (there are 36 States in Nigeria) has a population of over 15 million people.
                </p>
            </div>

            {/* Location and Infrastructure */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Location & Infrastructure</h2>
                    <p className="text-gray-700 mb-4">
                        KIRCT is situated at the intersection of the Kano urban and Kano rural areas. KIRCT is a huge facility which is considered to be the largest standalone biomedical research institute in terms of physical size in West Africa, and as one of the largest in Africa.
                    </p>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Facility Sections:</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Suite of bungalows for facility staff</li>
                            <li>Huge lab facility for human and animal research</li>
                            <li>Hospital section</li>
                            <li>Administrative building</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Staff & Organization</h2>
                    <p className="text-gray-700 mb-4">
                        KIRCT comprises about 45 staff members with room for expansion over time, and as its expertise becomes more diverse.
                    </p>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Staff Composition:</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Research assistants</li>
                            <li>Junior and senior researchers</li>
                            <li>Medical personnel (doctors and nurses)</li>
                            <li>Seasoned administrators and financial managers</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Research Units Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Research Units</h2>

                {/* Epidemiology and Population Health Unit */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-500">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Epidemiology and Population Health Unit</h3>
                    <p className="text-gray-700 mb-4">
                        The mission of this unit is the exploration and understanding of the social ecology of disease causation with the overarching goal of control and prevention. Staff of the unit conduct periodic community-based disease assessment and surveillance within the Tamburawa community in the Dawakin Kudu local government area (population = 370,900) where the Centre is physically located.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Collaborations:</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                <li>Local government authorities</li>
                                <li>Kano CDC (Centre for Disease Control)</li>
                                <li>Kano State Tuberculosis and Leprosy Control Programme</li>
                                <li>Kano State Ministry of Health</li>
                                <li>Federal agencies (NACA, National Tuberculosis and Leprosy Control Programme)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Key Achievements:</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                <li>World's largest HIV/AIDS survey in Nigeria</li>
                                <li>Quality matrix for BIG database validation</li>
                                <li>Ongoing grant for NACA staff training in BIG DATA analytics</li>
                                <li>Critical role in COVID-19 pandemic response</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">COVID-19 Contributions:</h4>
                        <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
                            <li>Establishment of international secure informatics infrastructure (SCOR Consortium)</li>
                            <li>Invention of Pandemic Efficiency Index (PEI) for global COVID-19 mortality ranking</li>
                        </ol>
                    </div>
                </div>

                {/* Maternal and Child Health Unit */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-pink-500">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Maternal and Child Health Unit</h3>
                    <p className="text-gray-700 mb-4">
                        Kano State has one of the worst rates of maternal and child mortality in the world. The main mission of the unit is to partner with local, national and international stakeholders to promote the health and wellbeing of the mother and child, as well as prevent morbidity and mortality.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Partnerships:</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                <li>UNDP-UNFPA-UNICEF-WHO-World Bank Special Programme of Research</li>
                                <li>Center of Excellence in Population Health and Policy (ACEPHAP), Bayero University, Kano</li>
                                <li>Bill and Melinda Gates Foundation</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Initiatives:</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                <li>Training physicians and public health MCH professionals</li>
                                <li>Innovative technology for pregnant and post-partum mothers</li>
                                <li>Community-based intervention trial for maternal outcomes</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Health Metrics and Artificial Intelligence Unit */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Metrics and Artificial Intelligence Unit</h3>
                    <p className="text-gray-700 mb-4">
                        The unit staff members are comprised of computer and data scientists who undertake "BIG DATA" activities through linkage of data from across several data sources and formats including public health records, medical records, administrative data, and data from social media streams.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Key Projects:</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                <li>Design and implementation of Centre's EMR system</li>
                                <li>Integration of clinical, laboratory, and epidemiologic data</li>
                                <li>Artificial intelligence pipeline development</li>
                                <li>Federal Ministry of Health EMR adoption consideration</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Partnership:</h4>
                            <p className="text-gray-700 text-sm">
                                Partnering with the University of Health Sciences in Houston, Texas (USA) to establish a training center in Kano to build capacity in Nigeria in healthcare artificial intelligence (HAI).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quick Facts</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                        <div className="text-2xl font-bold text-blue-600">45+</div>
                        <div className="text-gray-600">Staff Members</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-blue-600">3</div>
                        <div className="text-gray-600">Research Units</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-blue-600">2021</div>
                        <div className="text-gray-600">Established as Independent Trust</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default facility;