import React from 'react';

interface IProps {
  text: string;
}

const SectionHeader = ({ text }: IProps) => {
  return (
    <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
      {text}
    </h3>
  );
};

export default SectionHeader;
