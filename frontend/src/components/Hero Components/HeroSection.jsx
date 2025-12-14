import React from 'react'
import LeftHeroSection from './LeftHeroSection'
import RightHeroSection from './RightHeroSection'

const HeroSection = () => {
  return (
    <div className='flex flex-col md:flex-row h-full w-full p-4 mt-5 relative leading-tight items-center md:items-start'> {/* Added flex-col (default) and md:flex-row. Centered items for mobile. */}
        {/* hero section has 2 pieces left and right.
        left one will be having some text and right one will be having a note image */}
        <LeftHeroSection />
        <RightHeroSection />
    </div>
  )
}

export default HeroSection