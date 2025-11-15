import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`card transition-card ${onClick ? 'cursor-pointer hover:border-opacity-40' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
