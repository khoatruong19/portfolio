import React from 'react';

interface IProps {
  headerTitle: string;
}

const HeaderTitle = ({ headerTitle }: IProps) => {
  return (
    <h1 className="text-4xl font-semibold text-yellowColor text-center mb-2">
      {headerTitle}
    </h1>
  );
};

export default HeaderTitle;
