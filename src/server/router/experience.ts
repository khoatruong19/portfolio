import {
  createExperienceSchema,
  deleteExperienceSchema,
  updateExperienceSchema,
} from '../../schema/experience.schema';
import { createRouter } from './context';

export const experienceRouter = createRouter()
  .query('getAllExperiences', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.experience.findMany();
    },
  })

  .mutation('createExperience', {
    input: createExperienceSchema,
    async resolve({ input, ctx: { prisma } }) {
      try {
        return await prisma.experience.create({
          data: input,
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('updateExperience', {
    input: updateExperienceSchema,
    async resolve({ input, ctx: { prisma } }) {
      try {
        const { id, ...rest } = input;
        await prisma.experience.update({
          where: {
            id,
          },
          data: rest,
        });
        return {
          message: 'Experience Updated',
        };
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('deleteExperience', {
    input: deleteExperienceSchema,
    async resolve({ input, ctx: { prisma } }) {
      try {
        const { id } = input;
        await prisma.experience.delete({
          where: {
            id,
          },
        });
        return {
          message: 'experience Deleted',
        };
      } catch (error) {
        console.log(error);
      }
    },
  });
