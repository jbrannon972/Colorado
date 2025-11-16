export type TripPhase = 'ARRIVAL_DAY' | 'FULL_ACTIVITY_DAY' | 'THANKSGIVING_DAY' | 'DEPARTURE_DAY';

export type TimeSlotType = 'morning' | 'afternoon' | 'evening';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type Town = 'Breckenridge' | 'Frisco' | 'Silverthorne' | 'Keystone' | 'Dillon' | 'Idaho Springs' | 'Georgetown';

export interface Activity {
  id: string;
  name: string;
  category: string[];
  description: string;
  durationHours: { min: number; max: number };
  driveTimeMinutes: number;
  costPerPerson?: { min: number; max: number };
  toddlerFriendly: boolean;
  pregnancySafe: boolean;
  rating?: number;
  reviewCount?: number;
  bookingLink?: string;
  website?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  town: Town;
  seasonalNotes?: string;
  available?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  town: Town;
  driveTimeFromSpinnaker: number;

  pricePerPerson?: { min: number; max: number };
  totalForFamilyOf5?: number;

  phone?: string;
  website?: string;
  reservationLink?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };

  hours: Array<{
    dayOfWeek: string;
    open: string;
    close: string;
  }>;

  toddlerFriendly: boolean;
  pregnancySafe: boolean;
  spaceForStroller: boolean;
  boosterSeatAvailable: boolean;

  rating: number;
  reviewCount: number;
  topReviews?: string[];

  servesBreakfast?: boolean;
  servesLunch?: boolean;
  servesDinner?: boolean;

  takeout?: boolean;
  delivery?: boolean;
  curbside?: boolean;
  outdoorSeating?: boolean;
  specialRequirements?: string[];

  openThanksgiving?: boolean;
  specialThanksgivingMenu?: boolean;
}

export interface Photo {
  id: string;
  url: string;
  uploadedAt: number;
  uploadedBy?: string;
  description?: string;
  location?: {
    activityId?: string;
    activityName?: string;
    restaurantId?: string;
    restaurantName?: string;
    customLocation?: string;
  };
  date?: string; // The date this photo was taken (from timeline)
  timeSlot?: TimeSlotType;
  tags?: string[];
}

export interface ActivityInstance {
  id: string;
  activityId: string;
  addedAt: number;
  notes?: string;
  confirmedParticipants?: string[];
  startTime?: string;
  photos?: Photo[]; // Array of photo metadata
}

export interface MealInstance {
  id: string;
  type: MealType;
  customTime?: string;

  restaurantId?: string;
  customMeal?: {
    whatWereEating: string;
    whosCooking?: string[];
    ingredients?: string[];
    notes?: string;
  };

  participants: string[];
  reservationRequired?: boolean;
  reservationTime?: string;
  reservationConfirmed?: boolean;
  photos?: Photo[]; // Array of photo metadata
}

export interface TimeSlot {
  activities: ActivityInstance[];
  meals: MealInstance[];
  startTime: string;
  isEmpty: boolean;
}

export interface ThanksgivingMeal {
  time: string;
  location: 'restaurant' | 'cabin' | 'tbd';
  restaurantId?: string;
  participants: string[];
}

export interface DayTimeline {
  date: string;
  dayName: string;
  tripPhase: TripPhase;

  timeSlots: {
    morning: TimeSlot;
    afternoon: TimeSlot;
    evening: TimeSlot;
  };

  isThanksgivingDay?: boolean;
  thanksgivingMeal?: ThanksgivingMeal;

  weatherSummary?: {
    temp: number;
    condition: string;
    precipitation: number;
  };
  notes?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  age?: number;
  isPregnant?: boolean;
  isToddler?: boolean;
  specialNeeds?: string[];
}
