import z from 'zod';
import { skill } from './pageInfo.schema';

export const createExperienceSchema = z.object({
  jobTitle: z.string().min(3),
  companyImage: z.string().min(3),
  company: z.string().min(3),
  technologies: z.array(skill),
  dateStarted: z.date(),
  dateEnded: z.date(),
  isCurrentlyWorkingHere: z.boolean().default(false),
  points: z.array(z.string()),
});

export const updateExperienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(3),
  companyImage: z.string().min(3),
  company: z.string().min(3),
  technologies: z.array(skill),
  dateStarted: z.date(),
  dateEnded: z.date(),
  points: z.array(z.string()),
});

export const deleteExperienceSchema = z.object({
  id: z.string(),
});
