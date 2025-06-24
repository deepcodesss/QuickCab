import React from 'react';

const Footer = () => {
  return (
    <footer className="block w-full py-2 px-1.5 text-center bg-white text-gray-500 text-sm border-t border-gray-200">
      © {new Date().getFullYear()} <span className="font-semibold">QuickCab</span> | Book Your Ride
    </footer>
  );
};

export default Footer;