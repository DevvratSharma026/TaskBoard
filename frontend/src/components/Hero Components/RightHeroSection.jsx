import React from 'react'
import image from '../../assests/rightHeroSectionImage.png'

const RightHeroSection = () => {
  return (
    <div className='w-full md:w-[50%] h-full flex justify-center'> 
        <img className='rounded-xl shadow-xl shadow-purple-600/80 w-full sm:w-3/4 md:w-full max-w-lg md:max-w-none' src={image}/> 
    </div>
  )
}

export default RightHeroSection