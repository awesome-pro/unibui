import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Job } from "@/app/(root)/admin/columns";

type RequestType = {
    ids: string[];
}
type ResponseType = {
    ids: string[];
}

export const useBulkDeleteJobs = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            try {
                const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
                json.ids.forEach((id) => {
                    const index = jobs.findIndex((job) => job.id === id);
                    jobs.splice(index, 1);
                });
    
                localStorage.setItem("jobs", JSON.stringify(jobs));
                return { ids: json.ids };
            } catch (error) {
                console.error(error);
                throw new Error("Failed to delete transaction");
            }
        },
        onSuccess: () => {
            toast.success("transaction deleted successfully");
            console.log("transaction deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["jobs"]});
        },
        onError: (error) => {
            toast.error(error.message + "Failed to create transaction");
            console.log("Failed to delete transaction")
            console.error(error);
        }
    })

    return mutation;
}