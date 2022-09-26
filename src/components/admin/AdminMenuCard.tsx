import { Dispatch, SetStateAction } from 'react';

interface IProps {
  text: string;
  active: boolean;
  setMenu: Dispatch<SetStateAction<string>>;
}

const AdminMenuCard = ({ text, active, setMenu }: IProps) => {
  return (
    <div
      onClick={() => setMenu(text.toLocaleLowerCase())}
      className={`flex p-5 transition duration-75 ${
        active ? 'bg-yellowColor/20' : 'bg-transparent'
      } hover:bg-yellowColor/20 cursor-pointer`}
    >
      <h3 className="text-xl text-yellowColor ">{text}</h3>
    </div>
  );
};

export default AdminMenuCard;
