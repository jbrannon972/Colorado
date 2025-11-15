import React from 'react';
import { Layout } from '../components/layout';
import { Card, Icons } from '../components/ui';
import { familyMembers } from '../data/family';

export const FamilyPage: React.FC = () => {
  return (
    <Layout title="Family">
      <div className="space-y-lg">
        <h1 className="text-h1 text-frost-white">Family Members</h1>

        <div className="space-y-md">
          {familyMembers.map((member) => (
            <Card key={member.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-h3 text-frost-white">{member.name}</h3>
                  {member.age && (
                    <p className="text-body-compact text-pale-ice mt-1">
                      Age: {member.age} {member.age === 1.5 ? 'months' : 'years'}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {member.isPregnant && (
                    <Icons.Pregnant size={20} className="text-accent-blue" />
                  )}
                  {member.isToddler && (
                    <Icons.Baby size={20} className="text-accent-blue" />
                  )}
                </div>
              </div>

              {member.specialNeeds && member.specialNeeds.length > 0 && (
                <div className="mt-md pt-sm border-t border-pale-ice border-opacity-20">
                  <p className="text-label text-pale-ice mb-1">Special Considerations:</p>
                  <ul className="space-y-1">
                    {member.specialNeeds.map((need, index) => (
                      <li key={index} className="text-body-compact text-pale-ice flex items-start gap-2">
                        <Icons.Info size={14} className="mt-0.5 flex-shrink-0" />
                        {need}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};
