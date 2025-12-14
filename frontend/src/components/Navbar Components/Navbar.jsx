import React from 'react'
import Logo from './Logo'
import RightButtons from './RightButtons'

const Navbar = () => {
  return (
    <div className='flex justify-between p-4 md:px-12 lg:px-28 items-baseline'> 
        <Logo />
        <RightButtons />
    </div>
  )
}

export default Navbar