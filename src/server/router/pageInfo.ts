import { updatePageinfoSchema } from '../../schema/pageInfo.schema';
import { createRouter } from './context';

export const pageInfoRouter = createRouter()
  .query('getAllDetails', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.pageInfo.findFirst({});
    },
  })
  .query('getHeroInfo', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.pageInfo.findFirst({
        select: {
          name: true,
          role: true,
          heroImage: true,
        },
      });
    },
  })
  .query('getAboutInfo', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.pageInfo.findFirst({
        select: {
          backgroundInformation: true,
          profilePic: true,
        },
      });
    },
  })
  .query('getContactInfo', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.pageInfo.findFirst({
        select: {
          phoneNumber: true,
          email: true,
          address: true,
        },
      });
    },
  })
  .query('getSkills', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.pageInfo.findFirst({
        select: {
          skills: true,
        },
      });
    },
  })
  .query('getSocials', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.pageInfo.findFirst({
        select: {
          socials: true,
        },
      });
    },
  })
  .mutation('updatePageInfo', {
    input: updatePageinfoSchema,
    async resolve({ input, ctx: { prisma } }) {
      try {
        const pageInfo = await prisma.pageInfo.findFirst();

        if (!pageInfo)
          return {
            message: 'PageInfo not found!',
          };
        await prisma.pageInfo.update({
          where: { id: pageInfo.id },
          data: {
            ...input,
          },
        });
        return {
          message: 'PageInfo updated!',
        };
      } catch (error) {
        console.log(error);
      }
    },
  });
