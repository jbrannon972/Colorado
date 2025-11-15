import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-11 h-11 -mr-1 touch-opacity"
        aria-label="Open menu"
      >
        <Icons.Menu size={24} className="text-frost-white" />
      </button>

      {/* Portal the menu overlay to body */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[9999]" style={{ position: 'fixed' }}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-deep-navy bg-opacity-60 backdrop-blur-sm"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              transition: 'opacity 250ms ease',
            }}
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className="absolute top-0 right-0 h-full w-72 bg-gradient-to-b from-icy-blue to-deep-navy shadow-2xl"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '288px',
              maxWidth: '80vw',
              transform: 'translateX(0)',
              transition: 'transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-md py-md border-b border-pale-ice border-opacity-10"
                 style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}>
              <h2 className="text-h2 text-frost-white font-bold">Lake Dillon</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-10 h-10 touch-opacity"
                aria-label="Close menu"
              >
                <Icons.X size={20} className="text-frost-white" />
              </button>
            </div>

            {/* Menu Items */}
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

            {/* Trip Info */}
            <div className="px-md py-md border-t border-pale-ice border-opacity-10 bg-deep-navy bg-opacity-20"
                 style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
              <p className="text-body-compact text-pale-ice">Thanksgiving 2025</p>
              <p className="text-label text-accent-blue mt-1">Nov 20-28 • 8 Days</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
