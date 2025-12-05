
import React, { useState, useEffect, useCallback } from 'react';
import { Scanlines } from './components/Scanlines';
import { RetroButton } from './components/RetroButton';
import { AppStatus } from './types';
import { LOADING_MESSAGES, APP_NAME, VERSION } from './constants';
import { Terminal, Power, Radio, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.LOADING);
  const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
  const [toggleActive, setToggleActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Simulation of boot sequence
  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < LOADING_MESSAGES.length) {
        setLoadingText(LOADING_MESSAGES[step]);
        step++;
      } else {
        clearInterval(interval);
        setStatus(AppStatus.ACTIVE);
        addLog("SYSTEM READY.");
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 8));
  };

  const handleToggle = useCallback(() => {
    setToggleActive(prev => {
      const newState = !prev;
      addLog(newState ? "PROTOCOL: ENABLED" : "PROTOCOL: DISABLED");
      return newState;
    });
  }, []);

  const handlePing = useCallback(() => {
    addLog("PINGING LOCALHOST...");
    setTimeout(() => {
      addLog("RESPONSE: 2ms");
    }, 400);
  }, []);

  if (status === AppStatus.LOADING) {
    return (
      <div 
        className="w-[450px] min-h-[600px] h-full bg-retro-bg text-retro-accent font-mono flex flex-col items-center justify-center p-8 relative overflow-hidden"
        style={{ backgroundColor: '#000000', color: '#FFFF00', fontFamily: 'VT323, monospace' }} // Fallback styles per rules.md
      >
        <Scanlines />
        <div className="text-4xl font-bold mb-4 animate-pulse">{APP_NAME}</div>
        <div className="text-xl">{loadingText}</div>
        <div className="mt-8 w-64 h-4 border-2 border-retro-accent p-1" style={{ borderColor: '#FFFF00' }}>
          <div className="h-full bg-retro-accent w-full animate-pulse-fast" style={{ backgroundColor: '#FFFF00' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-[450px] min-h-[900px] bg-retro-bg text-retro-text font-mono relative overflow-y-auto"
      style={{ backgroundColor: '#000000', color: '#FFFFFF', fontFamily: 'VT323, monospace' }} // Fallback styles per rules.md
    >
      <Scanlines />
      
      {/* Header */}
      <header className="border-b-2 border-retro-text p-4 flex justify-between items-center bg-retro-bg sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-retro-accent" />
          <h1 className="text-2xl font-bold tracking-widest">{APP_NAME}</h1>
        </div>
        <div className="text-xs border border-retro-text px-2 py-1">v{VERSION}</div>
      </header>

      <main className="p-6 flex flex-col gap-8">
        
        {/* Welcome Block */}
        <section className="border-l-4 border-retro-accent pl-4 py-2">
          <h2 className="text-3xl text-retro-accent mb-2 uppercase">Retro Extension Activated</h2>
          <p className="text-lg leading-tight opacity-80">
            Welcome, User. The interface is secure.
          </p>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className={`border-2 p-4 flex flex-col items-center justify-center gap-2 transition-colors ${toggleActive ? 'border-retro-accent bg-retro-accent/10' : 'border-retro-dim'}`}>
                <Power className={`w-8 h-8 ${toggleActive ? 'text-retro-accent' : 'text-retro-dim'}`} />
                <span className="uppercase text-sm">Power</span>
                <span className={`text-xl font-bold ${toggleActive ? 'text-retro-accent' : 'text-retro-dim'}`}>
                    {toggleActive ? 'ON' : 'OFF'}
                </span>
            </div>
            <div className="border-2 border-retro-dim p-4 flex flex-col items-center justify-center gap-2">
                <Cpu className="w-8 h-8 text-retro-text" />
                <span className="uppercase text-sm">Memory</span>
                <span className="text-xl font-bold">64K OK</span>
            </div>
        </div>

        {/* Controls */}
        <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
                <Radio className="w-5 h-5 text-retro-accent animate-pulse" />
                <h3 className="text-xl uppercase border-b border-retro-dim w-full">Controls</h3>
            </div>
            <div className="flex gap-4">
                <RetroButton onClick={handleToggle} variant="primary">
                    {toggleActive ? 'DEACTIVATE' : 'ACTIVATE'}
                </RetroButton>
                <RetroButton onClick={handlePing} variant="secondary">
                    PING SYS
                </RetroButton>
            </div>
        </section>

        {/* Log Output */}
        <section className="bg-retro-dim/10 border border-retro-dim p-4 font-mono text-sm h-48 overflow-hidden flex flex-col">
            <h3 className="uppercase text-xs text-retro-dim mb-2 flex justify-between">
                <span>System Log</span>
                <span className="animate-blink">_</span>
            </h3>
            <div className="flex flex-col-reverse h-full overflow-hidden">
                {logs.map((log, i) => (
                    <div key={i} className="mb-1 text-retro-accent/80 whitespace-nowrap overflow-hidden text-ellipsis">
                        {log}
                    </div>
                ))}
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-retro-dim text-xs border-t border-retro-dim/30">
        SECURE CONNECTION ESTABLISHED
      </footer>
    </div>
  );
};

export default App;
