import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ isAuthenticated, children }) {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <div className="container content mt-4">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;