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
        chip gap-2
        ${selected ? 'chip-selected' : 'chip-unselected'}
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
