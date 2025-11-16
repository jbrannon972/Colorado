import React from 'react';
import { HamburgerMenu } from './HamburgerMenu';

interface TopNavProps {
  title?: string;
  rightAction?: React.ReactNode;
}

export const TopNav: React.FC<TopNavProps> = ({ title, rightAction }) => {
  return (
    <div className="nav-bar safe-top">
      <div className="h-full px-lg flex items-center justify-between">
        {/* Left: Title or Spacer */}
        {title ? (
          <h3 className="text-h3 text-frost-white">{title}</h3>
        ) : (
          <div className="w-10"></div>
        )}

        {/* Right: Hamburger Menu and optional action */}
        <div className="flex items-center gap-2">
          {rightAction && <div>{rightAction}</div>}
          <HamburgerMenu />
        </div>
      </div>
    </div>
  );
};
