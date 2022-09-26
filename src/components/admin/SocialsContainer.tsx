import { Social } from '@prisma/client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import SocialCard from './SocialCard';
import SocialModal from './SocialModal';

interface IProps {
  socials: Social[];
  setSocials: Dispatch<SetStateAction<Social[]>>;
}

const SocialsContainer = ({ socials, setSocials }: IProps) => {
  const [triggerOpenModal, setTriggerOpenModal] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState<Social>();

  const handleDeleteSocial = (id: string) => {
    const temp = socials.filter((social) => social.id !== id);
    setSocials(temp);
  };
  const handleEditSocial = (social: Social) => {
    const socialIndex = socials.findIndex((item) => item.id === social.id);
    const temp = socials;
    temp[socialIndex] = social;
    setSocials(temp);
    setTriggerOpenModal(false);
  };
  const handleOpenModal = (social: Social) => {
    setSelectedSocial(social);
    setTriggerOpenModal(true);
  };
  return (
    <div className="space-y-3 mt-3">
      {socials.map((social) => (
        <div key={social.id} className="flex gap-2">
          <div onClick={() => setSelectedSocial(social)}>
            <SocialCard social={social} />
          </div>
          <div className="flex-1 flex gap-4 items-center">
            <PencilIcon
              onClick={() => handleOpenModal(social)}
              className="w-5 h-5 text-yellowColor/80 cursor-pointer hover:text-yellowColor"
            />
            <TrashIcon
              onClick={() => handleDeleteSocial(social.id)}
              className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
            />
          </div>
        </div>
      ))}
      <SocialModal
        social={selectedSocial}
        setSocials={setSocials}
        editSocial={handleEditSocial}
        openNow={triggerOpenModal}
        setOpenNow={setTriggerOpenModal}
      />
    </div>
  );
};

export default SocialsContainer;
