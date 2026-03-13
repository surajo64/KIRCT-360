import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4 px-6 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">

        {/* Left Side: Logo & Text */}
        <div className="flex items-center gap-3">
        <h1 onClick={() => navigate('/')} className="text-2xl font-bold text-white cursor-pointer">KIRCT</h1>
        </div>

        <div>
          <p className="text-l font-medium items-center">© 2025 KIRCT LMS. All rights reserved.</p>
        </div>
        {/* Right Side: Social Icons */}
        <div className="flex items-center gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.facebook_icon} alt="Facebook"  className="h-8 w-8 hover:scale-110 transition filter invert" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.instagram_icon} alt="Instagram"   className="h-8 w-8 hover:scale-110 transition filter invert" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.twitter_icon} alt="Twitter"   className="h-8 w-8 hover:scale-110 transition filter invert" />
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer
