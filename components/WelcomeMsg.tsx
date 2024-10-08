"use client";

import React from 'react'

function WelcomeMsg() {

  return (
    <div className='space-y-2 mb-4 backdrop-blur-md w-fit p-2'>
        <h2 className='text-2xl lg:text-4xl text-white font-semibold'>
            Welcome to Unibui Dashboard
        </h2>
        <p className='text-sm lg:text-base text-white'>
            This is your Financial Overview Report
        </p>
    </div>
  )
}

export default WelcomeMsg