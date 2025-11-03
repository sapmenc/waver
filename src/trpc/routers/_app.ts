import {createTRPCRouter} from '../init';
import { workflowRouter } from '@/features/workflows/server/routers';
   
export const appRouter = createTRPCRouter({
    workflow: workflowRouter,
  });

// export type definition of API
export type AppRouter = typeof appRouter;