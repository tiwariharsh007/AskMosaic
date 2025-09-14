import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'
import HERO_IMG from '../../assets/hero-img.jpg'

const Navbar = () => {
  return (
    <div className='w-full h-16 bg-white border-b border-gray-200/50 backdrop-blur-[2px] sticky top-0 z-30'>
      <div className='flex items-center justify-between px-6 md:px-10 h-full'>
        
        <Link to="/dashboard" className="flex items-center gap-2">
          <img
            src={HERO_IMG}
            alt="AskMosaic Logo"
            className="w-10 h-10 object-contain"
          />
          <h2 className='text-lg md:text-xl font-medium text-black leading-5'>
            AskMosaic
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  )
}

export default Navbar;
