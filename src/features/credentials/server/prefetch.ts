import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.credentials.getMany>; // ✅ singular: credentials

//prefretch all credentials
export const prefetchCredentials = (params: Input) => {
  return prefetch(trpc.credentials.getMany.queryOptions(params)); // ✅ singular: credentials
};

//prefretch signle credentials
export const prefetchCredential = (id: string) => {
  return prefetch(trpc.credentials.getOne.queryOptions({id})); // ✅ singular: credentials
};