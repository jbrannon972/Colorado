import React from 'react';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({ label, selected = false, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`
        h-button-compact px-md rounded-pill text-label
        transition-smooth touch-opacity flex items-center gap-1
        ${selected
          ? 'bg-accent-blue text-frost-white'
          : 'bg-pale-ice bg-opacity-15 text-pale-ice hover:bg-accent-blue hover:bg-opacity-20'
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
};
