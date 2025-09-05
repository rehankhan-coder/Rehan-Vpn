
import React from 'react';
import UnlockIcon from './icons/UnlockIcon';
import LockIcon from './icons/LockIcon';

interface StatusDisplayProps {
  isConnected: boolean;
  connectionTime: number;
  originalIp: string;
  newIp: string;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const StatusDisplay: React.FC<StatusDisplayProps> = ({ isConnected, connectionTime, originalIp, newIp }) => {
  return (
    <div className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 space-y-3">
       <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">Status</span>
        <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium ${isConnected ? 'bg-teal-500/20 text-teal-400' : 'bg-gray-700 text-gray-300'}`}>
          {isConnected ? <LockIcon className="w-3 h-3"/> : <UnlockIcon className="w-3 h-3"/>}
          <span>{isConnected ? 'Secured' : 'Not Secured'}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">Duration</span>
        <span className="font-mono text-gray-100">{formatTime(connectionTime)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">Original IP</span>
        <span className="font-mono text-gray-100">{originalIp}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">VPN IP</span>
        <span className={`font-mono transition-colors duration-300 ${isConnected ? 'text-teal-400' : 'text-gray-500'}`}>
            {isConnected ? newIp : '---.---.---.---'}
        </span>
      </div>
    </div>
  );
};

export default StatusDisplay;
