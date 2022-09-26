import z from 'zod';
import { skill } from './pageInfo.schema';

export const createProjectSchema = z.object({
  title: z.string().min(3),
  image: z.string().min(3),
  description: z.string().min(3),
  technologies: z.array(skill),
  appLink: z.string().min(3),
  gitLink: z.string().min(3),
});

export const updateProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  image: z.string().min(3),
  description: z.string().min(3),
  technologies: z.array(skill),
  appLink: z.string().min(3),
  gitLink: z.string().min(3),
});

export const deleteProjectSchema = z.object({
  id: z.string(),
});
