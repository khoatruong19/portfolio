import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './shared/SectionHeader';
import Skill from './Skill';
import { trpc } from '../utils/trpc';

const Skills = () => {
  const { data } = trpc.useQuery(['pageInfo.getSkills']);
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
      className=" h-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <SectionHeader text="Skills" />

      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for currency profieciency
      </h3>

      <div className="grid grid-cols-4 gap-5 md:pt-5">
        {data &&
          data.skills.length > 0 &&
          data.skills.map((skill, i) => (
            <Skill directionLeft={i % 2 === 0} key={skill.id} skill={skill} />
          ))}
      </div>
    </motion.div>
  );
};

export default Skills;
