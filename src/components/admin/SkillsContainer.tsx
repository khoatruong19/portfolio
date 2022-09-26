import { Skill } from '@prisma/client';
import React, { useState } from 'react';
import SkillCard from './SkillCard';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import SkillModal from './SkillModal';

interface IProps {
  skills: Skill[];
  setSkills: Function;
}

const SkillsContainer = ({ skills, setSkills }: IProps) => {
  const [triggerOpenModal, setTriggerOpenModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill>();

  const handleDeleteSkill = (id: string) => {
    let temp = skills.filter((skill) => skill.id !== id);
    setSkills(temp);
  };
  const handleEditSkill = (skill: Skill) => {
    let skillIndex = skills.findIndex((item) => item.id === skill.id);
    let temp = skills;
    temp[skillIndex] = skill;
    setSkills(temp);
    setTriggerOpenModal(false);
  };
  const handleOpenModal = (skill: Skill) => {
    setSelectedSkill(skill);
    setTriggerOpenModal(true);
  };
  return (
    <div className="flex flex-wrap gap-x-10 gap-y-3 mt-3 justify-between">
      {skills &&
        skills.map((skill) => (
          <div className="flex gap-2" key={skill.id}>
            <SkillCard skill={skill} />
            <div className="flex-1 flex gap-3 items-center ml-2">
              <PencilIcon
                onClick={() => handleOpenModal(skill)}
                className="w-5 h-5 text-yellowColor/80 cursor-pointer hover:text-yellowColor"
              />
              <TrashIcon
                onClick={() => handleDeleteSkill(skill.id)}
                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
              />
            </div>
          </div>
        ))}
      <SkillModal
        skill={selectedSkill}
        setSkills={setSkills}
        editSkill={handleEditSkill}
        openNow={triggerOpenModal}
        setOpenNow={setTriggerOpenModal}
      />
    </div>
  );
};

export default SkillsContainer;
