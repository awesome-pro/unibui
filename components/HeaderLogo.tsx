import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HeaderLogo() {
  return (
    <Link href={'/'} className='backdrop-blur-md'>
        <div className='items-center hidden  lg:flex'>
            <Image
            src={'/logo.png'}
            alt='logo'
            width={130}
            height={100}
            />
            
        </div>
    </Link>
  )
}

export default HeaderLogo