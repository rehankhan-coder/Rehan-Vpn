
import React, { useState, useRef, useEffect } from 'react';
import type { Server } from '../types';
import GlobeIcon from './icons/GlobeIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface ServerSelectorProps {
  servers: Server[];
  selectedServer: Server;
  onSelect: (server: Server) => void;
  disabled: boolean;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({ servers, selectedServer, onSelect, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (server: Server) => {
    onSelect(server);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between p-4 rounded-xl bg-gray-800 border border-gray-700 transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-teal-500'}`}
      >
        <div className="flex items-center space-x-4">
          <GlobeIcon className="w-6 h-6 text-gray-400" />
          <div>
            <div className="text-left text-sm text-gray-400">Location</div>
            <div className="text-left font-semibold text-gray-100">{selectedServer.flag} {selectedServer.name}</div>
          </div>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-10 overflow-hidden animate-fade-in-up">
          <ul>
            {servers.map((server) => (
              <li key={server.id}>
                <button
                  onClick={() => handleSelect(server)}
                  className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="text-xl mr-4">{server.flag}</span>
                  <div>
                    <span className="font-semibold text-gray-100">{server.name}</span>
                    <span className="text-sm text-gray-400 ml-2">{server.location}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Fix: Removed 'jsx' prop from style tag to fix TypeScript error. This is not a Next.js project. */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ServerSelector;
