import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Job } from "@/app/(root)/columns";


type RequestType = Job;
type ResponseType = Job;

export const useEditTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
            const index = jobs.findIndex((job) => job.id === id);
            jobs[index] = json;
            localStorage.setItem("jobs", JSON.stringify(jobs));
            return json;
        },
        onSuccess: () => {
            toast.success("transaction edited successfully");
            console.log("transaction edited successfully");
            queryClient.invalidateQueries({ queryKey: ["jobs", { id }]});
            queryClient.invalidateQueries({ queryKey: ["jobs"]}); 
        },
        onError: (error) => {
            toast.error(error.message + "Failed to edit transaction");
            console.log("Failed to edit transaction")
            console.error(error);
        }
    })

    return mutation;
}