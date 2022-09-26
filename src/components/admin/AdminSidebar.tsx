import React from 'react';
import AdminMenuCard from './AdminMenuCard';

interface IProps {
  setMenu: Function;
  menu: string;
}

const AdminSidebar = ({ setMenu, menu }: IProps) => {
  return (
    <div className="bg-grayColor border-r-2 border-black/30 h-screen w-[20%]">
      <AdminMenuCard
        active={menu === 'pageinfo'}
        setMenu={setMenu}
        text="PageInfo"
      />
      <AdminMenuCard
        active={menu === 'projects'}
        setMenu={setMenu}
        text="Projects"
      />
      <AdminMenuCard
        active={menu === 'experiences'}
        setMenu={setMenu}
        text="Experiences"
      />
    </div>
  );
};

export default AdminSidebar;
