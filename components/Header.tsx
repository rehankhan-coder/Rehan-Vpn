import React from 'react';
import LockIcon from './icons/LockIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center py-4">
      <div className="flex items-center justify-center space-x-3">
        <LockIcon className="w-6 h-6 text-teal-400" />
        <h1 className="text-2xl font-bold tracking-wider text-gray-100">His Rehan Vpn</h1>
      </div>
    </header>
  );
};

export default Header;