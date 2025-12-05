import React from 'react';

export const Scanlines: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-full w-full overflow-hidden">
      {/* Scanline pattern */}
      <div 
        className="absolute inset-0 z-50 opacity-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
          backgroundSize: '100% 4px'
        }}
      />
      {/* Flicker effect */}
      <div className="absolute inset-0 bg-retro-accent/5 animate-pulse-fast pointer-events-none mix-blend-overlay" />
    </div>
  );
};