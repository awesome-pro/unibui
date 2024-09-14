import { Job } from "@/app/(root)/columns";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";


export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["jobs", { id }],
        queryFn: async() => {
            try {
                const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
                console.table(jobs);
                const job = jobs.find((job) => job.id === id);
    
                if (!job) {
                    toast.error(`Job with id ${id} not found`);
                    return;
                }
    
                return job;
            } catch (error) {
                toast.error("An error occurred while fetching the job");
                return;
            }
        }
    })

    return query;
}