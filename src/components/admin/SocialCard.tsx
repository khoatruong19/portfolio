import { Social } from '@prisma/client';
import { SocialIcon } from 'react-social-icons';
import React from 'react';

interface IProps {
  social: Social;
}

const SocialCard = ({ social }: IProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-[60px]">
        <SocialIcon url={social.url} />
      </div>
      <div className=" max-w-[550px] break-words">
        <p className="break-words text-xl font-semibold text-white mx-2">
          {social.url}
        </p>
      </div>
    </div>
  );
};

export default SocialCard;
