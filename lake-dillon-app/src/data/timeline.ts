import type { DayTimeline } from '../types';

export const initialTimeline: DayTimeline[] = [
  {
    date: '2025-11-20',
    dayName: 'Thursday',
    tripPhase: 'ARRIVAL_DAY',
    timeSlots: {
      morning: {
        activities: [],
        meals: [],
        startTime: '08:00',
        isEmpty: false, // Drive day - locked
      },
      afternoon: {
        activities: [],
        meals: [],
        startTime: '12:00',
        isEmpty: false, // Drive day - locked
      },
      evening: {
        activities: [],
        meals: [],
        startTime: '18:00',
        isEmpty: false, // Drive day - locked
      },
    },
    notes: 'DRIVE DAY: Depart Houston 3:00 PM. Long drive through the night.',
  },
  {
    date: '2025-11-21',
    dayName: 'Friday',
    tripPhase: 'ARRIVAL_DAY',
    timeSlots: {
      morning: {
        activities: [],
        meals: [],
        startTime: '08:00',
        isEmpty: false, // Arrival morning - locked
      },
      afternoon: {
        activities: [],
        meals: [],
        startTime: '13:00',
        isEmpty: false, // Check-in time - locked
      },
      evening: {
        activities: [],
        meals: [],
        startTime: '18:00',
        isEmpty: true, // User can plan evening
      },
    },
    notes: 'ARRIVAL DAY: Arrive 1:00 PM, check-in at Spinnaker. Evening is flexible.',
  },
  {
    date: '2025-11-22',
    dayName: 'Saturday',
    tripPhase: 'FULL_ACTIVITY_DAY',
    timeSlots: {
      morning: {
        activities: [],
        meals: [],
        startTime: '08:00',
        isEmpty: true,
      },
      afternoon: {
        activities: [],
        meals: [],
        startTime: '12:00',
        isEmpty: true,
      },
      evening: {
        activities: [],
        meals: [],
        startTime: '18:00',
        isEmpty: true,
      },
    },
  },
  {
    date: '2025-11-23',
    dayName: 'Sunday',
    tripPhase: 'FULL_ACTIVITY_DAY',
    timeSlots: {
      morning: {
        activities: [],
        meals: [],
        startTime: '08:00',
        isEmpty: true,
      },
      afternoon: {
        activities: [],
        meals: [],
        startTime: '12:00',
        isEmpty: true,
      },
      evening: {
        activities: [],
        meals: [],
        startTime: '18:00',
        isEmpty: true,
      },
    },
  },
  {
    date: '2025-11-24',
    dayName: 'Monday',
    tripPhase: 'FULL_ACTIVITY_DAY',
    timeSlots: {
      morning: {
        activities: [],
        meals: [],
        startTime: '08:00',
        isEmpty: true,
      },
      afternoon: {
        activities: [],
        meals: [],
        startTime: '12:00',
        isEmpty: true,
      },
      evening: {
        activities: [],
        meals: [],
        startTime: '18:00',
        isEmpty: true,
      },
    },
  },
  {
    date: '2025-11-25',
    dayName: 'Tuesday',
    tripPhase: 'FULL_ACTIVITY_DAY',
    timeSlots: {
      morning: {
        activities: [],
        meals: [],
        startTime: '08:00',
        isEmpty: true,
      },
      afternoon: {
        activities: [],
        meals: [],
        startTime: '12:00',
        isEmpty: true,
      },
      evening: {
        activities: [],
        meals: [],
        startTime: '18:00',
        isEmpty: true,
      },
    },
  },
  {
    date: '2025-11-26',
    dayName: 'Wednesday',
    tripPhase: 'FULL_ACTIVITY_DAY',
    timeSlots: {
      morning: {
        activities: [],
        meals: [],
        startTime: '08:00',
        isEmpty: true,
      },
      afternoon: {
        activities: [],
        meals: [],
        startTime: '12:00',
        isEmpty: true,
      },
      evening: {
        activities: [],
        meals: [],
        startTime: '18:00',
        isEmpty: true,
      },
    },
    notes: 'Day before Thanksgiving - consider prep activities',
  },
  {
    date: '2025-11-27',
    dayName: 'Thursday',
    tripPhase: 'THANKSGIVING_DAY',
    isThanksgivingDay: true,
    timeSlots: {
      morning: {
        activities: [],
        meals: [],
        startTime: '08:00',
        isEmpty: true,
      },
      afternoon: {
        activities: [],
        meals: [],
        startTime: '12:00',
        isEmpty: true,
      },
      evening: {
        activities: [],
        meals: [],
        startTime: '18:00',
        isEmpty: true,
      },
    },
    thanksgivingMeal: {
      time: '17:00',
      location: 'tbd',
      participants: ['jason', 'micah', 'sam', 'leah', 'walker'],
    },
    notes: 'THANKSGIVING DAY - Main celebration',
  },
  {
    date: '2025-11-28',
    dayName: 'Friday',
    tripPhase: 'DEPARTURE_DAY',
    timeSlots: {
      morning: {
        activities: [],
        meals: [],
        startTime: '08:00',
        isEmpty: false, // Packing/checkout
      },
      afternoon: {
        activities: [],
        meals: [],
        startTime: '12:00',
        isEmpty: false, // Drive home
      },
      evening: {
        activities: [],
        meals: [],
        startTime: '18:00',
        isEmpty: false, // Drive home
      },
    },
    notes: 'DEPARTURE DAY: Check out, drive back to Houston',
  },
];
