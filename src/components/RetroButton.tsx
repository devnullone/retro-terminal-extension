import React from 'react';

interface RetroButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const RetroButton: React.FC<RetroButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  disabled = false 
}) => {
  const baseClasses = "font-mono uppercase text-xl px-6 py-2 transition-all duration-75 active:translate-y-1 border-2 select-none";
  
  const variants = {
    primary: "border-retro-accent text-retro-bg bg-retro-accent hover:bg-transparent hover:text-retro-accent",
    secondary: "border-retro-text text-retro-text hover:bg-retro-text hover:text-retro-bg"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );
};