import { XMarkIcon } from '@heroicons/react/24/solid';
import { Project, Skill } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';
import { trpc } from '../../utils/trpc';
import HeaderTitle from './HeaderTitle';
import SaveButton from './SaveButton';
import SkillModal from './SkillModal';
import SkillsContainer from './SkillsContainer';

interface IProps {
  add?: boolean;
  project?: Project;
  openNow?: boolean;
  setOpenNow?: Function;
}

const ProjectModal = ({ add, project, openNow, setOpenNow }: IProps) => {
  const addProject = trpc.useMutation(['project.createProject']);
  const updateProject = trpc.useMutation(['project.updateProject']);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState<Skill[]>([]);
  const [appLink, setAppLink] = useState('');
  const [gitLink, setGitLink] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadLoading(true);
    if (!(e.target.files && e.target.files.length > 0)) return;
    const formData = new FormData();
    formData.append('file', (e.target.files as any)[0]);
    formData.append('upload_preset', 'portfolio');
    const data = await fetch(
      process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL as string,
      {
        method: 'POST',
        body: formData,
      }
    ).then((res) => res.json());
    setImage(data.secure_url);
    setUploadLoading(false);
  };

  const handleAddProject = () => {
    addProject.mutate(
      {
        title,
        appLink,
        description,
        gitLink,
        image,
        technologies,
      },
      {
        onSuccess: () => alert('Project added!'),
      }
    );
    setOpen(false);
    setOpenNow && setOpenNow(false);
  };

  const handleEditProject = () => {
    updateProject.mutate(
      {
        id: project?.id!,
        title,
        image,
        description,
        technologies,
        appLink,
        gitLink,
      },
      {
        onSuccess: () => alert('Project updated!'),
      }
    );
    setOpen(false);
    setOpenNow && setOpenNow(false);
  };

  const handleSave = () => {
    if (add) {
      handleAddProject();
      return;
    }
    handleEditProject();
  };

  useEffect(() => {
    if (openNow) setOpen(true);
  }, [openNow]);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setImage(project.image);
      setDescription(project.description);
      setTechnologies(project.technologies);
      setAppLink(project.appLink);
      setGitLink(project.gitLink);
    }
  }, [project]);

  return (
    <>
      {add && (
        <button
          onClick={() => setOpen(true)}
          className="heroButton font-semibold text-lg mb-5 ml-8"
        >
          Add project
        </button>
      )}
      {open && (
        <div className="fixed left-0 top-0 w-screen h-screen z-30 bg-black/50 flex items-center justify-center">
          <div className="relative w-[600px] max-h-[70vh] overflow-y-scroll scrollbar-none p-5 bg-grayColor rounded-md">
            <HeaderTitle headerTitle={add ? 'Add Project' : 'Edit Project'} />

            <div className="mt-10 space-y-5">
              <div className="space-y-2">
                <label htmlFor="" className="fieldLabel">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="fieldInput w-full"
                />
              </div>
              <div className="flex items-center gap-5 justify-between">
                <label htmlFor="" className="fieldLabel">
                  Image
                </label>
                <div className="max-w-[200px]">
                  <img src={image} alt="" />
                </div>
                <div>
                  <input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    type="text"
                    className="fieldInput w-full h-10"
                  />
                  {uploadLoading ? (
                    <span className="text-md font-semibold text-yellowColor/40">
                      Waiting
                    </span>
                  ) : (
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="heroButton mt-3"
                    >
                      Upload
                    </button>
                  )}
                  <input
                    onChange={handleUploadImage}
                    ref={fileRef}
                    type="file"
                    className="hidden"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="" className="fieldLabel">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="fieldInput w-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <label htmlFor="" className="fieldLabel">
                    Technologies
                  </label>
                  <SkillModal add setSkills={setTechnologies} />
                </div>
                <SkillsContainer
                  skills={technologies}
                  setSkills={setTechnologies}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="" className="fieldLabel">
                  Git Link
                </label>
                <input
                  value={gitLink}
                  onChange={(e) => setGitLink(e.target.value)}
                  type="text"
                  className="fieldInput w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="" className="fieldLabel">
                  App Link
                </label>
                <input
                  value={appLink}
                  onChange={(e) => setAppLink(e.target.value)}
                  type="text"
                  className="fieldInput w-full"
                />
              </div>
            </div>
            <SaveButton clickHandler={handleSave} />
            <div
              onClick={() => {
                setOpen(false);
                setOpenNow && setOpenNow(false);
              }}
              className="absolute top-2 right-3 cursor-pointer hover:text-yellowColor"
            >
              <XMarkIcon className="h-8 w-8" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectModal;
