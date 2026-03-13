import React from "react";

const Gallery = () => {
  // Temporary demo images (you can replace with your own later)
  const images = [
    "https://images.unsplash.com/photo-1581091012184-7f89a6b8b0b9?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1576765607924-b59dbb418c70?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1601049676908-44f3263c9a49?auto=format&fit=crop&w=800&q=60",
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          OUR <span className="text-blue-700">GALLERY</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Explore moments from our research, collaborations, and community
          engagements at Kano Independent Research Centre Trust.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-8xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">KIRCT Event</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-center mt-16">
        <p className="text-gray-600">
          📸 More images and media coming soon — stay tuned!
        </p>
      </div>
    </section>
  );
};

export default Gallery;
