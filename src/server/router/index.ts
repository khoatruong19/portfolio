// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { pageInfoRouter } from './pageInfo';
import { projectRouter } from './project';
import { experienceRouter } from './experience';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('pageInfo.', pageInfoRouter)
  .merge('project.', projectRouter)
  .merge('experience.', experienceRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
