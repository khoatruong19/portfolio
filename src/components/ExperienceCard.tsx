import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '@prisma/client';

interface IProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: IProps) => {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-grayColor p-10 xl:mt-8">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        className="w-32 h-32 xl:w-[200px] object-fit"
        src={experience.companyImage}
      />

      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">{experience.company}</h4>
        <p className="font-bold text-2xl mt-1">{experience.jobTitle}</p>
        <div className="flex space-x-2 my-2">
          {experience.technologies.map((skill) => (
            <img
              key={skill.id}
              className="h-10 w-10 rounded-full"
              src={skill.image}
              alt=""
            />
          ))}
        </div>

        <p className="uppercase py-5 text-gray-300 ">
          Started work {experience.dateStarted.toDateString()} -{' '}
          {experience.isCurrentlyWorkingHere
            ? 'Present'
            : `Ended ${experience.dateEnded.toDateString()}`}
        </p>

        <ul className="list-disc space-y-4 ml-5 text-lg">
          {experience.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ExperienceCard;
