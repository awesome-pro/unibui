import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <section className='w-screen h-full flex flex-col items-center  min-h-[400px] bg-primary/10'>

        <h1 className='text-4xl font-bold text-center text-primary/90 w-full mt-20'>Find your Dream Job with Unibui</h1>
        <p>By <Link href={'https://www.linkedin.com/in/abhinandan-verma/'} target='_blank' className='hover:text-black/50'>Abhinandan</Link></p>
        <div className='flex items-center justify-center gap-12 mt-20'>
            <Link href='/admin'>
                <Button className='w-32' size='lg'>Admin Page</Button>
            </Link>
            <Link href='/jobs'>
                <Button className='hover:bg-primary/20' size='lg' variant={'ghost'}>Jobs Page</Button>
            </Link>
        </div>
    </section>
  )
}

export default Home