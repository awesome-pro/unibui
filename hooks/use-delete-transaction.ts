import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Job } from "@/app/(root)/columns";


type ResponseType = {
    id: string;
}

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async() => {
            const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
            const index = jobs.findIndex((job) => job.id === id);
            jobs.splice(index, 1);
            localStorage.setItem("jobs", JSON.stringify(jobs));
            return { id: id as string };
        },
        onSuccess: () => {
            toast.success("Transaction deleted successfully");
            console.log("Transaction deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["jobs", { id }]});
            queryClient.invalidateQueries({ queryKey: ["jobs"]});
        },
        onError: () => {
            toast.error("Failed to delete transaction");
            console.log("Failed to delete transaction")
            //console.error(error);
        }
    })

    return mutation;
}