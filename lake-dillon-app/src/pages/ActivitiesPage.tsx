import React, { useState } from 'react';
import { Layout } from '../components/layout';
import { ActivityCard } from '../components/features/ActivityCard';
import { Input, Chip, Icons } from '../components/ui';
import { activities } from '../data/activities';
import type { Activity } from '../types';

export const ActivitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [toddlerFriendlyOnly, setToddlerFriendlyOnly] = useState(false);
  const [pregnancySafeOnly, setPregnancySafeOnly] = useState(false);

  const categories = ['All', 'Wildlife', 'Hiking', 'Scenic Drive', 'Winter', 'Museum', 'Shopping', 'Brewery', 'Family'];

  const filteredActivities = activities.filter((activity) => {
    // Search filter
    if (searchTerm && !activity.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'All' && !activity.category.includes(selectedCategory)) {
      return false;
    }

    // Toddler friendly filter
    if (toddlerFriendlyOnly && !activity.toddlerFriendly) {
      return false;
    }

    // Pregnancy safe filter
    if (pregnancySafeOnly && !activity.pregnancySafe) {
      return false;
    }

    return true;
  });

  const handleAddToDay = (activity: Activity) => {
    alert(`Adding "${activity.name}" to your timeline. (Feature coming soon: select day & time)`);
  };

  const handleMoreInfo = (activity: Activity) => {
    if (activity.bookingLink) {
      window.open(activity.bookingLink, '_blank');
    } else {
      alert(`More info about "${activity.name}"\n\n${activity.description}`);
    }
  };

  return (
    <Layout title="Activities">
      <div className="space-y-lg">
        {/* Search */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Icons.Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-pale-ice"
          />
        </div>

        {/* Category Filters */}
        <div className="overflow-x-auto pb-2 -mx-lg px-lg">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </div>

        {/* Family Filters */}
        <div className="flex gap-2 flex-wrap">
          <Chip
            label="Toddler-friendly"
            selected={toddlerFriendlyOnly}
            onClick={() => setToddlerFriendlyOnly(!toddlerFriendlyOnly)}
            icon={<Icons.Baby size={14} />}
          />
          <Chip
            label="Pregnancy-safe"
            selected={pregnancySafeOnly}
            onClick={() => setPregnancySafeOnly(!pregnancySafeOnly)}
            icon={<Icons.Pregnant size={14} />}
          />
        </div>

        {/* Results Count */}
        <div className="text-body text-pale-ice">
          {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'} found
        </div>

        {/* Activities List */}
        <div className="space-y-md">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onAddToDay={handleAddToDay}
              onMoreInfo={handleMoreInfo}
            />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-xl text-pale-ice">
            <p className="text-h3 mb-2">No activities found</p>
            <p className="text-body">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
