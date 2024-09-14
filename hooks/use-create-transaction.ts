import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Job } from "@/app/(root)/columns";

type ResponseType = Job;
type RequestType = Job;

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            try {
                const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
                const newJob = json;
                jobs.push(newJob);
                localStorage.setItem("jobs", JSON.stringify(jobs));
                return newJob;
            } catch (error) {
                throw new Error("An error occurred while creating the transaction");
            }
        },
        onSuccess: () => {
            toast.success("Transaction created successfully");
            console.log("Transaction created successfully");
            queryClient.invalidateQueries({ queryKey: ["Transactions"]});
            queryClient.invalidateQueries({ queryKey: ["summary"]});
        },
        onError: (error) => {
            toast.error(error.message + "Failed to create Transaction");
            console.log("Failed to create Transaction")
            console.error(error);
        }
    })

    return mutation;
}