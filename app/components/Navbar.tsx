import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'

function NavBar() {
  return (
    <nav className='w-full relative flex items-center justify-between max-w-4xl mx-auto px-4 py-5 '>
        <Link href="/" className='font-bold text-3xl'>
            Sport <span className='text-primary'>Blog</span>
        </Link>

        <div className='flex '>
          <div className='flex-1 border content-center justify-center flex md:w-40'>Home</div>
          <div className='flex-1 border content-center justify-center flex md:w-40'>About Us</div>
          <div className='flex-1 border content-center justify-center flex md:w-40'>Contact Us</div>
        </div>
          
        <ModeToggle/>
    </nav>
  )
}

export default NavBar