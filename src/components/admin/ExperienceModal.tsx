import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Experience, Skill } from '@prisma/client';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { trpc } from '../../utils/trpc';
import ExperiencePoint from './ExperiencePoint';
import HeaderTitle from './HeaderTitle';
import SaveButton from './SaveButton';
import SkillModal from './SkillModal';
import SkillsContainer from './SkillsContainer';

interface IProps {
  add?: boolean;
  experience?: Experience;
  openNow?: boolean;
  setOpenNow?: Dispatch<SetStateAction<boolean>>;
}

const ExperienceModal = ({ add, experience, openNow, setOpenNow }: IProps) => {
  const addExperience = trpc.useMutation(['experience.createExperience']);
  const updateExperience = trpc.useMutation(['experience.updateExperience']);

  const [open, setOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [companyImage, setCompanyImage] = useState('');
  const [company, setCompany] = useState('');
  const [dateStarted, setDateStarted] = useState<Date>(new Date());
  const [dateEnded, setDateEnded] = useState<Date>(new Date());
  const [points, setPoints] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<Skill[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [openExperiencePoint, setOpenExperiencePoint] = useState(false);

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
    setCompanyImage(data.secure_url);
    setUploadLoading(false);
  };

  const handleAddExperience = () => {
    addExperience.mutate(
      {
        company,
        companyImage,
        dateStarted,
        jobTitle,
        points,
        dateEnded,
        technologies,
      },
      {
        onSuccess: () => alert('Experience added!'),
        onError: (data) => alert(data.message),
      }
    );
    setOpen(false);
    setOpenNow && setOpenNow(false);
  };

  const handleEditProject = () => {
    console.log({ jobTitle });
    updateExperience.mutate(
      {
        id: experience?.id as string,
        company,
        companyImage,
        dateStarted,
        jobTitle,
        points,
        dateEnded,
        technologies,
      },
      {
        onSuccess: () => alert('Experience updated!'),
        onError: (data) => alert(data.message),
      }
    );
    setOpen(false);
    setOpenNow && setOpenNow(false);
  };

  const handleSave = () => {
    if (add) {
      handleAddExperience();
      return;
    }
    handleEditProject();
  };

  useEffect(() => {
    if (openNow) setOpen(true);
  }, [openNow]);

  useEffect(() => {
    if (experience) {
      setJobTitle(experience.jobTitle);
      setCompanyImage(experience.companyImage);
      setCompany(experience.company);
      setDateStarted(experience.dateStarted);
      setDateEnded(experience.dateEnded);
      setPoints(experience.points);
      setTechnologies(experience.technologies);
    }
  }, [experience]);

  return (
    <>
      {add && (
        <button
          onClick={() => setOpen(true)}
          className="heroButton font-semibold text-lg mb-5 ml-8"
        >
          Add experience
        </button>
      )}
      {open && (
        <div className="fixed left-0 top-0 w-screen h-screen z-30 bg-black/50 flex items-center justify-center">
          <div className="relative w-[600px] max-h-[70vh] overflow-y-scroll scrollbar-none p-5 bg-grayColor rounded-md">
            <HeaderTitle
              headerTitle={add ? 'Add Experience' : 'Edit Experience'}
            />

            <div className="mt-10 space-y-5">
              <div className="space-y-2">
                <label htmlFor="" className="fieldLabel">
                  Job Title
                </label>
                <input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  type="text"
                  className="fieldInput w-full"
                />
              </div>
              <div className="flex items-center gap-5 justify-between">
                <label htmlFor="" className="fieldLabel">
                  Company Image
                </label>
                <div className="max-w-[200px]">
                  <img src={companyImage} alt="" />
                </div>
                <div>
                  <input
                    value={companyImage}
                    onChange={(e) => setCompanyImage(e.target.value)}
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
                  Company
                </label>
                <textarea
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
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
                  Started Date
                </label>
                <div className="flex items-center justify-center">
                  <Calendar onChange={setDateStarted} value={dateStarted} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="" className="fieldLabel">
                  Ended Date
                </label>
                <div className="flex items-center justify-center">
                  <Calendar onChange={setDateEnded} value={dateEnded} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <label htmlFor="" className="fieldLabel">
                    Points
                  </label>
                  <div
                    onClick={() => setOpenExperiencePoint((prev) => !prev)}
                    className="p-1 rounded-full text-yellowColor/30 flex items-center justify-center border-2 border-yellowColor/30 hover:border-yellowColor hover:text-yellowColor cursor-pointer"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </div>
                </div>
                {openExperiencePoint && (
                  <ExperiencePoint add setPoints={setPoints} points={points} />
                )}
                {points.map((point, i) => (
                  <ExperiencePoint
                    setPoints={setPoints}
                    key={i}
                    value={point}
                    points={points}
                  />
                ))}
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

export default ExperienceModal;
