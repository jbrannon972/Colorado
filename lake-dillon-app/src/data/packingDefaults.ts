export interface PackingItem {
  id: string;
  name: string;
  category: 'Clothing' | 'Toiletries' | 'Baby Gear' | 'Entertainment' | 'Food' | 'Documents' | 'Other';
  packed: boolean;
  isDefault: boolean;
  familyMemberId?: string;
}

export const getDefaultPackingItems = (familyMemberId: string, memberName: string): PackingItem[] => {
  const commonItems: Omit<PackingItem, 'id' | 'familyMemberId'>[] = [
    // Clothing
    { name: 'Warm jacket/coat', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Snow pants', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Winter boots', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Gloves/mittens', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Winter hat/beanie', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Scarf', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Thermal underwear', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Warm socks (5-7 pairs)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Pajamas', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Casual outfits (4-5 days)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Nicer outfit (for Thanksgiving)', category: 'Clothing', packed: false, isDefault: true },

    // Toiletries
    { name: 'Toothbrush & toothpaste', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Shampoo & conditioner', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Body wash/soap', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Deodorant', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Moisturizer (high altitude!)', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Lip balm', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Sunscreen (SPF 50+)', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Medications', category: 'Toiletries', packed: false, isDefault: true },

    // Documents & Other
    { name: 'ID/Driver\'s license', category: 'Documents', packed: false, isDefault: true },
    { name: 'Phone charger', category: 'Other', packed: false, isDefault: true },
    { name: 'Headphones', category: 'Entertainment', packed: false, isDefault: true },
  ];

  // Person-specific items
  const personSpecificItems: Partial<Record<string, Omit<PackingItem, 'id' | 'familyMemberId'>[]>> = {
    'micah': [
      { name: 'Prenatal vitamins', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Maternity clothes', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Comfortable shoes', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Pregnancy pillow', category: 'Other', packed: false, isDefault: true },
    ],
    'leah': [
      { name: 'Favorite stuffed animal', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Coloring books & crayons', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Snacks for car ride', category: 'Food', packed: false, isDefault: true },
      { name: 'Extra underwear/pull-ups', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Snow suit', category: 'Clothing', packed: false, isDefault: true },
    ],
    'walker': [
      { name: 'Diapers (7-8 days worth)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Wipes', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Baby formula/bottles', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Baby food/snacks', category: 'Food', packed: false, isDefault: true },
      { name: 'Baby carrier', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Stroller', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Sleep sack/pajamas', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Favorite toys', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Pacifiers', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Diaper rash cream', category: 'Baby Gear', packed: false, isDefault: true },
    ],
    'sam': [
      { name: 'Books for car ride', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Gaming device/Switch', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Snacks for car ride', category: 'Food', packed: false, isDefault: true },
    ],
  };

  const memberKey = memberName.toLowerCase();
  const specificItems = personSpecificItems[memberKey] || [];

  return [...commonItems, ...specificItems].map((item, index) => ({
    ...item,
    id: `${familyMemberId}-${index}`,
    familyMemberId,
  }));
};
