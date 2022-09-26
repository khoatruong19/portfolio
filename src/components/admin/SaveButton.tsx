import React from 'react';

interface IProps {
  clickHandler: () => void;
}

const SaveButton = ({ clickHandler }: IProps) => {
  return (
    <button
      onClick={clickHandler}
      className="p-3 font-semibold text-xl rounded-md text-gray-400  hover:text-yellowColor bg-grayColor block ml-auto my-1 mr-3"
    >
      Save
    </button>
  );
};

export default SaveButton;
