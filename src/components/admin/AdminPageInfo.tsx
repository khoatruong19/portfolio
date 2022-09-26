import { Skill, Social } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';
import { trpc } from '../../utils/trpc';
import HeaderTitle from './HeaderTitle';
import SaveButton from './SaveButton';
import SkillModal from './SkillModal';
import SkillsContainer from './SkillsContainer';
import SocialModal from './SocialModal';
import SocialsContainer from './SocialsContainer';

const AdminPageInfo = () => {
  const { data } = trpc.useQuery(['pageInfo.getAllDetails']);
  const { mutate, isError, isLoading } = trpc.useMutation([
    'pageInfo.updatePageInfo',
  ]);
  const fileInputHeroRef = useRef<HTMLInputElement>(null);
  const fileInputProfileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [backgroundInformation, setBackgroundInformation] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [uploadHeroImageLoading, setUploadHeroImageLoading] = useState(false);
  const [uploadProfilePicLoading, setUploadProfilePicLoading] = useState(false);

  const handleUpdatePageIngo = () => {
    mutate(
      {
        name,
        role,
        heroImage,
        backgroundInformation,
        phoneNumber,
        email,
        address,
        profilePic: profileImage,
        skills,
        socials,
      },
      {
        onError: (error) => alert(error.message),
        onSuccess: (data) => alert(data?.message),
      }
    );
  };

  const handleUploadHeroImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadHeroImageLoading(true);
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
    setHeroImage(data.secure_url);
    setUploadHeroImageLoading(false);
  };

  const handleUploadProfilePicImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadProfilePicLoading(true);
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
    setProfileImage(data.secure_url);
    setUploadProfilePicLoading(false);
  };

  useEffect(() => {
    if (data) {
      setName(data.name);
      setRole(data.role);
      setHeroImage(data.heroImage);
      setBackgroundInformation(data.backgroundInformation);
      setProfileImage(data.profilePic);
      setPhoneNumber(data.phoneNumber);
      setEmail(data.email);
      setAddress(data.address);
      setSkills(data.skills);
      setSocials(data.socials);
    }
  }, [data]);

  return (
    <div className="h-[100%] w-[100%] relative">
      <HeaderTitle headerTitle="Page Info" />

      <div className="w-[50%] mx-auto pb-4 space-y-8 h-[90%] overflow-y-scroll scrollbar-none">
        <div className="space-y-2">
          <label htmlFor="" className="fieldLabel">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="fieldInput w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="" className="fieldLabel">
            Role
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            type="text"
            className="fieldInput w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="" className="fieldLabel">
            Hero Image
          </label>
          <div className="flex items-center gap-3">
            <div className="max-w-[340px]">
              <img src={heroImage} alt="" />
            </div>
            <div>
              <input
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                type="text"
                className="fieldInput w-full h-10"
              />
              {uploadHeroImageLoading ? (
                <span className="text-md font-semibold text-yellowColor/40">
                  Waiting
                </span>
              ) : (
                <button
                  onClick={() => fileInputHeroRef.current?.click()}
                  className="heroButton mt-3"
                >
                  Upload
                </button>
              )}
              <input
                onChange={handleUploadHeroImage}
                ref={fileInputHeroRef}
                type="file"
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="" className="fieldLabel">
            Background Information
          </label>
          <textarea
            value={backgroundInformation}
            onChange={(e) => setBackgroundInformation(e.target.value)}
            className="fieldInput w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="" className="fieldLabel">
            Profile Picture
          </label>
          <div className="flex items-center gap-3">
            <div className="max-w-[340px]">
              <img src={profileImage} alt="" />
            </div>
            <div>
              <input
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                type="text"
                className="fieldInput w-full h-10"
              />
              {uploadProfilePicLoading ? (
                <span className="text-md font-semibold text-yellowColor/40">
                  Waiting
                </span>
              ) : (
                <button
                  onClick={() => fileInputProfileRef.current?.click()}
                  className="heroButton mt-3"
                >
                  Upload
                </button>
              )}

              <input
                onChange={handleUploadProfilePicImage}
                ref={fileInputProfileRef}
                type="file"
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="" className="fieldLabel">
            Phone Number
          </label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            className="fieldInput w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="" className="fieldLabel">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="fieldInput w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="" className="fieldLabel">
            Address
          </label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="fieldInput w-full"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="fieldLabel">
              Skills
            </label>
            <SkillModal add setSkills={setSkills} />
          </div>
          <SkillsContainer skills={skills} setSkills={setSkills} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="fieldLabel">
              Socials
            </label>
            <SocialModal add setSocials={setSocials} />
          </div>
          <SocialsContainer socials={socials} setSocials={setSocials} />
        </div>
      </div>

      <div className="w-[80%] fixed right-0 bottom-0 h-16 bg-black">
        <SaveButton clickHandler={handleUpdatePageIngo} />
      </div>
    </div>
  );
};

export default AdminPageInfo;
