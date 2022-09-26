import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './shared/SectionHeader';
import { trpc } from '../utils/trpc';
const About = () => {
  const { data } = trpc.useQuery(['pageInfo.getAboutInfo']);

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
      className="relative flex flex-col md:flex-row text-center md:text-left h-screen max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <SectionHeader text="About" />

      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        src={data?.profilePic || ''}
        className="-mb-28 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover
            md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
      />

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{' '}
          <span className="underline decoration-yellowColor/50">little</span>{' '}
          background
        </h4>
        <p className="text-sm">{data?.backgroundInformation}</p>
      </div>
    </motion.div>
  );
};

export default About;
