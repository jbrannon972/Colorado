import React from 'react';
import { HamburgerMenu } from './HamburgerMenu';

interface TopNavProps {
  title?: string;
  rightAction?: React.ReactNode;
}

export const TopNav: React.FC<TopNavProps> = ({ title, rightAction }) => {
  return (
    <div className="sticky top-0 z-30 bg-deep-navy border-b border-pale-ice border-opacity-20">
      <div className="h-nav container-mobile flex items-center justify-between">
        {/* Left: Hamburger Menu */}
        <HamburgerMenu />

        {/* Center: Title (optional) */}
        {title && <h2 className="text-h2 text-frost-white">{title}</h2>}

        {/* Right: Action (optional) */}
        {rightAction && <div>{rightAction}</div>}
        {!rightAction && <div className="w-10"></div>} {/* Spacer for alignment */}
      </div>
    </div>
  );
};
