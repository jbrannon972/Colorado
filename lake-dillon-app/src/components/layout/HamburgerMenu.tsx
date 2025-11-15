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
      {/* Hamburger Button - Clean, native touch target */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-11 h-11 -mr-1 touch-opacity"
        aria-label="Open menu"
      >
        <Icons.Menu size={24} className="text-frost-white" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-deep-navy bg-opacity-60 z-40 transition-menu backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel - Slides from the right, native iOS feel */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-gradient-to-b from-icy-blue to-deep-navy
          z-50 transition-menu w-72 shadow-2xl safe-top safe-bottom
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)' }}
      >
        {/* Header - Minimal */}
        <div className="flex items-center justify-between px-md py-md border-b border-pale-ice border-opacity-10">
          <h2 className="text-h2 text-frost-white font-bold">Lake Dillon</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-10 h-10 touch-opacity"
            aria-label="Close menu"
          >
            <Icons.X size={20} className="text-frost-white" />
          </button>
        </div>

        {/* Menu Items - Clean list */}
        <nav className="flex-1 py-sm">
          {menuItems.map((item) => {
            const IconComponent = Icons[item.icon];
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="w-full flex items-center gap-3 px-md py-3 transition-smooth text-left touch-opacity active:bg-deep-navy active:bg-opacity-30"
              >
                <IconComponent size={20} className="text-accent-blue" />
                <span className="text-body text-frost-white">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Trip Info at bottom - Compact */}
        <div className="px-md py-md border-t border-pale-ice border-opacity-10 bg-deep-navy bg-opacity-20">
          <p className="text-body-compact text-pale-ice">Thanksgiving 2025</p>
          <p className="text-label text-accent-blue mt-1">Nov 20-28 • 8 Days</p>
        </div>
      </div>
    </>
  );
};
