import React from 'react'
import HeaderLogo from './HeaderLogo'
import Navbar from './Navbar'
import { Loader2 } from 'lucide-react'
import WelcomeMsg from './WelcomeMsg'

function Header() {
  return (
   <header className='px-4 py-8 lg:px-14 pb-36 bg-cover' style={{ backgroundImage: "url('/stud.jpg')"}}>
        <div className='max-w-screen-2xl mx-auto'>
                <div className='w-full flex items-center justify-between mb-28'>
                    <div className='flex items-center lg:gap-x-16'>
                        <HeaderLogo/>
                        <Navbar/>
                    </div>
                </div>
            <WelcomeMsg/>
       </div>
   </header>
  )
}

export default Header