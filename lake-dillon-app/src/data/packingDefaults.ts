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
    // WINTER OUTERWEAR - Critical for Colorado November
    { name: 'Heavy winter coat/parka', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Lightweight puffy jacket (layering)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Fleece or wool sweater (2)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Waterproof snow pants', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Insulated winter boots', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Waterproof winter gloves', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Glove liners (for extra warmth)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Winter hat/beanie', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Ear warmers/headband', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Wool or fleece scarf', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Neck gaiter/buff', category: 'Clothing', packed: false, isDefault: true },

    // BASE LAYERS & EVERYDAY CLOTHING
    { name: 'Thermal underwear tops (3-4)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Thermal underwear bottoms (3-4)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Wool/synthetic socks (8-10 pairs)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Regular underwear (8+ pairs)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Sports bras/undershirts (4-5)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Long-sleeve shirts (5-6)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'T-shirts for layering (4-5)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Jeans/casual pants (3 pairs)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Leggings/yoga pants (2 pairs)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Sweatshirt/hoodie (2)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Cardigan/zip-up sweater', category: 'Clothing', packed: false, isDefault: true },

    // SLEEPWEAR & LOUNGEWEAR
    { name: 'Warm pajamas (2 sets)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Robe/loungewear', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Cozy socks for sleeping', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Indoor slippers/house shoes', category: 'Clothing', packed: false, isDefault: true },

    // SHOES
    { name: 'Comfortable sneakers/walking shoes', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Dress shoes/nice boots (Thanksgiving)', category: 'Clothing', packed: false, isDefault: true },

    // NICE/THANKSGIVING OUTFIT
    { name: 'Nicer top for Thanksgiving', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Dress pants/skirt for Thanksgiving', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Dress or nice outfit (Thanksgiving)', category: 'Clothing', packed: false, isDefault: true },

    // ACCESSORIES
    { name: 'Belt', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Sunglasses (sun is VERY bright at altitude!)', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Jewelry/watch', category: 'Clothing', packed: false, isDefault: true },
    { name: 'Purse/wallet', category: 'Other', packed: false, isDefault: true },
    { name: 'Backpack/day bag', category: 'Other', packed: false, isDefault: true },

    // DENTAL CARE
    { name: 'Toothbrush & toothpaste', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Dental floss', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Mouthwash', category: 'Toiletries', packed: false, isDefault: true },

    // HAIR CARE
    { name: 'Shampoo & conditioner', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Hair brush/comb', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Hair ties/clips/bobby pins', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Hair dryer', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Hair styling products (gel, spray, etc)', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Dry shampoo', category: 'Toiletries', packed: false, isDefault: true },

    // BODY CARE
    { name: 'Body wash/soap', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Face wash/cleanser', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Deodorant', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Shaving razor & cream', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Loofah/washcloth', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Towel (if needed)', category: 'Toiletries', packed: false, isDefault: true },

    // SKIN CARE - EXTRA IMPORTANT AT ALTITUDE!
    { name: 'Face moisturizer (HIGH ALTITUDE - bring extra!)', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Body lotion (extra moisture needed)', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Hand cream', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Lip balm with SPF (CRITICAL! Bring 2-3)', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Sunscreen SPF 50+ for face', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Sunscreen SPF 50+ for body', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'After-sun lotion/aloe vera', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Facial tissues/Kleenex', category: 'Toiletries', packed: false, isDefault: true },

    // COSMETICS
    { name: 'Makeup & cosmetics', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Makeup remover/cleansing wipes', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Cotton swabs/balls', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Nail clippers/file', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Tweezers', category: 'Toiletries', packed: false, isDefault: true },

    // FEMININE CARE
    { name: 'Feminine hygiene products', category: 'Toiletries', packed: false, isDefault: true },

    // VISION CARE
    { name: 'Contact lenses & solution', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Glasses & case', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Backup glasses/contacts', category: 'Toiletries', packed: false, isDefault: true },

    // MEDICATIONS & HEALTH
    { name: 'Prescription medications (8+ days)', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Pain relievers (Advil/Tylenol)', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Allergy medicine', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Altitude sickness pills (Diamox if prone)', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Anti-nausea medicine', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Stomach medicine (Tums/Pepto)', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Cold/flu medicine', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Cough drops/throat lozenges', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Band-aids/bandages', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'First aid kit', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Thermometer', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Vitamins/supplements', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Hand sanitizer', category: 'Toiletries', packed: false, isDefault: true },
    { name: 'Face masks', category: 'Toiletries', packed: false, isDefault: true },

    // DOCUMENTS & IMPORTANT PAPERS
    { name: 'Driver\'s license/ID', category: 'Documents', packed: false, isDefault: true },
    { name: 'Health insurance cards', category: 'Documents', packed: false, isDefault: true },
    { name: 'Car insurance info', category: 'Documents', packed: false, isDefault: true },
    { name: 'Credit/debit cards', category: 'Documents', packed: false, isDefault: true },
    { name: 'Cash for tips/small purchases ($100-200)', category: 'Documents', packed: false, isDefault: true },
    { name: 'Spinnaker rental confirmation/keys', category: 'Documents', packed: false, isDefault: true },
    { name: 'Emergency contact list', category: 'Documents', packed: false, isDefault: true },
    { name: 'Car registration/rental papers', category: 'Documents', packed: false, isDefault: true },

    // ELECTRONICS & CHARGERS
    { name: 'Cell phone', category: 'Other', packed: false, isDefault: true },
    { name: 'Phone charger & cable', category: 'Other', packed: false, isDefault: true },
    { name: 'Car charger for phone', category: 'Other', packed: false, isDefault: true },
    { name: 'Portable power bank/battery', category: 'Other', packed: false, isDefault: true },
    { name: 'Laptop/tablet & charger', category: 'Other', packed: false, isDefault: true },
    { name: 'Camera & charger/extra batteries', category: 'Other', packed: false, isDefault: true },
    { name: 'SD cards for camera', category: 'Other', packed: false, isDefault: true },
    { name: 'Headphones/earbuds', category: 'Entertainment', packed: false, isDefault: true },
    { name: 'Watch & charger (Apple Watch, etc)', category: 'Other', packed: false, isDefault: true },
    { name: 'E-reader/Kindle & charger', category: 'Entertainment', packed: false, isDefault: true },
    { name: 'Extension cord/power strip', category: 'Other', packed: false, isDefault: true },
    { name: 'Universal adapter (if needed)', category: 'Other', packed: false, isDefault: true },

    // ENTERTAINMENT & COMFORT
    { name: 'Books (physical)', category: 'Entertainment', packed: false, isDefault: true },
    { name: 'Magazines', category: 'Entertainment', packed: false, isDefault: true },
    { name: 'Travel pillow for car', category: 'Other', packed: false, isDefault: true },
    { name: 'Blanket for car ride', category: 'Other', packed: false, isDefault: true },
    { name: 'Eye mask for sleeping', category: 'Other', packed: false, isDefault: true },
    { name: 'Earplugs', category: 'Other', packed: false, isDefault: true },
    { name: 'Playing cards/card games', category: 'Entertainment', packed: false, isDefault: true },
    { name: 'Board games/travel games', category: 'Entertainment', packed: false, isDefault: true },
    { name: 'Puzzle book/crosswords', category: 'Entertainment', packed: false, isDefault: true },
    { name: 'Journal/notebook & pen', category: 'Entertainment', packed: false, isDefault: true },

    // FOOD & DRINKS
    { name: 'Reusable water bottles (1-2)', category: 'Food', packed: false, isDefault: true },
    { name: 'Insulated coffee mug/tumbler', category: 'Food', packed: false, isDefault: true },
    { name: 'Snacks for car (nuts, bars, crackers)', category: 'Food', packed: false, isDefault: true },
    { name: 'Gum/mints', category: 'Food', packed: false, isDefault: true },
    { name: 'Coffee/tea bags (favorite brand)', category: 'Food', packed: false, isDefault: true },
    { name: 'Favorite condiments/hot sauce', category: 'Food', packed: false, isDefault: true },
    { name: 'Protein powder/meal replacement', category: 'Food', packed: false, isDefault: true },

    // LAUNDRY & CLEANING
    { name: 'Laundry detergent pods/packets', category: 'Other', packed: false, isDefault: true },
    { name: 'Stain remover stick', category: 'Other', packed: false, isDefault: true },
    { name: 'Fabric freshener spray', category: 'Other', packed: false, isDefault: true },
    { name: 'Dryer sheets', category: 'Other', packed: false, isDefault: true },
    { name: 'Disinfecting wipes', category: 'Other', packed: false, isDefault: true },

    // STORAGE & ORGANIZATION
    { name: 'Reusable shopping bags', category: 'Other', packed: false, isDefault: true },
    { name: 'Ziploc bags (gallon, quart, sandwich)', category: 'Other', packed: false, isDefault: true },
    { name: 'Garbage bags (small & large)', category: 'Other', packed: false, isDefault: true },
    { name: 'Packing cubes/organizers', category: 'Other', packed: false, isDefault: true },
    { name: 'Toiletry bag/dopp kit', category: 'Other', packed: false, isDefault: true },
    { name: 'Dirty laundry bag', category: 'Other', packed: false, isDefault: true },

    // CAR & EMERGENCY SUPPLIES
    { name: 'Ice scraper/snow brush', category: 'Other', packed: false, isDefault: true },
    { name: 'Emergency roadside kit', category: 'Other', packed: false, isDefault: true },
    { name: 'Jumper cables', category: 'Other', packed: false, isDefault: true },
    { name: 'Flashlight/headlamp', category: 'Other', packed: false, isDefault: true },
    { name: 'Extra batteries', category: 'Other', packed: false, isDefault: true },
    { name: 'Tire pressure gauge', category: 'Other', packed: false, isDefault: true },
    { name: 'Emergency blanket (car)', category: 'Other', packed: false, isDefault: true },

    // MISCELLANEOUS
    { name: 'Umbrella/rain jacket', category: 'Other', packed: false, isDefault: true },
    { name: 'Safety pins', category: 'Other', packed: false, isDefault: true },
    { name: 'Sewing kit', category: 'Other', packed: false, isDefault: true },
    { name: 'Duct tape', category: 'Other', packed: false, isDefault: true },
    { name: 'Swiss Army knife/multi-tool', category: 'Other', packed: false, isDefault: true },
    { name: 'Cooler for food/drinks', category: 'Other', packed: false, isDefault: true },
    { name: 'Binoculars (wildlife viewing)', category: 'Other', packed: false, isDefault: true },
    { name: 'Hiking poles (if planning hikes)', category: 'Other', packed: false, isDefault: true },
  ];

  // Person-specific items
  const personSpecificItems: Partial<Record<string, Omit<PackingItem, 'id' | 'familyMemberId'>[]>> = {
    'micah': [
      // Pregnancy-specific
      { name: 'Prenatal vitamins', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Maternity clothes (3-4 outfits)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Maternity leggings/pants (2-3)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Comfortable supportive shoes', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Pregnancy support pillow', category: 'Other', packed: false, isDefault: true },
      { name: 'Compression socks (for swelling)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Maternity belly band/support', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Extra comfortable bras', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Nausea medicine/ginger candies', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Hydration supplements', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Pregnancy-safe pain reliever (Tylenol)', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'OB/GYN contact info', category: 'Documents', packed: false, isDefault: true },
      { name: 'Pregnancy medical records', category: 'Documents', packed: false, isDefault: true },
    ],
    'leah': [
      // Toddler essentials
      { name: 'Favorite stuffed animal/lovey', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Coloring books & crayons', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Stickers & sticker books', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Small toys for car (3-5)', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Tablet with downloaded shows/games', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Snacks for car (goldfish, fruit snacks)', category: 'Food', packed: false, isDefault: true },
      { name: 'Sippy cups (2-3)', category: 'Food', packed: false, isDefault: true },
      { name: 'Extra underwear/pull-ups (10+)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Snow suit/one-piece winter outfit', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Warm mittens with clips', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Winter boots (insulated)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Change of clothes (2 sets for accidents)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Night light for bedroom', category: 'Other', packed: false, isDefault: true },
      { name: 'Potty seat/training potty', category: 'Other', packed: false, isDefault: true },
      { name: 'Children\'s pain reliever/medicine', category: 'Toiletries', packed: false, isDefault: true },
    ],
    'walker': [
      // Baby essentials (extensive list)
      { name: 'Diapers (60-70 diapers for 8 days)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Baby wipes (2-3 large packs)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Diaper bags (2)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Changing pad (portable)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Diaper rash cream', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Baby powder', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Baby formula/milk (8+ days)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Bottles (6-8)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Bottle brush & dish soap', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Bottle warmer', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Bibs (5-7)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Burp cloths (6-8)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Baby food/purees (jars/pouches)', category: 'Food', packed: false, isDefault: true },
      { name: 'Baby snacks (puffs, crackers)', category: 'Food', packed: false, isDefault: true },
      { name: 'Baby spoons & bowls', category: 'Food', packed: false, isDefault: true },
      { name: 'Sippy cups (2-3)', category: 'Food', packed: false, isDefault: true },
      { name: 'Baby carrier/wrap', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Stroller', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Car seat', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Pack \'n play/portable crib', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Crib sheets (2-3)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Sleep sacks (2-3)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Pajamas (4-5 sets)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Onesies (8-10)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Warm outfits (5-6)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Socks (10+ pairs)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Baby winter coat/bunting', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Baby hat (2-3)', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Baby mittens', category: 'Clothing', packed: false, isDefault: true },
      { name: 'Favorite toys (3-5)', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Teething toys', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Books (board books, 3-5)', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Pacifiers (3-4)', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Pacifier clips', category: 'Baby Gear', packed: false, isDefault: true },
      { name: 'Baby shampoo/body wash', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Baby lotion', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Baby nail clippers', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Baby thermometer', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Baby pain reliever (Tylenol)', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Gripe water/gas drops', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Saline drops/nasal aspirator', category: 'Toiletries', packed: false, isDefault: true },
      { name: 'Baby monitor', category: 'Other', packed: false, isDefault: true },
      { name: 'Night light', category: 'Other', packed: false, isDefault: true },
      { name: 'White noise machine', category: 'Other', packed: false, isDefault: true },
      { name: 'Sunshade for car windows', category: 'Other', packed: false, isDefault: true },
    ],
    'sam': [
      { name: 'Books for car ride (3-5)', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Gaming device/Nintendo Switch', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Game cartridges/cases', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Headphones for gaming', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Charger for gaming device', category: 'Other', packed: false, isDefault: true },
      { name: 'Snacks for car ride', category: 'Food', packed: false, isDefault: true },
      { name: 'Water bottle', category: 'Food', packed: false, isDefault: true },
      { name: 'Journal/sketchbook', category: 'Entertainment', packed: false, isDefault: true },
      { name: 'Colored pencils/markers', category: 'Entertainment', packed: false, isDefault: true },
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
