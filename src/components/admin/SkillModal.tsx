import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import HeaderTitle from './HeaderTitle';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import SaveButton from './SaveButton';
import { Skill } from '@prisma/client';
import { nanoid } from 'nanoid';

interface IProps {
  add?: boolean;
  setSkills: Dispatch<SetStateAction<Skill[]>>;
  skill?: Skill;
  editSkill?: (skill: Skill) => void;
  openNow?: boolean;
  setOpenNow?: Dispatch<SetStateAction<boolean>>;
}

const SkillModal = ({
  add,
  setSkills,
  editSkill,
  openNow,
  skill,
  setOpenNow,
}: IProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState('');
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

  const handleAddSkill = () => {
    setSkills((prev: Skill[]) => [
      ...prev,
      {
        id: nanoid(),
        title,
        progress,
        image,
      },
    ]);
    setOpen(false);
    setOpenNow && setOpenNow(false);
  };

  const handleEditSkill = () => {
    editSkill!({ id: skill?.id as string, title, progress, image });
    setOpen(false);
    setOpenNow && setOpenNow(false);
  };

  const handleSave = () => {
    if (add) {
      handleAddSkill();
      return;
    }
    handleEditSkill();
  };

  useEffect(() => {
    if (openNow) setOpen(true);
  }, [openNow]);

  useEffect(() => {
    if (skill) {
      setTitle(skill.title);
      setProgress(skill.progress);
      setImage(skill.image);
    }
  }, [skill]);

  return (
    <>
      {add && (
        <div
          onClick={() => setOpen(true)}
          className="p-1 rounded-full text-yellowColor/30 flex items-center justify-center border-2 border-yellowColor/30 hover:border-yellowColor hover:text-yellowColor cursor-pointer"
        >
          <PlusIcon className="h-5 w-5" />
        </div>
      )}
      {open && (
        <div className="fixed left-0 top-0 w-screen h-screen z-30 bg-black/50 flex items-center justify-center">
          <div className="relative w-[600px] p-5 bg-grayColor rounded-md">
            <HeaderTitle headerTitle={add ? 'Add Skill' : 'Edit Skill'} />

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
              <div className="space-y-2">
                <label htmlFor="" className="fieldLabel">
                  Progress %
                </label>
                <input
                  value={progress}
                  onChange={(e) => setProgress(parseInt(e.target.value))}
                  type="number"
                  min={1}
                  max={100}
                  className="fieldInput w-full"
                />
              </div>

              <div className="flex items-center gap-5 justify-between">
                <label htmlFor="" className="fieldLabel">
                  Image
                </label>
                <div className="max-w-[50px]">
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
            </div>
            <SaveButton clickHandler={handleSave} />
            <div
              onClick={() => {
                setOpenNow && setOpenNow(false);
                setOpen(false);
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

export default SkillModal;
