import type { FamilyMember } from '../types';

export const familyMembers: FamilyMember[] = [
  {
    id: 'jason',
    name: 'Jason',
    age: 35,
  },
  {
    id: 'micah',
    name: 'Micah',
    age: 33,
    isPregnant: true,
    specialNeeds: ['6 months pregnant', 'Needs frequent breaks', 'Low-impact activities only'],
  },
  {
    id: 'sam',
    name: 'Sam',
    age: 30,
  },
  {
    id: 'leah',
    name: 'Leah',
    age: 3,
    isToddler: true,
    specialNeeds: ['Toddler-friendly activities', 'Needs nap time', 'Frequent snacks'],
  },
  {
    id: 'walker',
    name: 'Walker',
    age: 1.5,
    isToddler: true,
    specialNeeds: ['Toddler-friendly activities', 'Stroller access', 'Frequent diaper changes'],
  },
];
