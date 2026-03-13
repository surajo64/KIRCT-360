import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import LoadingOverlay from "../components/loadingOverlay.jsx";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* ──────────────────────────────────────────
   Image Carousel used inside the detail modal
────────────────────────────────────────── */
const ImageCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

  // Reset index when a new news item is opened
  useEffect(() => { setCurrent(0); }, [images]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt="news"
        className="w-full h-64 md:h-80 object-cover rounded-xl mb-6"
      />
    );
  }

  return (
    <div className="relative mb-6 rounded-xl overflow-hidden select-none">
      {/* Main image */}
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-64 md:h-80 object-cover"
      />

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
      >
        <ChevronRight size={22} />
      </button>

      {/* Counter badge */}
      <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
        {current + 1} / {images.length}
      </span>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/50"}`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 p-3 bg-black/30 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === current ? "border-white scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────
   Main News page
────────────────────────────────────────── */
const News = () => {
  const { backendUrl } = useContext(AppContext);
  const [newsList, setNewsList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/getNews`);
        setNewsList(data.news.filter(n => n.status)); // only active
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [backendUrl]);

  // Helper: get the array of images with legacy fallback
  const getImages = (item) => {
    if (item.images && item.images.length) return item.images;
    if (item.image) return [item.image];
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6">
      {isLoading && <LoadingOverlay />}

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-blue-900">
          KIRCT <span className="text-blue-700">NEWS</span> <span className="text-red-600">.</span>
        </h2>
        <div className="w-20 h-1 bg-red-600 mx-auto mt-3 mb-5 rounded-full"></div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest research highlights, collaborations, and
          innovations from the Kano Independent Research Centre Trust.
        </p>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsList.map((item) => {
          const images = getImages(item);
          const cover = images[0] || "";
          const extraCount = images.length - 1;

          return (
            <div
              key={item._id}
              onClick={() => setSelected(item)}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:scale-[1.02] cursor-pointer transition duration-300"
            >
              {/* Cover image with multi-image badge */}
              <div className="relative">
                <img
                  src={cover}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
                {extraCount > 0 && (
                  <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    +{extraCount} photo{extraCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-400 mb-2">{item.date}</p>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.summary}</p>
                <p className="text-blue-600 mt-4 font-semibold text-sm">
                  Read More →
                </p>
              </div>
            </div>
          );
        })}

        {!isLoading && newsList.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-16 text-lg">No news published yet. Check back soon!</p>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center px-4 z-50 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full p-1.5 transition-colors shadow"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-8">
              {/* Image gallery / carousel */}
              <ImageCarousel images={getImages(selected)} />

              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                {selected.title}
              </h2>
              <p className="text-gray-400 text-sm mb-5">{selected.date}</p>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {selected.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
