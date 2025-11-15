import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../ui';

interface MenuItem {
  label: string;
  path: string;
  icon: keyof typeof Icons;
}

const menuItems: MenuItem[] = [
  { label: 'Timeline', path: '/', icon: 'Calendar' },
  { label: 'Activities', path: '/activities', icon: 'Target' },
  { label: 'Dining', path: '/dining', icon: 'Utensils' },
  { label: 'Packing', path: '/packing', icon: 'CheckSquare' },
  { label: 'Family', path: '/family', icon: 'Users' },
  { label: 'Settings', path: '/settings', icon: 'Settings' },
];

export const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Bigger and on the right */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-icy-blue bg-opacity-40 touch-opacity transition-smooth hover:bg-opacity-60 active:scale-95"
        aria-label="Open menu"
      >
        <Icons.Menu size={28} className="text-frost-white" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-deep-navy bg-opacity-90 z-40 transition-menu backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel - Slides from the right */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-gradient-to-b from-icy-blue to-deep-navy border-l border-pale-ice border-opacity-20
          z-50 transition-menu w-80 shadow-2xl safe-top safe-bottom
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-lg border-b border-pale-ice border-opacity-20">
          <h2 className="text-h1 text-frost-white">Lake Dillon</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-deep-navy bg-opacity-40 touch-opacity transition-smooth hover:bg-opacity-60"
            aria-label="Close menu"
          >
            <Icons.X size={24} className="text-frost-white" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="py-md">
          {menuItems.map((item) => {
            const IconComponent = Icons[item.icon];
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="w-full flex items-center gap-4 px-lg py-4 hover:bg-deep-navy hover:bg-opacity-50 transition-smooth text-left touch-opacity active:bg-opacity-70 rounded-lg mx-2"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-accent-blue bg-opacity-15">
                  <IconComponent size={24} className="text-accent-blue" />
                </div>
                <span className="text-h3 text-frost-white">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Trip Info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-lg border-t border-pale-ice border-opacity-20 bg-deep-navy bg-opacity-40">
          <p className="text-body-compact text-pale-ice">Thanksgiving 2025</p>
          <p className="text-label text-accent-blue mt-1">Nov 20-28</p>
        </div>
      </div>
    </>
  );
};
