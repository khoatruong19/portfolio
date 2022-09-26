import { Skill } from '@prisma/client';
import React from 'react';

interface IProps {
  skill: Skill;
}

const SkillCard = ({ skill }: IProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-[60px]">
        <img className="max-w-[50px]" src={skill.image} alt={skill.title} />
      </div>
      <div className="w-[130px]">
        <p className="text-xl font-semibold text-white mx-2">{skill.title}</p>
      </div>
      <p className="text-xl font-semibold text-green-400">{skill.progress}%</p>
    </div>
  );
};

export default SkillCard;
