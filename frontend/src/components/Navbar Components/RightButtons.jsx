import React from 'react'
import { useNavigate } from 'react-router-dom'

const RightButtons = () => {
  const navigate = useNavigate();
  return (
    <div className='flex gap-4 sm:gap-10'> 
      <button
        onClick={() => navigate('/login')}
        className='rounded-md border border-transparent py-2 px-3 sm:px-4 text-center text-sm sm:text-lg transition-all  hover:bg-slate-500  active:bg-slate-700  disabled:opacity-50 '>Sign In</button> {/* Adjusted text and padding */}
      <button
        onClick={() => navigate('/signup')}
        className='bg-blue-500 text-white px-4 sm:px-6 py-1 rounded-2xl cursor-pointer hover:bg-blue-700 text-sm sm:text-lg'>Get Started</button> {/* Adjusted text and padding */}
    </div>
  )
}

export default RightButtons