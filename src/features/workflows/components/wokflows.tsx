 "use client";
 import { formatDistanceToNow } from "date-fns";
import { 
    EntityHeader, 
    EntityContainer, 
    EntitySearch, 
    Entitypagination, 
    LoadingView, 
    ErrorView, 
    EmptyView, 
    EntityList
} from "@/components/entity-components";
 import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { fa } from "zod/v4/locales";
import { Children } from "react";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import type { Workflow } from "@/generated/prisma";
import { EntityItem } from "../../../components/entity-components";
import { WorkflowIcon } from "lucide-react";

export const WorkflowsSearch = () => {
    const [params, setParams] = useWorkflowsParams() as [Record<string, any>, (p: any) => void];
    const {searchValue, onSearchChange} = useEntitySearch({
        params,
        setParams,
    });

    return (
        <EntitySearch
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search workflows"
        />
    );
};

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();
    return(
        <EntityList
        items={workflows.data.items}
        getKey={(workflow) => workflow.id}
        renderItem={(workflow) => < WorkflowItem 
        data={workflow}/>}
        emptyView= {<WorkflowsEmpty/>}

        />
    )
 }

 export const WorkflowsHeader = ({ disabled}: {disabled?: boolean}) => {
    const createWorkflow = useCreateWorkflow();
    const router = useRouter();
     const { handleError, modal} = useUpgradeModal();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`);
            },
            onError: (error) => {
                handleError(error);
            },

        });
    }

    return(
    <>
        {modal}
        <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New workflow"
        disabled ={disabled}
        isCreating={createWorkflow.isPending}
        />

    </>
    );
 };

 export const WorkflowsPagination = () => {
    const Workflows = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowsParams();

    return (
        <Entitypagination
        disabled={Workflows.isFetching}
        totalPages={Workflows.data.totalPages}
        page={Workflows.data.page}
        onPageChange={(page) => setParams({...PathParamsContext, page})}
        />
    );
 };

 export const WorkflowsContainer = ({
    children
 }: {
    children: React.ReactNode;
 }) =>{
    return(
        <EntityContainer
            header={<WorkflowsHeader/>}
            search={<WorkflowsSearch/>}
            pagination={<WorkflowsPagination/>}
        >
            {children}

        </EntityContainer>
    );
 };

 export const WorkflowsLoading =() => {
    return<LoadingView message="Loading workflows"/>;
 };

  export const WorkflowsError =() => {
    return<ErrorView  message="Error loading workflows"/>;
 };


 export const WorkflowsEmpty =() => {
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error);
            },
        });
    };

    return(
        <>
        {modal}
        <EmptyView 
            onNew={handleCreate}
            message="You haven't created any workflows yet. Get started by creating your first workflow"
        />
        </>
    );
 };

 export const WorkflowItem = ({
    data,
 }: {
    data: Workflow
 }) => {  
    const removeWorkflow = useRemoveWorkflow();

    const handleRemove= () => {
        removeWorkflow.mutate({ id: data.id});
    }
    return (
        <EntityItem
        href={`/workflows/${data.id}`}
        title={data.name}
        subtitle={
            <>
            updated {formatDistanceToNow(data.updatedAt,{addSuffix: true})}{ " " }
            &bull; Created{" "}
            {formatDistanceToNow(data.createdAt, {addSuffix: true})}
            </>
        }
        image={
            <div className="size-8 flex items-center justify-center">
                <WorkflowIcon className="size-5 text-muted-foreground"/>
            </div>
        }
        onRemove={handleRemove}
        isRemoving={removeWorkflow.isPending}
         />
    )
}