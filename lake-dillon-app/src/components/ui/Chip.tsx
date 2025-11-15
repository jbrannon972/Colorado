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
        chip flex items-center gap-2 transition-smooth touch-opacity
        ${selected ? 'chip-selected' : 'chip-unselected'}
      `}
    >
      {icon}
      {label}
    </button>
  );
};
