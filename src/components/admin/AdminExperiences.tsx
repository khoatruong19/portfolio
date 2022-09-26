import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Experience } from '@prisma/client';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import ExperienceModal from './ExperienceModal';
import HeaderTitle from './HeaderTitle';

const AdminExperiences = () => {
  const { data } = trpc.useQuery(['experience.getAllExperiences']);
  const deleteExperience = trpc.useMutation(['experience.deleteExperience']);
  const [triggerOpenModal, setTriggerOpenModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience>();

  const handleDeleteExperience = (id: string) => {
    deleteExperience.mutate(
      {
        id,
      },
      {
        onSuccess: () => alert('Experience deleted!'),
      }
    );
  };

  const handleOpenModal = (experience: Experience) => {
    setSelectedExperience(experience);
    setTriggerOpenModal(true);
  };

  return (
    <div className="h-[100%] w-[100%] relative overflow-hidden px-2 ">
      <HeaderTitle headerTitle="Experiences" />
      <ExperienceModal add />
      <div className="w-full flex flex-wrap justify-evenly">
        {data?.map((experience) => (
          <div className="relative w-[48%] p-5 border border-borderGrayColor text-white flex flex-col justify-between">
            <div>
              <div className="h-[160px] flex items-center justify-center">
                <img
                  className="w-[150px] mx-auto mb-2"
                  src={experience.companyImage}
                  alt=""
                />
              </div>

              <p className="text-center text-yellowColor/80 text-xl font-semibold">
                {experience.company}
              </p>
              <p className="text-center text-green-300">
                {experience.jobTitle}
              </p>
              <div className="flex gap-2 items-center justify-center my-2">
                <span className="text-blue-400">
                  Started {experience.dateStarted.toDateString()}{' '}
                </span>
                <span>--</span>
                <span className="text-red-400">
                  {experience.isCurrentlyWorkingHere
                    ? 'Present'
                    : `Ended ${experience.dateEnded.toDateString()}`}
                </span>
              </div>
            </div>

            <ul className="list-disc space-y-4 ml-5 text-md text-gray-300 text-left">
              {experience.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            <div className="absolute right-1 top-[-25px] flex-1 flex gap-3 items-center ml-2">
              <PencilIcon
                onClick={() => handleOpenModal(experience)}
                className="w-5 h-5 text-yellowColor/80 cursor-pointer hover:text-yellowColor"
              />
              <TrashIcon
                onClick={() => handleDeleteExperience(experience.id)}
                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
              />
            </div>
          </div>
        ))}
      </div>
      <ExperienceModal
        experience={selectedExperience}
        openNow={triggerOpenModal}
        setOpenNow={setTriggerOpenModal}
      />
    </div>
  );
};

export default AdminExperiences;
