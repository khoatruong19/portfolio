import React, { Dispatch, SetStateAction } from 'react';
import { PencilIcon, TrashIcon, LinkIcon } from '@heroicons/react/24/solid';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
import { Project } from '@prisma/client';
import { trpc } from '../../utils/trpc';

interface IProps {
  project: Project;
  selectProject: Dispatch<SetStateAction<Project>>;
  openEditModal: Dispatch<SetStateAction<boolean>>;
}

const ProjectCard = ({ project, selectProject, openEditModal }: IProps) => {
  const deleteProject = trpc.useMutation(['project.deleteProject']);

  const handleOpenModal = () => {
    selectProject(project);
    openEditModal(true);
  };

  const handleDeleteProject = () => {
    deleteProject.mutate(
      {
        id: project.id,
      },
      {
        onSuccess: () => alert('Project deleted!'),
      }
    );
  };

  return (
    <div className="w-[48%] p-2 border border-borderGrayColor relative">
      <img className="w-full h-[350px] object-fit" src={project.image} alt="" />
      <h3 className="text-center font-bold text-xl my-1 text-yellowColor/80">
        {project.title}
      </h3>
      <p className="font-semibold text-white">{project.description}</p>

      <div className="flex flex-wrap my-3 gap-4">
        {project.technologies.map((skill) => (
          <div key={skill.id} className="flex gap-2 items-center">
            <img src={skill.image} alt="" className="w-8 object-fit" />
            <p className="text-md font-semibold text-yellowColor/80">
              {skill.title}
            </p>
          </div>
        ))}
      </div>

      <Link href={project.gitLink} target="_blank">
        <div className="flex gap-2 my-2 cursor-pointer">
          <SocialIcon
            style={{ height: '1.5rem', width: '1.5rem' }}
            fgColor="gray"
            url={project.gitLink}
          />
          <p className="text-gray-500">{project.gitLink}</p>
        </div>
      </Link>
      <Link href={project.appLink} target="_blank">
        <div className="flex gap-2 my-2 cursor-pointer">
          <LinkIcon className="w-6 h-6 text-green-400" />
          <p className="text-green-300">{project.appLink}</p>
        </div>
      </Link>
      <div className="absolute right-1 top-[-25px] flex-1 flex gap-3 items-center ml-2">
        <PencilIcon
          onClick={handleOpenModal}
          className="w-5 h-5 text-yellowColor/80 cursor-pointer hover:text-yellowColor"
        />
        <TrashIcon
          onClick={handleDeleteProject}
          className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
        />
      </div>
    </div>
  );
};

export default ProjectCard;
