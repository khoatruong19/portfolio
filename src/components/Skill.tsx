import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@prisma/client';

interface IProps {
  directionLeft?: boolean;
  skill: Skill;
}

const Skill = ({ directionLeft, skill }: IProps) => {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.div
        initial={{
          x: directionLeft ? -200 : 200,
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        className="rounded-full border flex items-center justify-center overflow-hidden border-gray-500  w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32  group-hover:grayscale transition duration-300 ease-in-out"
      >
        <img
          className="w-18 h-18 md:w-24 md:h-24 xl:w-28 xl:h-28"
          src={skill.image}
        />
      </motion.div>

      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-24 w-24 md:w-28 md:h-28 xl:w-32 xl:h-32 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-bold text-black opacity-100">
            {skill.progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skill;
