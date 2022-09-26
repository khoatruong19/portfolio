import React, { Dispatch, SetStateAction, useState } from 'react';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

interface IProps {
  add?: boolean;
  value?: string;
  index?: number;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  points?: string[];
  setPoints?: Dispatch<SetStateAction<string[]>>;
}

const ExperiencePoint = ({ add, value, setPoints, points }: IProps) => {
  const [point, setPoint] = useState(value || '');
  const [edit, setEdit] = useState(false);

  const handleAddPoint = () => {
    if (point.length < 4) {
      alert('Must be greater than 3!');
      return;
    }

    setPoints!([...points!, point]);
  };

  const handleEditExperience = () => {
    const index = points!.findIndex((item) => item === value);
    const temp = points;
    if (index && temp) {
      temp![index] = point!;
      setPoints!(temp);
      setEdit(false);
    }
  };

  const handleDeleteExperience = () => {
    const temp = points!.filter((item) => item !== point);

    setPoints!(temp);
  };

  const handleConfirm = () => {
    if (add) handleAddPoint();
    else handleEditExperience();
  };

  return (
    <div className="flex items-center gap-2">
      {add || edit ? (
        <>
          <input
            value={point}
            onChange={(e) => setPoint(e.target.value)}
            type="text"
            className="fieldInput w-[300px]"
          />
          <div
            onClick={handleConfirm}
            className="text-green-400 hover:text-green-600 cursor-pointer"
          >
            <CheckIcon className="w-6 h-6" />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <p className="text-white">{point}</p>
          <div className="flex items-center gap-2">
            <PencilIcon
              onClick={() => setEdit(true)}
              className="w-5 h-5 cursor-pointer text-yellowColor/80 hover:text-yellowColor"
            />
            <TrashIcon
              onClick={handleDeleteExperience}
              className="w-5 h-5 cursor-pointer text-red-400 hover:text-red-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperiencePoint;
