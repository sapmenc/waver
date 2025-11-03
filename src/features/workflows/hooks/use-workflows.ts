import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams();

    return useSuspenseQuery(trpc.workflow.getMany.queryOptions( params ));
};

//hook to create a new workflow
export const useCreateWorkflow = () => {
    const queryClient =useQueryClient();
    const trpc =useTRPC();

    return useMutation(
        trpc.workflow.create.mutationOptions({
            onSuccess: (data) =>{
                toast.success(`workflow "${data.name}" created`);
                queryClient.invalidateQueries(
                    trpc.workflow.getMany.queryOptions({}),
                );
            },
            onError: (error) =>{
                toast.error(`Failed to create workflow: ${error.message}`)
            },
        }),
    );

};

// hook to remove a workflow

export const useRemoveWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workflow.remove.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" removed`);
                queryClient.invalidateQueries(trpc.workflow.getMany.queryOptions({}));
                queryClient.invalidateQueries(
                    trpc.workflow.getOne.queryFilter({id: data.id}),
                );
            }
        })
    )

}

//hook to fetch a single workflows using suspense
export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflow.getOne.queryOptions({id}));
};

//hook to update a new workflow name

export const useUpdateWorkflowName = () => {
    const queryClient =useQueryClient();
    const trpc =useTRPC();

    return useMutation(
        trpc.workflow.updateName.mutationOptions({
            onSuccess: (data) =>{
                toast.success(`workflow "${data.name}"updated`);
                queryClient.invalidateQueries(
                    trpc.workflow.getMany.queryOptions({}),
                );
                queryClient.invalidateQueries(
                    trpc.workflow.getOne.queryOptions({ id: data.id}),
                )
            },
            onError: (error) =>{
                toast.error(`Failed to update workflow: ${error.message}`)
            },
        }),
    );

};