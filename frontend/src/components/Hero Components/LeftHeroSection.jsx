import React from 'react'
import { useNavigate } from 'react-router-dom'

const LeftHeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full md:w-[50%] h-full relative mb-10 md:mb-0'> {/* Full width on mobile, 50% on medium screens and up. Added bottom margin for spacing. */}
      <p className='text-4xl sm:text-5xl md:text-5xl lg:text-[5.5rem] font-bold text-center md:text-left'> {/* Adjusted text size for responsiveness */}
        Organize Your Work. <span className='text-purple-300'>Finish Faster.</span>
      </p>
      <p className='text-lg sm:text-xl md:text-2xl w-full md:w-[75%] mt-2 text-gray-300 text-center md:text-left mx-auto md:mx-0'> {/* Adjusted text size, set to full width on mobile, centered text and applied auto margins. */}
        The modern task management platform that helps teams move faster. Plan, track, and deliver projects with unprecedented clarity.
      </p>
      <div className='flex justify-center md:justify-start'> {/* Wrapper to center the button on mobile */}
        <button
          onClick={() => navigate('/signup')}
          className="relative z-0 h-12 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500 px-12 sm:px-20 py-1 bg-blue-600 rounded-2xl w-3/4 sm:w-2/3 md:w-3/4 lg:w-[50%] text-lg md:text-xl mt-8 md:mt-12"> {/* Adjusted button size for mobile */}
          Get started
        </button>
      </div>
    </div>
  )
}

export default LeftHeroSection