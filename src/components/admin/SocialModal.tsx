import React, { useEffect, useRef, useState } from 'react';
import HeaderTitle from './HeaderTitle';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import SaveButton from './SaveButton';
import { Social } from '@prisma/client';
import { nanoid } from 'nanoid';

interface IProps {
  add?: boolean;
  setSocials: Function;
  social?: Social;
  editSocial?: (social: Social) => void;
  openNow?: boolean;
  setOpenNow?: Function;
}

const SocialModal = ({
  add,
  setSocials,
  social,
  editSocial,
  openNow,
  setOpenNow,
}: IProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleAddSocial = () => {
    setSocials((prev: Social[]) => [
      ...prev,
      {
        id: nanoid(),
        name,
        url,
      },
    ]);
    setOpen(false);
    setOpenNow && setOpenNow(false);
  };

  const handleEditSocial = () => {
    editSocial!({ id: social?.id!, name, url });
    setOpen(false);
    setOpenNow && setOpenNow(false);
  };

  const handleSave = () => {
    if (add) {
      handleAddSocial();
      return;
    }
    handleEditSocial();
  };

  useEffect(() => {
    if (openNow) setOpen(true);
  }, [openNow]);

  useEffect(() => {
    if (social) {
      setName(social.name);
      setUrl(social.url);
    }
  }, [social]);

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
            <HeaderTitle headerTitle={add ? 'Add Social' : 'Edit Social'} />

            <div className="mt-10 space-y-5">
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
                  Url
                </label>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
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

export default SocialModal;
