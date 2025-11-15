import React from 'react';
import { HamburgerMenu } from './HamburgerMenu';

interface TopNavProps {
  title?: string;
  rightAction?: React.ReactNode;
}

export const TopNav: React.FC<TopNavProps> = ({ title, rightAction }) => {
  return (
    <div className="sticky top-0 z-50 bg-deep-navy border-b border-pale-ice border-opacity-20 safe-top">
      <div className="h-nav px-md flex items-center justify-between">
        {/* Left: Title or Spacer */}
        {title ? (
          <h2 className="text-h2 text-frost-white">{title}</h2>
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
