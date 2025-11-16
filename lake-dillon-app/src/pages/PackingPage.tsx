import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout';
import { Card, Button, Input, Icons, Chip } from '../components/ui';
import { familyMembers } from '../data/family';
import { getDefaultPackingItems } from '../data/packingDefaults';
import type { PackingItem } from '../data/packingDefaults';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const PackingPage: React.FC = () => {
  const [selectedMemberId, setSelectedMemberId] = useState(familyMembers[0].id);
  const [packingItems, setPackingItems] = useState<Record<string, PackingItem[]>>({});
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PackingItem['category']>('Other');
  const [isLoading, setIsLoading] = useState(true);
  const [showCheckedItems, setShowCheckedItems] = useState(false);

  const categories: PackingItem['category'][] = [
    'Clothing',
    'Toiletries',
    'Baby Gear',
    'Entertainment',
    'Food',
    'Documents',
    'Other',
  ];

  // Load packing lists from Firebase or use defaults
  useEffect(() => {
    const loadPackingLists = async () => {
      setIsLoading(true);
      const newPackingItems: Record<string, PackingItem[]> = {};

      for (const member of familyMembers) {
        try {
          const docRef = doc(db, 'packingLists', member.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            newPackingItems[member.id] = docSnap.data().items as PackingItem[];
          } else {
            // Use defaults if no saved list
            newPackingItems[member.id] = getDefaultPackingItems(member.id, member.name);
          }
        } catch (error) {
          console.error(`Error loading packing list for ${member.name}:`, error);
          // Fallback to defaults on error
          newPackingItems[member.id] = getDefaultPackingItems(member.id, member.name);
        }
      }

      setPackingItems(newPackingItems);
      setIsLoading(false);
    };

    loadPackingLists();
  }, []);

  // Save packing list to Firebase
  const savePackingList = async (memberId: string, items: PackingItem[]) => {
    try {
      const docRef = doc(db, 'packingLists', memberId);
      await setDoc(docRef, { items });
    } catch (error) {
      console.error('Error saving packing list:', error);
    }
  };

  const togglePacked = (itemId: string) => {
    const updatedItems = packingItems[selectedMemberId].map((item) =>
      item.id === itemId ? { ...item, packed: !item.packed } : item
    );

    setPackingItems({ ...packingItems, [selectedMemberId]: updatedItems });
    savePackingList(selectedMemberId, updatedItems);
  };

  const addCustomItem = () => {
    if (!newItemName.trim()) return;

    const newItem: PackingItem = {
      id: `${selectedMemberId}-custom-${Date.now()}`,
      name: newItemName,
      category: selectedCategory,
      packed: false,
      isDefault: false,
      familyMemberId: selectedMemberId,
    };

    const updatedItems = [...(packingItems[selectedMemberId] || []), newItem];
    setPackingItems({ ...packingItems, [selectedMemberId]: updatedItems });
    savePackingList(selectedMemberId, updatedItems);

    setNewItemName('');
    setSelectedCategory('Other');
  };

  const deleteItem = (itemId: string) => {
    const updatedItems = packingItems[selectedMemberId].filter((item) => item.id !== itemId);
    setPackingItems({ ...packingItems, [selectedMemberId]: updatedItems });
    savePackingList(selectedMemberId, updatedItems);
  };

  const selectedMember = familyMembers.find((m) => m.id === selectedMemberId);
  const currentItems = packingItems[selectedMemberId] || [];
  const packedCount = currentItems.filter((item) => item.packed).length;
  const totalCount = currentItems.length;
  const progressPercentage = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  // Filter items based on visibility toggle
  const visibleItems = showCheckedItems
    ? currentItems
    : currentItems.filter((item) => !item.packed);

  // Group items by category
  const itemsByCategory = visibleItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  if (isLoading) {
    return (
      <Layout title="Packing">
        <div className="flex items-center justify-center h-64">
          <p className="text-body text-pale-ice">Loading packing lists...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Packing">
      <div className="space-y-lg">
        <div>
          <h1 className="text-h1 text-frost-white">Packing Lists</h1>
          <p className="text-body text-pale-ice mt-2">
            Track what you need to pack for the trip
          </p>
        </div>

        {/* Family Member Selector */}
        <div className="overflow-x-auto pb-2 -mx-lg px-lg">
          <div className="flex gap-2 min-w-max">
            {familyMembers.map((member) => (
              <Chip
                key={member.id}
                label={member.name}
                selected={selectedMemberId === member.id}
                onClick={() => setSelectedMemberId(member.id)}
              />
            ))}
          </div>
        </div>

        {/* Progress Card */}
        <Card className="space-y-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-h2 text-frost-white">{selectedMember?.name}'s Progress</h2>
            <span className="text-h3 text-accent-blue">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-deep-navy bg-opacity-50 rounded-full h-2">
            <div
              className="bg-accent-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-body-compact text-pale-ice">
              {packedCount} of {totalCount} items packed
            </p>
            <Button
              variant={showCheckedItems ? 'secondary' : 'primary'}
              onClick={() => setShowCheckedItems(!showCheckedItems)}
              className="text-body-compact"
            >
              {showCheckedItems ? (
                <>
                  <Icons.CheckCircle size={14} />
                  <span>Hide Checked</span>
                </>
              ) : (
                <>
                  <Icons.CheckCircle size={14} />
                  <span>Show Checked ({packedCount})</span>
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Add Custom Item */}
        <Card className="space-y-sm">
          <h3 className="text-h2 text-frost-white">Add Custom Item</h3>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Item name..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
              className="flex-1"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as PackingItem['category'])}
              className="bg-deep-navy text-frost-white rounded-subtle px-sm text-body border border-pale-ice border-opacity-20"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Button variant="primary" onClick={addCustomItem}>
              <Icons.Plus size={16} />
            </Button>
          </div>
        </Card>

        {/* Packing Items by Category */}
        <div className="space-y-xl">
          {categories.map((category) => {
            const items = itemsByCategory[category] || [];
            if (items.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-h2 text-frost-white px-lg mb-md">{category}</h3>
                <div className="-mx-lg">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="list-item flex items-center gap-3"
                    >
                      <button
                        onClick={() => togglePacked(item.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-spring ${
                          item.packed
                            ? 'bg-accent-blue border-accent-blue'
                            : 'border-pale-ice border-opacity-40'
                        }`}
                      >
                        {item.packed && <Icons.Check size={16} className="text-frost-white" />}
                      </button>
                      <span
                        className={`flex-1 text-body transition-all ${
                          item.packed
                            ? 'text-pale-ice line-through opacity-60'
                            : 'text-frost-white'
                        }`}
                      >
                        {item.name}
                      </span>
                      {!item.isDefault && (
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="btn-icon-small text-pale-ice"
                        >
                          <Icons.Trash size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
