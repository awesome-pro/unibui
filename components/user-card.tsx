"use client";

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import Link from 'next/link';
import { Button } from './ui/button';
import { Job } from '@/app/(root)/admin/columns';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


interface JObCardProps {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    requirements: string;
}

function JobCard(
    {id, title, company, location, description, requirements}: JObCardProps
) {

    const router = useRouter();
    const [isSaved, setIsSaved] = React.useState(false);

  return (
    <Card className='px-1 rounded-md lg:max-w-[700px] mx-2 my-4'>
        <CardHeader>
           <span className='w-full flex items-center justify-between'>
                <h1 className='text-2xl font-semibold text-primary'>{title}</h1>
                <span className='text-xl font-semibold'>$50K - $100K</span>
           </span>
           <h6 className='text-gray-700'>
            {company}, 
            <span className='font-black'>{location}</span>
           </h6>
        </CardHeader>
        <CardContent>

            <h5>
                Description - {description}
            </h5>
            <h5>
                Requirements - {requirements}
            </h5>
        </CardContent>
        <CardFooter className='flex w-full items-center justify-between gap-x-5'>
                <Button variant={'ghost'} className='w-full text-primary font-semibold'
                 onClick={() => {
                    // save the job id to local storage as saved
                    setIsSaved(true);
                    const savedJobs = JSON.parse(localStorage.getItem("saved") || "[]") as Job[];
                    savedJobs.push({id, title, company, location, description, requirements});
                    localStorage.setItem("saved", JSON.stringify(savedJobs))
                    toast.success(`job ${id}, ${title} saved successfully`);
                 }}
                >
                    {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button className='w-full'
                onClick={() => {
                    router.push(`/jobs/${id}`)
                }}
                >
                    View  & Apply
                </Button>
                
        </CardFooter>
    </Card>
  )
}

export default JobCard