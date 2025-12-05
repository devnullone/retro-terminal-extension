
import React, { useState, useEffect, useCallback } from 'react';
import { Scanlines } from './components/Scanlines';
import { RetroButton } from './components/RetroButton';
import { AppStatus } from './types';
import { LOADING_MESSAGES, APP_NAME, VERSION } from './constants';
import { Terminal, Power, Radio, Cpu, ExternalLink, Minimize2, Maximize2 } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.LOADING);
  const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  // Simulation of boot sequence for Last Clicker game
  useEffect(() => {
    let step = 0;
    const gameMessages = [
      "INITIALIZING LAST CLICKER PROTOCOL...",
      "CONNECTING TO EIP-7702 NETWORK...",
      "LOADING GAME CONTRACT...",
      "ESTABLISHING SECURE CONNECTION...",
      "RETRO TERMINAL READY"
    ];
    
    const interval = setInterval(() => {
      if (step < gameMessages.length) {
        setLoadingText(gameMessages[step]);
        step++;
      } else {
        clearInterval(interval);
        setStatus(AppStatus.ACTIVE);
        setConnectionStatus('connected');
        addLog("LAST CLICKER SYSTEM ONLINE");
        addLog("READY TO LAUNCH GAME INTERFACE");
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 8));
  };

  const handleGameLaunch = useCallback(() => {
    setIsGameActive(prev => {
      const newState = !prev;
      addLog(newState ? "LAUNCHING LAST CLICKER INTERFACE..." : "MINIMIZING GAME INTERFACE...");
      setIsMinimized(!newState);
      return newState;
    });
  }, []);

  const handleExternalLaunch = useCallback(() => {
    addLog("OPENING FULL GAME IN NEW TAB...");
    chrome.tabs.create({ 
      url: 'https://7702prj-lastclicker-production.up.railway.app' 
    });
  }, []);

  const handleRefresh = useCallback(() => {
    addLog("REFRESHING GAME STATE...");
    setConnectionStatus('connecting');
    setTimeout(() => {
      setConnectionStatus('connected');
      addLog("GAME STATE SYNCHRONIZED");
    }, 1000);
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
          <h1 className="text-lg font-bold tracking-widest">LAST CLICKER</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-retro-accent' : connectionStatus === 'connecting' ? 'bg-retro-dim animate-pulse' : 'bg-red-500'}`}></div>
          <div className="text-xs border border-retro-text px-2 py-1">EIP-7702</div>
        </div>
      </header>

      {!isGameActive ? (
        <main className="p-6 flex flex-col gap-6">
          {/* Welcome Block */}
          <section className="border-l-4 border-retro-accent pl-4 py-2">
            <h2 className="text-2xl text-retro-accent mb-2 uppercase">Last Clicker Terminal</h2>
            <p className="text-sm leading-tight opacity-80">
              {`> EIP-7702 Game Interface Ready`}
            </p>
          </section>

          {/* Game Status Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`border-2 p-4 flex flex-col items-center justify-center gap-2 transition-colors ${isGameActive ? 'border-retro-accent bg-retro-accent/10' : 'border-retro-dim'}`}>
              <Power className={`w-8 h-8 ${isGameActive ? 'text-retro-accent' : 'text-retro-dim'}`} />
              <span className="uppercase text-sm">Game</span>
              <span className={`text-xl font-bold ${isGameActive ? 'text-retro-accent' : 'text-retro-dim'}`}>
                {isGameActive ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            <div className="border-2 border-retro-dim p-4 flex flex-col items-center justify-center gap-2">
              <Cpu className={`w-8 h-8 ${connectionStatus === 'connected' ? 'text-retro-accent' : 'text-retro-dim'}`} />
              <span className="uppercase text-sm">Network</span>
              <span className={`text-sm font-bold ${connectionStatus === 'connected' ? 'text-retro-accent' : 'text-retro-dim'}`}>
                {connectionStatus.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Controls */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-5 h-5 text-retro-accent animate-pulse" />
              <h3 className="text-xl uppercase border-b border-retro-dim w-full">Game Controls</h3>
            </div>
            <div className="flex flex-col gap-3">
              <RetroButton onClick={handleGameLaunch} variant="primary">
                LAUNCH GAME
              </RetroButton>
              <div className="flex gap-2">
                <RetroButton onClick={handleRefresh} variant="secondary">
                  REFRESH
                </RetroButton>
                <RetroButton onClick={handleExternalLaunch} variant="secondary">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  FULL
                </RetroButton>
              </div>
            </div>
          </section>

          {/* Log Output */}
          <section className="bg-retro-dim/10 border border-retro-dim p-4 font-mono text-sm h-40 overflow-hidden flex flex-col">
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
      ) : (
        <main className="flex flex-col h-full">
          {/* Game Interface Controls */}
          <div className="border-b border-retro-dim p-2 flex justify-between items-center bg-retro-bg">
            <span className="text-xs text-retro-dim uppercase">Game Interface Active</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-retro-accent hover:text-retro-text transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={handleGameLaunch}
                className="text-retro-accent hover:text-retro-text transition-colors text-xs border border-retro-dim px-2 py-1"
              >
                CLOSE
              </button>
            </div>
          </div>

          {/* Embedded Game */}
          <div className={`flex-1 ${isMinimized ? 'h-20' : ''}`}>
            {!isMinimized ? (
              <iframe 
                src="https://7702prj-lastclicker-production.up.railway.app"
                className="w-full h-full border-0"
                style={{ 
                  height: 'calc(900px - 120px)',
                  background: '#000000'
                }}
                title="Last Clicker Game"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            ) : (
              <div className="p-4 text-center">
                <span className="text-retro-dim text-sm">Game minimized - click maximize to restore</span>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="p-2 text-center text-retro-dim text-xs border-t border-retro-dim/30">
        LAST CLICKER EIP-7702 • RETRO TERMINAL v{VERSION}
      </footer>
    </div>
  );
};

export default App;
