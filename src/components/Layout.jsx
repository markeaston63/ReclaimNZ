import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Assuming Header.jsx is in the same directory
import Footer from './Footer'; // Assuming Footer.jsx is in the same directory

const Layout = () => {
  return (
    // This div provides the overall flex column layout for header, main, and footer
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Main content area: Removed 'container mx-auto' to allow full width.
          Padding should now be applied within individual page components (e.g., HomePage). */}
      <main className="flex-grow">
        <Outlet /> {/* Renders the content of the current route */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
