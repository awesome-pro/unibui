"use client";

import React, { useCallback, useEffect } from 'react'
import { Job } from '../admin/columns';
import JobCard from '@/components/user-card';

function User() {

    const [jobs, setJobs] = React.useState<Job[]>([]);

    const fetchJobs = useCallback(async() => {
        const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
        setJobs(jobs);
    }, []);

    const saveJob = async (job: Job) => {
        // create a new array in local storage
        const savedJobs = JSON.parse(localStorage.getItem("saved") || "[]") as Job[];
        savedJobs.push(job);
        localStorage.setItem("saved", JSON.stringify(savedJobs));
        setJobs(savedJobs);
    }

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

  return (
    <section className='min-h-screen bg-primary-foreground'>
        <span className='w-screen '>
            <h1 className='text-4xl lg:ml-[210px] font-bold mt-8 text-primary/90 '>Find your Dream Job</h1>
            <h5 className='lg:ml-[210px] font-medium '>in your local place</h5>
        </span>
        <section className='mt-8 items-center lg:ml-[200px] gap-y-2'>
            {jobs.length === 0 ? (
                <p className='text-center'>Add jobs from Admin Section to see here</p>
            ) : (
                jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        id={job.id}
                        title={job.title}
                        company={job.company}
                        location={job.location!!}
                        description={job.description!!}
                        requirements={job.requirements!!}
                    />
                ))
            )}
           {jobs.map((job) => (
             <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location!!}
                description={job.description!!}
                requirements={job.requirements!!}
                />
              ))
            }
        </section>
    </section>
  )
}

export default User