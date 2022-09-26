import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import SectionHeader from './shared/SectionHeader';
import { trpc } from '../utils/trpc';

const WorkExperience = () => {
  const { data } = trpc.useQuery(['experience.getAllExperiences']);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className="h-screen flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center"
    >
      <SectionHeader text="Experience" />

      <div
        className={`w-full flex space-x-5 overflow-x-scroll 
        ${data?.length == 1 && 'items-center justify-center'}
        p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-yellowColor/80`}
      >
        {data?.map((experience) => (
          <ExperienceCard experience={experience} key={experience.id} />
        ))}
      </div>
    </motion.div>
  );
};

export default WorkExperience;
