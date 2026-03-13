import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import your images - adjust based on your actual assets
import doc1 from '../assets/doc1.png';
import doc2 from '../assets/doc2.png';
import doc3 from '../assets/doc3.png';
import doc4 from '../assets/doc4.png';
import doc5 from '../assets/doc5.png';

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Slide data matching your WordPress content exactly
  const slides = [
    {
      id: 1,
      image: doc1,
      title: "Meet Our Director General/CEO",
      content: "The current and founding Director-General/CEO of KIRCT is Professor Hamisu Salihu (MD, PhD) who was previously the Director at Baylor College of Medicine Centre of Excellence (COE) in the United States of America (USA).",
      buttonText: "READ MORE",
      link: "/about-dg"
    },
    {
      id: 2,
      image: doc2,
      title: "Unrivalled Excellence in Genomic Science",
      content: "At KIRCT, we have the largest, most sophisticated, and state-of-the-art genomic laboratory in Northern Nigeria, equipped with ultramodern sequencing technology.",
      buttonText: "READ MORE",
      link: "/genomics"
    },
    {
      id: 3,
      image: doc3,
      title: "AMR LABORATORY",
      content: "The AMR Laboratory at Kano Independent Research Centre Trust (KIRCT) is a dedicated reference laboratory at the forefront of research on antimicrobial resistance.",
      buttonText: "READ MORE",
      link: "/microbiology"
    },
    {
      id: 4,
      image: doc4,
      title: "BSL-3 LABORATORY",
      content: "The BSL-3 lab at Kano Independent Research Centre Trust (KIRCT) is committed to addressing epidemics in Nigeria through innovative research and prevention strategies.",
      buttonText: "READ MORE",
      link: "/tb-unit"
    },
    {
      id: 5,
      image: doc5,
      title: "Research & Innovation Hub",
      content: "Our state-of-the-art research facilities support groundbreaking discoveries across multiple disciplines with cutting-edge technology.",
      buttonText: "READ MORE",
      link: "/research-studies"
    }
  ];

  // Enhanced auto-slide functionality with animation control
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Enhanced manual slide navigation
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Main Slider Container */}
      <div className="relative">
        {/* Slides */}
        <div className="relative h-[500px] lg:h-[580px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0 scale-100'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full scale-95'
                  : 'opacity-0 translate-x-full scale-95'
              } ${isAnimating ? 'transition-all duration-500 ease-out' : ''}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Image Side - Left with Premium Animations */}
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 overflow-hidden shadow-2xl group/image-container">
                  <div className="relative h-full w-full overflow-hidden">
                    {/* Main Image with Enhanced Effects */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
                        index === currentSlide 
                          ? 'scale-100 group-hover/image-container:scale-105' 
                          : 'scale-110'
                      }`}
                      loading="lazy"
                    />
                    
                    {/* Multi-layer Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover/image-container:opacity-80 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/15 via-blue-600/10 to-transparent lg:from-blue-900/10 lg:via-blue-700/5 lg:to-transparent"></div>
                    
                    {/* Animated Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/image-container:translate-x-full transition-transform duration-1500 ease-in-out delay-300"></div>
                  </div>
                  
                  {/* Enhanced Slide Number Badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-blue-800 text-white w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center font-bold text-sm sm:text-base lg:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-white/20">
                    <span className="drop-shadow-sm">{index + 1}</span>
                  </div>

                  {/* Enhanced Image Caption with Animation */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-3">
                      {/* Main Caption */}
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-black/70 to-black/50 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-xl backdrop-blur-md border border-white/20 transition-all duration-500 group-hover/image-container:translate-y-[-2px] group-hover/image-container:shadow-2xl group-hover/image-container:from-black/80 group-hover/image-container:to-black/60">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white/90 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          />
                        </svg>
                        <span className="whitespace-nowrap truncate">Research Excellence</span>
                      </div>

                      {/* Secondary Badge - Hidden on mobile */}
                      <div className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-green-600/90 to-emerald-600/90 text-white text-xs font-medium px-3 py-2 rounded-xl shadow-lg backdrop-blur-md border border-white/20 transition-all duration-500 group-hover/image-container:translate-y-[-1px] opacity-0 group-hover/image-container:opacity-100 transform translate-y-2 group-hover/image-container:translate-y-0">
                        <svg
                          className="w-3 h-3 text-white/90"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Innovation
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay with Quick Actions */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/30 to-blue-900/50 opacity-0 group-hover/image-container:opacity-100 transition-all duration-500 ease-out flex items-center justify-center pointer-events-none">
                    <div className="text-white text-center transform translate-y-6 group-hover/image-container:translate-y-0 opacity-0 group-hover/image-container:opacity-100 transition-all duration-400 delay-150 ease-out">
                      <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-3 mx-4 border border-white/10 shadow-2xl">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-white/80"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                          />
                        </svg>
                        <p className="text-xs sm:text-sm font-medium">View Details</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Side - Right with enhanced design */}
                <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white p-6 lg:p-8 flex items-center relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white animate-pulse"></div>
                  </div>

                  <div className="relative z-10 max-w-2xl mx-auto w-full">
                    {/* Enhanced Title with animated bars */}
                    <div className="mb-4 lg:mb-6">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight transform hover:scale-105 transition-transform duration-300">
                        <span className="text-red-400 animate-pulse">│</span>{' '}
                        <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                          {slide.title}
                        </span>{' '}
                        <span className="text-red-400 animate-pulse">│</span>
                      </h2>
                    </div>

                    {/* Enhanced Content with fade-in animation */}
                    <div className="mb-6 lg:mb-8">
                      <p className="text-base md:text-lg text-blue-100 leading-relaxed line-clamp-3 lg:line-clamp-4">
                        {slide.content}
                      </p>
                    </div>

                    {/* Enhanced Read More Button */}
                    <div className="transform hover:translate-x-2 transition-transform duration-300">
                      <Link
  to={slide.link}
  className="relative inline-block px-8 py-3 font-semibold text-white text-sm lg:text-base bg-red-600 hover:bg-red-700 transition-all duration-300 [clip-path:polygon(0_0,calc(100%-15px)_0,100%_50%,calc(100%-15px)_100%,0_100%,0_0)] rounded-l-full"
>
  <span className="tracking-wide">{slide.buttonText}</span>
  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">{'>'}</span>
</Link>

                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-red-600/10 rounded-tl-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 lg:p-4 rounded-full transition-all duration-300 shadow-2xl hover:scale-110 hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 lg:p-4 rounded-full transition-all duration-300 shadow-2xl hover:scale-110 hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 lg:gap-3 backdrop-blur-sm bg-white/20 rounded-full px-3 py-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 transform hover:scale-150 ${
                index === currentSlide 
                  ? 'bg-red-600 scale-125 shadow-lg' 
                  : 'bg-white/70 hover:bg-white/90'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Enhanced Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200/50 z-20 backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-5000 ease-out rounded-r-full"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)'
            }}
            key={currentSlide}
          />
        </div>
      </div>

      {/* Add custom styles for line clamp */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Header;