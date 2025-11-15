import React from 'react';
import { Layout } from '../components/layout';

export const SettingsPage: React.FC = () => {
  return (
    <Layout title="Settings">
      <div className="space-y-lg">
        <h1 className="text-h1 text-frost-white">Settings</h1>
        <div className="text-body text-pale-ice">
          <p>App settings and preferences.</p>
          <p className="mt-4 text-label opacity-70">(Feature coming soon)</p>
        </div>
      </div>
    </Layout>
  );
};
