import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container content mt-4">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;