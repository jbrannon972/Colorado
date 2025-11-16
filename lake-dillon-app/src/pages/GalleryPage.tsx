import React, { useState, useMemo } from 'react';
import { Layout } from '../components/layout';
import { Card, Button, Icons, Chip, Input } from '../components/ui';
import { useTimeline } from '../hooks/useTimeline';
import type { Photo } from '../types';

export const GalleryPage: React.FC = () => {
  const { timeline, loading } = useTimeline();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Collect all photos from timeline
  const allPhotos = useMemo(() => {
    const photos: Photo[] = [];

    timeline.forEach((day) => {
      Object.entries(day.timeSlots).forEach(([slotType, slot]) => {
        // Activity photos
        slot.activities.forEach((activity) => {
          if (activity.photos) {
            activity.photos.forEach((photo) => {
              photos.push({
                ...photo,
                date: photo.date || day.date,
                timeSlot: photo.timeSlot || (slotType as any),
              });
            });
          }
        });

        // Meal photos
        slot.meals.forEach((meal) => {
          if (meal.photos) {
            meal.photos.forEach((photo) => {
              photos.push({
                ...photo,
                date: photo.date || day.date,
                timeSlot: photo.timeSlot || (slotType as any),
              });
            });
          }
        });
      });
    });

    // Sort by date/time
    return photos.sort((a, b) => b.uploadedAt - a.uploadedAt);
  }, [timeline]);

  // Filter photos
  const filteredPhotos = useMemo(() => {
    return allPhotos.filter((photo) => {
      if (selectedDate && photo.date !== selectedDate) return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          photo.description?.toLowerCase().includes(searchLower) ||
          photo.location?.activityName?.toLowerCase().includes(searchLower) ||
          photo.location?.restaurantName?.toLowerCase().includes(searchLower) ||
          photo.location?.customLocation?.toLowerCase().includes(searchLower) ||
          photo.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      }
      return true;
    });
  }, [allPhotos, selectedDate, searchTerm]);

  // Get unique dates
  const uniqueDates = useMemo(() => {
    const dates = new Set(allPhotos.map((p) => p.date).filter((d): d is string => !!d));
    return Array.from(dates).sort();
  }, [allPhotos]);

  const handleExportPhotos = () => {
    // Create JSON export with all metadata
    const exportData = filteredPhotos.map((photo) => ({
      url: photo.url,
      uploadedAt: new Date(photo.uploadedAt).toISOString(),
      description: photo.description || '',
      location: photo.location?.activityName ||
                photo.location?.restaurantName ||
                photo.location?.customLocation ||
                'Unknown',
      date: photo.date ? new Date(photo.date + 'T12:00:00').toLocaleDateString() : 'Unknown',
      timeSlot: photo.timeSlot || 'Unknown',
      tags: photo.tags || [],
    }));

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lake-dillon-photos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Layout title="Gallery">
        <div className="flex items-center justify-center py-xl">
          <Icons.Image size={48} className="text-accent-blue animate-pulse" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Gallery">
      <div className="space-y-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h1 text-frost-white">Photo Gallery</h1>
            <p className="text-body text-pale-ice mt-2">
              {allPhotos.length} {allPhotos.length === 1 ? 'photo' : 'photos'} from your trip
            </p>
          </div>
          {filteredPhotos.length > 0 && (
            <Button variant="primary" onClick={handleExportPhotos}>
              <Icons.Download size={16} />
              Export
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by location, description, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Icons.Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-pale-ice"
          />
        </div>

        {/* Date Filters */}
        <div className="overflow-x-auto pb-2 -mx-lg px-lg">
          <div className="flex gap-2 min-w-max">
            <Chip
              label="All Dates"
              selected={selectedDate === null}
              onClick={() => setSelectedDate(null)}
            />
            {uniqueDates.map((date) => {
              const dateObj = new Date(date + 'T12:00:00');
              const dayInfo = timeline.find((d) => d.date === date);
              return (
                <Chip
                  key={date}
                  label={dayInfo?.dayName || dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  selected={selectedDate === date}
                  onClick={() => setSelectedDate(date)}
                />
              );
            })}
          </div>
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length === 0 ? (
          <Card className="text-center py-xl">
            <Icons.Image size={48} className="text-pale-ice mx-auto mb-4" />
            <p className="text-h3 text-frost-white mb-2">No photos yet</p>
            <p className="text-body text-pale-ice">
              Photos you upload will appear here
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filteredPhotos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="aspect-square rounded-subtle overflow-hidden bg-deep-navy group relative"
              >
                <img
                  src={photo.url}
                  alt={photo.description || 'Trip photo'}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-deep-navy bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end p-2">
                  <div className="text-frost-white text-body-compact opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    {photo.location?.activityName || photo.location?.restaurantName || photo.description || 'Photo'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Photo Detail Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-md">
            <div
              className="absolute inset-0 bg-deep-navy bg-opacity-90 backdrop-blur-sm"
              onClick={() => setSelectedPhoto(null)}
            />
            <div className="relative bg-gradient-to-b from-icy-blue to-deep-navy rounded-subtle border border-pale-ice border-opacity-10 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-deep-navy bg-opacity-90 backdrop-blur-sm p-md border-b border-pale-ice border-opacity-10 flex items-center justify-between">
                <h3 className="text-h3 text-frost-white">Photo Details</h3>
                <button onClick={() => setSelectedPhoto(null)} className="text-pale-ice hover:text-frost-white">
                  <Icons.X size={24} />
                </button>
              </div>

              {/* Photo */}
              <div className="p-md">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.description || 'Trip photo'}
                  className="w-full rounded-subtle"
                />
              </div>

              {/* Metadata */}
              <div className="p-md space-y-sm">
                {selectedPhoto.description && (
                  <div>
                    <label className="text-label text-pale-ice">DESCRIPTION</label>
                    <p className="text-body text-frost-white mt-1">{selectedPhoto.description}</p>
                  </div>
                )}

                {selectedPhoto.location && (
                  <div>
                    <label className="text-label text-pale-ice">LOCATION</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Icons.MapPin size={14} className="text-accent-blue" />
                      <span className="text-body text-frost-white">
                        {selectedPhoto.location.activityName ||
                         selectedPhoto.location.restaurantName ||
                         selectedPhoto.location.customLocation}
                      </span>
                    </div>
                  </div>
                )}

                {selectedPhoto.date && (
                  <div>
                    <label className="text-label text-pale-ice">DATE & TIME</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Icons.Calendar size={14} className="text-accent-blue" />
                      <span className="text-body text-frost-white">
                        {new Date(selectedPhoto.date + 'T12:00:00').toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                        {selectedPhoto.timeSlot && ` • ${selectedPhoto.timeSlot}`}
                      </span>
                    </div>
                  </div>
                )}

                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div>
                    <label className="text-label text-pale-ice">TAGS</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPhoto.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-accent-blue bg-opacity-10 text-accent-blue rounded-subtle text-body-compact"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-label text-pale-ice">UPLOADED</label>
                  <p className="text-body-compact text-pale-ice mt-1">
                    {new Date(selectedPhoto.uploadedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
