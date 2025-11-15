import React from 'react';
import { Layout } from '../components/layout';

export const PackingPage: React.FC = () => {
  return (
    <Layout title="Packing">
      <div className="space-y-lg">
        <h1 className="text-h1 text-frost-white">Packing List</h1>
        <div className="text-body text-pale-ice">
          <p>Create and manage your packing list for the trip.</p>
          <p className="mt-4 text-label opacity-70">(Feature coming soon)</p>
        </div>
      </div>
    </Layout>
  );
};
