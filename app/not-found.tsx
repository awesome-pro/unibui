import Image from 'next/image'
import React from 'react'

function NotFound() {
  return (
    <section className='w-screen h-screen flex flex-col items-center justify-center gap-2'>
        <Image src='/logo.png' alt='404' width={300} height={300} />
       <h1>We are sorry </h1>
       <p className='text-xs'>but</p>
       <p>This page is still in progress</p>
    </section>
  )
}

export default NotFound