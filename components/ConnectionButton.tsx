
import React from 'react';
import PowerIcon from './icons/PowerIcon';

interface ConnectionButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onClick: () => void;
}

const ConnectionButton: React.FC<ConnectionButtonProps> = ({ isConnected, isConnecting, onClick }) => {
  const baseClasses = "relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-opacity-50";
  
  const disconnectedClasses = "bg-gray-800 border-4 border-gray-700 hover:bg-gray-700 hover:border-teal-500/50 focus:ring-teal-500";
  const connectedClasses = "bg-teal-500 border-4 border-teal-400 shadow-[0_0_20px_rgba(20,208,202,0.6)] hover:bg-teal-600 focus:ring-teal-300";
  const connectingClasses = `animate-pulse ${isConnected ? 'bg-red-500/80 border-red-400/80' : 'bg-teal-500/80 border-teal-400/80'}`;

  const buttonClasses = `${baseClasses} ${isConnecting ? connectingClasses : (isConnected ? connectedClasses : disconnectedClasses)}`;

  return (
    <div className="relative flex items-center justify-center">
       {isConnecting && !isConnected && <div className="absolute w-60 h-60 bg-teal-500/20 rounded-full animate-ping"></div>}
       {isConnected && <div className="absolute w-60 h-60 bg-teal-500/20 rounded-full animate-pulse"></div>}
      <button
        onClick={onClick}
        className={buttonClasses}
        aria-label={isConnected ? 'Disconnect from VPN' : 'Connect to VPN'}
      >
        <PowerIcon className={`w-20 h-20 transition-colors duration-300 ${isConnected ? 'text-white' : 'text-gray-500'}`} />
      </button>
    </div>
  );
};

export default ConnectionButton;
