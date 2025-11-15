import React from 'react';
import { Icons } from './Icons';

interface AddressLinkProps {
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  name: string;
  className?: string;
}

export const AddressLink: React.FC<AddressLinkProps> = ({
  address,
  coordinates,
  name,
  className = '',
}) => {
  if (!address && !coordinates) {
    return null;
  }

  const handleClick = () => {
    let mapsUrl: string;

    if (coordinates) {
      // Use coordinates for precise location
      mapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
    } else if (address) {
      // Use address search
      const query = encodeURIComponent(`${name}, ${address}`);
      mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    } else {
      return;
    }

    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-start gap-2 text-left transition-smooth hover:text-accent-blue ${className}`}
    >
      <Icons.MapPin size={14} className="mt-0.5 flex-shrink-0" />
      <span className="text-body-compact underline">{address || 'View on Map'}</span>
    </button>
  );
};
