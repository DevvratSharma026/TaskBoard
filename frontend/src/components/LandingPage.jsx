import React, { useEffect } from 'react'
import Navbar from './Navbar Components/Navbar'
import HeroSection from './Hero Components/HeroSection'
import { useNavigate } from 'react-router-dom'


const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token) {
      navigate('/dashboard');
    }
  }, [navigate])
  return (
    <div className='min-h-screen w-full flex flex-col'> {/* Changed h-screen to min-h-screen for better content handling */}
        <Navbar/>
        <HeroSection />
    </div>
  )
}

export default LandingPage