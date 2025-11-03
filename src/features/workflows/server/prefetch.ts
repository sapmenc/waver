import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflow.getMany>; // ✅ singular: workflow

//prefretch all workflows
export const prefetchWorkflows = (params: Input) => {
  return prefetch(trpc.workflow.getMany.queryOptions(params)); // ✅ singular: workflow
};

//prefretch signle workflows
export const prefetchWorkflow = (id: string) => {
  return prefetch(trpc.workflow.getOne.queryOptions({id})); // ✅ singular: workflow
};