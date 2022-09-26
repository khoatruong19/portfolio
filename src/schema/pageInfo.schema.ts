import z from 'zod';

export const skill = z.object({
  id: z.string(),
  title: z.string().min(2),
  image: z.string().min(3),
  progress: z.number(),
});

const social = z.object({
  id: z.string(),
  name: z.string().min(3),
  url: z.string().min(3),
});

export const updatePageinfoSchema = z.object({
  name: z.string().min(5, 'Min name length is 5'),
  role: z.string(),
  heroImage: z.string(),
  backgroundInformation: z.string(),
  profilePic: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  address: z.string(),
  skills: z.array(skill),
  socials: z.array(social),
});
