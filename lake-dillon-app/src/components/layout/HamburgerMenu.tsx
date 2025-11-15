import React, { useState, useEffect, useRef } from 'react';
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
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  // Create dedicated portal container and lock body scroll
  useEffect(() => {
    if (isOpen) {
      // Create a dedicated container for the portal
      const portalDiv = document.createElement('div');
      portalDiv.id = 'hamburger-menu-portal';
      portalDiv.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; z-index: 999999 !important; pointer-events: none !important;';
      document.body.appendChild(portalDiv);
      portalContainerRef.current = portalDiv;

      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';

      return () => {
        // Cleanup
        if (portalContainerRef.current) {
          document.body.removeChild(portalContainerRef.current);
          portalContainerRef.current = null;
        }
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
      };
    }
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const menuContent = isOpen ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        pointerEvents: 'auto',
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(10, 25, 41, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '288px',
          maxWidth: '80vw',
          background: 'linear-gradient(to bottom, #1E4A68, #0A1929)',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.5)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            paddingTop: 'max(16px, env(safe-area-inset-top))',
            borderBottom: '1px solid rgba(179, 217, 240, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF' }}>
            Lake Dillon
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Close menu"
          >
            <Icons.X size={20} style={{ color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Menu Items */}
        <nav style={{ flex: 1, paddingTop: '8px', paddingBottom: '8px' }}>
          {menuItems.map((item) => {
            const IconComponent = Icons[item.icon];
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background-color 150ms ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(10, 25, 41, 0.3)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <IconComponent size={20} style={{ color: '#4DB8E8' }} />
                <span style={{ fontSize: '15px', color: '#FFFFFF' }}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Trip Info */}
        <div
          style={{
            padding: '16px',
            paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
            borderTop: '1px solid rgba(179, 217, 240, 0.1)',
            backgroundColor: 'rgba(10, 25, 41, 0.2)',
          }}
        >
          <p style={{ fontSize: '13px', color: '#B3D9F0' }}>Thanksgiving 2025</p>
          <p style={{ fontSize: '11px', color: '#4DB8E8', marginTop: '4px' }}>
            Nov 20-28 • 8 Days
          </p>
        </div>
      </div>
    </div>
  ) : null;

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

      {/* Portal to dedicated container */}
      {portalContainerRef.current && menuContent && createPortal(menuContent, portalContainerRef.current)}
    </>
  );
};
