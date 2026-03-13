import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white mt-20'>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8'>
          
          {/* Logo and Description */}
          <div className='lg:col-span-2'>
            <div className='flex items-center gap-4 mb-6'>
              <img 
                className='w-16 h-16 bg-white rounded-xl p-2 shadow-lg' 
                src={logo} 
                alt="KIRCT Logo" 
              />
              <div>
                <h2 className='text-2xl font-bold text-white'>KIRCT</h2>
                <p className='text-blue-200 text-sm'>Kano Independent Research Centre Trust</p>
              </div>
            </div>
            <p className='text-blue-100 leading-relaxed text-lg'>
              Kano Independent Research Centre Trust is a non-profit multi-million dollar 
              Biomedical Research institute established by Pfizer Inc. for the Kano State Government to conduct 
              Bio-medical and Healthcare Research with focus on communicable and non-communicable diseases of 
              public Health importance in Nigeria and the African continent.
            </p>
            
            {/* Social Media Links */}
            <div className='flex gap-4 mt-6'>
              <a href="#" className='bg-blue-700 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'>
                <span className='text-white'>📘</span>
              </a>
              <a href="#" className='bg-blue-700 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'>
                <span className='text-white'>🐦</span>
              </a>
              <a href="#" className='bg-blue-700 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'>
                <span className='text-white'>📷</span>
              </a>
              <a href="#" className='bg-blue-700 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg'>
                <span className='text-white'>💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-bold mb-6 text-white border-l-4 border-blue-400 pl-3'>Quick Links</h3>
            <ul className='space-y-3'>
              <li>
                <NavLink 
                  to="/" 
                  className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform"></span>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform"></span>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/research-studies" 
                  className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform"></span>
                  Research
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/research-lab" 
                  className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform"></span>
                  Our Services
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform"></span>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className='text-xl font-bold mb-6 text-white border-l-4 border-blue-400 pl-3'>Get In Touch</h3>
            <div className='space-y-4'>
              <div className='flex items-start gap-3 group cursor-pointer'>
                <div className='bg-blue-700 p-2 rounded-lg group-hover:bg-blue-600 transition-colors duration-300'>
                  <span className='text-white text-lg'>📞</span>
                </div>
                <div>
                  <p className='text-blue-200 text-sm'>Phone Number</p>
                  <p className='text-white font-semibold group-hover:text-blue-300 transition-colors'>+234-8034459339</p>
                </div>
              </div>
              
              <div className='flex items-start gap-3 group cursor-pointer'>
                <div className='bg-blue-700 p-2 rounded-lg group-hover:bg-blue-600 transition-colors duration-300'>
                  <span className='text-white text-lg'>✉️</span>
                </div>
                <div>
                  <p className='text-blue-200 text-sm'>Email Address</p>
                  <p className='text-white font-semibold group-hover:text-blue-300 transition-colors'>info@kirct.org</p>
                </div>
              </div>
              
              <div className='flex items-start gap-3 group cursor-pointer'>
                <div className='bg-blue-700 p-2 rounded-lg group-hover:bg-blue-600 transition-colors duration-300'>
                  <span className='text-white text-lg'>📍</span>
                </div>
                <div>
                  <p className='text-blue-200 text-sm'>Location</p>
                  <p className='text-white font-semibold group-hover:text-blue-300 transition-colors'>Kano State, Nigeria</p>
                </div>
              </div>
              
              <div className='flex items-start gap-3 group cursor-pointer'>
                <div className='bg-blue-700 p-2 rounded-lg group-hover:bg-blue-600 transition-colors duration-300'>
                  <span className='text-white text-lg'>🕒</span>
                </div>
                <div>
                  <p className='text-blue-200 text-sm'>Working Hours</p>
                  <p className='text-white font-semibold group-hover:text-blue-300 transition-colors'>Mon - Fri: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

      {/* Copyright Section */}
      <div className='bg-blue-950 border-t border-blue-700'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='text-blue-200 text-sm text-center md:text-left'>
              <p>© {currentYear} Kano Independent Research Centre Trust. All rights reserved.</p>
            </div>
            
            <div className='flex gap-6 text-blue-200 text-sm'>
              <a href="#" className='hover:text-white transition-colors duration-300'>Privacy Policy</a>
              <a href="#" className='hover:text-white transition-colors duration-300'>Terms of Service</a>
              <a href="#" className='hover:text-white transition-colors duration-300'>Sitemap</a>
              <a href="#" className='hover:text-white transition-colors duration-300'>Accessibility</a>
            </div>
            
            <div className='text-blue-200 text-sm'>
              <p>Built with ❤️ for better healthcare research</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer