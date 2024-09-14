import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Job } from "@/app/(root)/columns";

type ResponseType = Job[]
type RequestType = Job[]

export const useBulkCreateTransactions = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            try {
                const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
                const newJobs = [...jobs, ...json];
                localStorage.setItem("jobs", JSON.stringify(newJobs));
                return newJobs;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to create transaction");
            }
        },
        onSuccess: () => {
            toast.success("transaction created successfully");
            console.log("transaction created successfully");
            queryClient.invalidateQueries({ queryKey: ["jobs"]});
        },
        onError: (error) => {
            toast.error(error.message + "Failed to create transaction");
            console.log("Failed to create transaction")
            console.error(error);
        }
    })

    return mutation;
}