import { useState } from 'react';
import AdminExperiences from './AdminExperiences';
import AdminPageInfo from './AdminPageInfo';
import AdminProjects from './AdminProjects';
import AdminSidebar from './AdminSidebar';

const AdminPanel = () => {
  const [menu, setMenu] = useState('pageinfo');

  const viewSection = () => {
    if (menu === 'pageinfo') return <AdminPageInfo />;
    else if (menu === 'projects') return <AdminProjects />;
    else if (menu === 'experiences') return <AdminExperiences />;
  };

  return (
    <div className="flex">
      <AdminSidebar menu={menu} setMenu={setMenu} />
      <div className="flex-1 max-h-screen py-2 overflow-y-scroll scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-yellowColor/80">
        {viewSection()}
      </div>
    </div>
  );
};

export default AdminPanel;
