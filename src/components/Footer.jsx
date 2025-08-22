import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 text-black p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} ReclaimNZ. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;