"use client";

import React, { useEffect, useState } from 'react'
import { Job } from '../../columns'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function Detail(
    {params}: { params: { id: string } }
) {

    const [job, setJob] = useState<Job | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [isApplied, setIsApplied] = useState(false);

    const fetchJob = async() => {
        const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
        const job = jobs.find((job) => job.id === params.id);
        setJob(job || null);
    }

    useEffect(() => {
        fetchJob();
    }, [params.id]);

    if(!job){
        return <div>Job not found</div>
    }

  return (
    <section className='w-full min-h-screen items-center flex flex-col'>
       <Card className='-mt-24 w-2/3  min-h-[400px] relative'>
            <CardHeader className='text-center text-3xl font-semibold'>
                {job.title}
            </CardHeader>
            <CardContent className='flex flex-col  gap-y-2'>
                <div className='text-lg w-full mx-1 rounded-md bg-primary/10 px-2 py-3 text-primary font-semibold'>
                    Pay: $50K - $100K
                </div>
                <span className='fon-semibold px-2'>
                Company - <span className='font-black cursor-pointer hover:text-gray-600'>{job.company}</span>
                </span> 
                <div className='px-2'>
                    Location - <span className='font-black'>{job.location}</span>
                </div>
                <div className='px-2'>
                    Description -   <span className='font-semibold'>{job.description}</span>
                </div>
                <div className='px-2'>
                    Requirements - <span className='font-semibold'>{job.requirements}</span>
                </div>
            </CardContent>
            <CardFooter className='absolute bottom-0 w-full'>
                <div className='flex items-center justify-between gap-x-5 w-full'>
                    <Button className='w-full' variant={'ghost'}
                    onClick={() => {
                        setIsSaved(true);
                        const savedJobs = JSON.parse(localStorage.getItem("saved") || "[]") as Job[];
                        // save the job in saved local storage only if the job is not already saved
                        if(!savedJobs.find((savedJob) => savedJob.id === job.id)){
                            savedJobs.push(job);
                            localStorage.setItem("saved", JSON.stringify(savedJobs));
                            toast.success(`job ${job.id}, ${job.title} saved successfully`);
                        }else{
                            toast.error(`job ${job.id}, ${job.title} already saved`);
                        }
                    }}
                    disabled={isSaved}
                    >
                        {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button className='w-full'
                     onClick={() => {
                        setIsApplied(true);
                        const appliedJobs = JSON.parse(localStorage.getItem("applied") || "[]") as Job[];
                        // save the job in applied local storage only if the job is not already applied
                        if(!appliedJobs.find((appliedJob) => appliedJob.id === job.id)){
                            appliedJobs.push(job);
                            localStorage.setItem("applied", JSON.stringify(appliedJobs));
                            toast.success(`job ${job.id}, ${job.title} applied successfully`);
                        }else{
                            toast.error(`job ${job.id}, ${job.title} already applied`);
                        }
                     }}
                     disabled={isApplied}
                    >
                        {isApplied ? 'Applied' : 'Apply'}
                    </Button>
                </div>
            </CardFooter>
       </Card>
    </section>
  )
}

export default Detail