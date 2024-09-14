import { Job } from "@/app/(root)/columns";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";


export const useGetTransactions = () => {

    const query = useQuery({
        queryKey: ["jobs", { }],
        queryFn: async() => {
            try {
                const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
                console.table(jobs);
                return jobs;
            } catch (error) {
                toast.error("An error occurred while fetching the transactions");
                return;
            }
        }
    })

    return query;
}