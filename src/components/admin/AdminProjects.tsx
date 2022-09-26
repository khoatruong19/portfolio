import { Project } from '@prisma/client';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import HeaderTitle from './HeaderTitle';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const AdminProjects = () => {
  const { data } = trpc.useQuery(['project.getAllProjects']);
  const [triggerOpenModal, setTriggerOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project>();

  return (
    <div className="h-[100%] w-[100%] relative overflow-hidden">
      <HeaderTitle headerTitle="Projects" />
      <ProjectModal add />

      <div className="w-[95%] mx-auto space-y-8 h-[90%] overflow-y-scroll scrollbar-none py-10">
        <div className="w-full flex flex-wrap justify-between gap-y-10">
          {data &&
            data.map((project) => (
              <ProjectCard
                openEditModal={setTriggerOpenModal}
                selectProject={setSelectedProject}
                key={project.id}
                project={project}
              />
            ))}
        </div>
      </div>
      <ProjectModal
        openNow={triggerOpenModal}
        setOpenNow={setTriggerOpenModal}
        project={selectedProject}
      />
    </div>
  );
};

export default AdminProjects;
