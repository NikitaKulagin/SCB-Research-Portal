import React from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      <div className="container content mt-4">
        {children}
      </div>
      <AdminFooter />
    </>
  );
}

export default AdminLayout;