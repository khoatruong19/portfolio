import {
  createProjectSchema,
  deleteProjectSchema,
  updateProjectSchema,
} from '../../schema/project.schema';
import { createRouter } from './context';

export const projectRouter = createRouter()
  .query('getAllProjects', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.project.findMany();
    },
  })
  .mutation('createProject', {
    input: createProjectSchema,
    async resolve({ input, ctx: { prisma } }) {
      try {
        return await prisma.project.create({
          data: input,
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('updateProject', {
    input: updateProjectSchema,
    async resolve({ input, ctx: { prisma } }) {
      try {
        const { id, ...rest } = input;
        await prisma.project.update({
          where: {
            id,
          },
          data: rest,
        });
        return {
          message: 'Project Updated',
        };
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('deleteProject', {
    input: deleteProjectSchema,
    async resolve({ input, ctx: { prisma } }) {
      try {
        const { id } = input;
        await prisma.project.delete({
          where: {
            id,
          },
        });
        return {
          message: 'Project Deleted',
        };
      } catch (error) {
        console.log(error);
      }
    },
  });
