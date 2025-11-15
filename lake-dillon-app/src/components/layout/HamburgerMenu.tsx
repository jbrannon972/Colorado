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
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-sm touch-opacity transition-smooth"
        aria-label="Open menu"
      >
        <Icons.Menu size={20} className="text-frost-white" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-deep-navy bg-opacity-80 z-40 transition-menu"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-deep-navy border-r border-pale-ice border-opacity-20
          z-50 transition-menu w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-lg border-b border-pale-ice border-opacity-20">
          <h2 className="text-h2 text-frost-white">Lake Dillon</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-sm touch-opacity transition-smooth"
            aria-label="Close menu"
          >
            <Icons.X size={16} className="text-frost-white" />
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
                className="w-full flex items-center gap-md px-lg py-md hover:bg-icy-blue transition-smooth text-left touch-opacity"
              >
                <IconComponent size={20} className="text-pale-ice" />
                <span className="text-body text-frost-white">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};
