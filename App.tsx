
import React, { useState, useEffect, useCallback } from 'react';
import type { Server } from './types';
import { SERVERS } from './constants';
import Header from './components/Header';
import ConnectionButton from './components/ConnectionButton';
import ServerSelector from './components/ServerSelector';
import StatusDisplay from './components/StatusDisplay';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [selectedServer, setSelectedServer] = useState<Server>(SERVERS[0]);
  const [connectionTime, setConnectionTime] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('Disconnected');

  useEffect(() => {
    // Fix: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isConnected) {
      timer = setInterval(() => {
        setConnectionTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isConnected]);

  const handleConnectToggle = useCallback(() => {
    if (isConnecting) return;

    setIsConnecting(true);
    if (isConnected) {
      // Disconnect logic
      setStatusText('Disconnecting...');
      setTimeout(() => {
        setIsConnected(false);
        setIsConnecting(false);
        setConnectionTime(0);
        setStatusText('Disconnected');
      }, 1500);
    } else {
      // Connect logic with multi-step security check simulation
      const connectionSteps = [
        { message: 'Initiating Connection...', duration: 500 },
        { message: 'Authenticating...', duration: 700 },
        { message: 'Establishing Secure Tunnel...', duration: 800 },
        { message: 'Verifying Encryption...', duration: 500 },
      ];
      
      let delay = 0;
      for (const step of connectionSteps) {
        setTimeout(() => setStatusText(step.message), delay);
        delay += step.duration;
      }
      
      setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
        setStatusText('Connected');
      }, delay);
    }
  }, [isConnected, isConnecting]);
  
  const handleServerSelect = (server: Server) => {
    if (!isConnected && !isConnecting) {
      setSelectedServer(server);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans flex flex-col items-center p-4 selection:bg-teal-400/20">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center space-y-8 mt-8">
          <ConnectionButton
            isConnected={isConnected}
            isConnecting={isConnecting}
            onClick={handleConnectToggle}
          />
          <div className="text-center">
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${isConnected ? 'text-teal-400' : 'text-gray-400'}`}>
              {statusText}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {isConnected ? "Your connection is secure" : isConnecting ? "This may take a moment" : "Select a location to start"}
            </p>
          </div>

          <StatusDisplay 
            isConnected={isConnected} 
            connectionTime={connectionTime} 
            originalIp="192.168.1.10"
            newIp={selectedServer.ip}
          />
        </main>
        <footer className="py-6">
           <ServerSelector 
            servers={SERVERS}
            selectedServer={selectedServer}
            onSelect={handleServerSelect}
            disabled={isConnected || isConnecting}
          />
        </footer>
      </div>
    </div>
  );
};

export default App;
