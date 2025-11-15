import React from 'react';
import { TopNav } from './TopNav';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  rightAction?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, rightAction }) => {
  return (
    <div className="min-h-screen bg-deep-navy flex flex-col">
      <TopNav title={title} rightAction={rightAction} />
      <main className="flex-1 container-mobile py-lg safe-bottom">
        {children}
      </main>
    </div>
  );
};
