import { WorkflowsContainer, WorkflowsError, WorkflowsList, WorkflowsLoading } from "@/features/workflows/components/wokflows";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth.utils";
import { HydrateClient, prefetch } from "@/trpc/server";
import { ErrorBoundary } from "@sentry/nextjs";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";


type Props ={
    searchParams: Promise<SearchParams>
}
const Page = async({ searchParams}: Props) =>{
    await requireAuth();

    const params = await workflowsParamsLoader(searchParams);
    prefetchWorkflows( params);

    return (
        <WorkflowsContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<WorkflowsError/>}>
                    <Suspense fallback={<WorkflowsLoading/>}>
                        <WorkflowsList>

                        </WorkflowsList>

                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowsContainer>
    )
};

export default Page;