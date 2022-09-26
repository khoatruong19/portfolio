import React, { useState } from 'react';
import AdminLoginForm from '../components/admin/AdminLoginForm';
import AdminPanel from '../components/admin/AdminPanel';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <header>
        <title>Admin</title>
      </header>
      <div className="min-h-screen bg-grayColor">
        {isAuthenticated ? (
          <AdminPanel />
        ) : (
          <div className="h-screen w-screen flex items-center justify-center ">
            <AdminLoginForm setIsAuthenticated={setIsAuthenticated} />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPage;
