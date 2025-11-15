# Lake Dillon Thanksgiving App - DESIGN SYSTEM & VISUAL LANGUAGE
## Frozen-Inspired Minimalist Mobile Experience

---

## DESIGN PHILOSOPHY

**Theme**: Dark, Frozen (Disney's Frozen movie) - icy, minimal, elegant, winter-inspired  
**Platform**: Mobile-first (optimize for 375px-428px phone screens)  
**Aesthetic**: Subtle, minimalist, sophisticated winter landscape  
**Interaction**: Buttons NOT large, concise screens, maximum information density without clutter  
**Navigation**: Hamburger menu (primary), with minimal top-level navigation  

---

## PART 1: COLOR PALETTE

### Primary Colors (Frozen Palette)
- **Deep Navy**: `#0A1929` - Primary background (darkest, main screen bg)
- **Icy Blue**: `#1A3A52` - Secondary background (slightly lighter)
- **Frost White**: `#E8F0F7` - Text, primary content (NOT pure white, slightly cool-tinted)
- **Accent Blue**: `#4DB8E8` - Interactive elements, highlights (icy glacial blue)
- **Pale Ice**: `#B3D9F0` - Secondary text, borders, subtle accents

### Functional Colors (Subtle, not colorful)
- **Success**: `#6BA8A8` - Muted teal (completed activities, confirmed bookings)
- **Warning**: `#8B7A6B` - Warm gray-brown (weather alerts, timing conflicts)
- **Error**: `#A67C7C` - Muted dusty rose (cancellations, issues)
- **Info**: `#7A9BB8` - Muted slate blue (informational text, tips)

### Never Use
- Bright primary colors (reds, greens, oranges)
- High-saturation colors
- Colored emojis or icons
- Warm yellows or bright oranges

---

## PART 2: TYPOGRAPHY

### Font Family
- **Primary**: `Inter` (clean, minimal, modern)
  - Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI'`
- **Why**: Geometric, minimal, perfectly suited for mobile. No serifs, no personality — let the content speak.

### Font Hierarchy (Mobile Optimized)

**Headings**
- **H1** (Page title): `24px` / `700 weight` / `1.2 line-height` - Frost White
  - Example: "Saturday, November 22"
- **H2** (Section title): `18px` / `600 weight` / `1.3 line-height` - Frost White
  - Example: "Morning", "Afternoon", "Evening"
- **H3** (Activity/Restaurant name): `16px` / `600 weight` / `1.25 line-height` - Frost White
  - Example: "Rocky Mountain Elk Viewing Tour"

**Body Text**
- **Body Regular**: `14px` / `400 weight` / `1.5 line-height` - Pale Ice
  - For descriptions, details, secondary info
- **Body Compact**: `13px` / `400 weight` / `1.4 line-height` - Pale Ice
  - For metadata: time, duration, distance
- **Label**: `12px` / `500 weight` / `1.3 line-height` - Pale Ice
  - For tags, filters, small UI labels

**Interactive**
- **Button Text**: `13px` / `600 weight` - Frost White (on dark bg)
- **Link Text**: `14px` / `500 weight` - Accent Blue (underline on hover, not throughout)

### No Emojis
- Replace all emojis with **simple monochrome icon symbols**
- Examples:
  - `⏱️` time → Simple clock icon (line-based)
  - `📍` location → Simple location pin icon
  - `💰` cost → Simple dollar-sign icon
  - `👶` toddler → Simple figure icon
  - `🤰` pregnant → Simple figure with indicator
  - **All icons**: monochrome, line-based, 16-20px, matching Frost White or Pale Ice

---

## PART 3: LAYOUT & SPACING (MOBILE-FIRST)

### Screen Width (iPhone Standard)
- **Max width**: 425px (fits iPhone SE through iPhone Pro Max)
- **Safe area**: 16px margins on left/right (leaves 393px content area)
- **Safe area bottom**: 20px (iPhone notch/home indicator)

### Spacing System (8px base unit)
- **xs**: 4px (rarely used, icon spacing only)
- **sm**: 8px (spacing between tightly related elements)
- **md**: 12px (standard spacing between elements)
- **lg**: 16px (spacing between sections)
- **xl**: 24px (spacing between major sections)
- **xxl**: 32px (spacing between distinct screens/panels)

### Component Sizes (Intentionally NOT Large)
- **Button height**: 36px (not 44px - we want compact)
- **Input height**: 40px
- **Card height**: variable (content-driven, but max 180px)
- **List item height**: 52px (+ 8px separator)
- **Icon size**: 16-20px (not 24px)
- **Hamburger menu icon**: 20px (precise, minimal lines)

### Touch Targets
- Minimum tap area: 44x44px (but VISUAL elements smaller)
- Padding inside buttons: 8px horizontal, 8px vertical
- This allows buttons to look small but remain touch-friendly

---

## PART 4: NAVIGATION STRUCTURE

### Hamburger Menu (Primary)
**Position**: Top-left corner, 16px from top/left  
**Icon**: Three horizontal lines, `20px` tall, `2px` stroke, Frost White  
**No label**: Just icon, no "Menu" text

**Menu Contents**:
```
[Hamburger Icon]

┌─────────────────────────────┐
│ Lake Dillon               X │
├─────────────────────────────┤
│                             │
│ 📅 Timeline                 │ (icon: calendar, line-based)
│ 🎯 Activities               │ (icon: target, line-based)
│ 🍽️  Dining                  │ (icon: fork/spoon, line-based)
│ 📋 Packing                  │ (icon: checklist, line-based)
│ 👥 Family                   │ (icon: people, line-based)
│ ⚙️  Settings                 │ (icon: gear, line-based)
│                             │
└─────────────────────────────┘
```

**Close button**: X icon (top-right of menu), 16px, line-based

### Top Navigation Bar
- **Always visible** (sticky)
- **Height**: 48px (including safe area padding)
- **Left**: Hamburger menu (20px icon, 16px padding)
- **Center**: Page title (optional, h2 size)
- **Right**: Optional action (search, filters, settings icon) - 16px, optional

---

## PART 5: COMPONENT DESIGN

### Activity/Meal Cards

**Card Structure** (NOT large):
```
┌────────────────────────────┐
│ Rocky Mountain Elk Tour    │ (H3, 16px)
│ Wildlife Viewing           │ (label, 12px, muted)
├────────────────────────────┤
│ ⏱️  4-5 hrs │ 📍 45 min   │ (metadata, 13px, compact)
│ 💰 $$ per person           │ (cost, 13px)
├────────────────────────────┤
│ 👶 Toddler-friendly        │ (icon + text, 13px)
│ 🤰 Pregnancy-safe          │
├────────────────────────────┤
│ [More Info]  [Add to Sat]  │ (buttons, 13px text, 36px height)
└────────────────────────────┘
```

**Colors**:
- Background: Icy Blue (`#1A3A52`)
- Borders: 1px Pale Ice (`#B3D9F0`, 20% opacity)
- Title text: Frost White
- Metadata: Pale Ice
- Buttons: Accent Blue background, Frost White text

**Spacing**:
- Internal padding: 12px
- Title to subtitle: 4px
- Metadata rows: 8px apart
- Button row gap: 8px

### Buttons (Small, Not Large)

**Style**: 
- Height: 36px
- Padding: 8px horizontal, 8px vertical
- Border radius: 4px (subtle, not rounded)
- Font: 13px, 600 weight
- Icons: 16px (if included)

**States**:
```
DEFAULT:
Background: Accent Blue (#4DB8E8)
Text: Frost White
Border: None

HOVER:
Background: Lighter Accent Blue (#5DC9F8)
Text: Frost White
Transition: 150ms

ACTIVE/PRESSED:
Background: Darker Accent Blue (#3CA8D8)
Text: Frost White

DISABLED:
Background: Pale Ice (#B3D9F0) with 30% opacity
Text: Pale Ice with 50% opacity
Cursor: not-allowed
```

**Example Button Variations**:
- **Primary**: "Add to Saturday" → Full width or inline, Accent Blue
- **Secondary**: "More Info" → Outlined style (Accent Blue border, transparent bg, Accent Blue text)
- **Danger**: "Delete" → Muted rose color
- **Success**: "Confirm" → Muted teal color

**Compact Buttons for Filters**:
- Height: 28px (NOT 36px)
- Padding: 6px 12px
- Font: 12px
- Example: "[Toddler-Friendly] [Under 2hrs] [Close to Cabin]"

### Time Slot Containers

**Empty Slot**:
```
┌────────────────────────────┐
│ MORNING                    │ (H2, 18px)
│ 8:00 AM                    │ (body, 14px, muted)
│                            │
│ [Empty - No activities]    │ (body, 13px, Pale Ice)
│                            │
│ [+ Add Activity]           │ (button, 28px height, secondary)
│ [+ Add Meal]               │ (button, 28px height, secondary)
└────────────────────────────┘
```

**Filled Slot with Activities**:
```
┌────────────────────────────┐
│ MORNING                    │ (H2)
│ 8:00 AM - 12:30 PM         │ (body, time range)
├────────────────────────────┤
│ 🍽️  Arapahoe Cafe Breakfast│ (meal card, compact)
│ 8:00 AM | Eating out       │
├────────────────────────────┤
│ 🎯 Rocky Mountain Elk Tour │ (activity card, compact)
│ 10:00 AM | 4-5 hrs         │
├────────────────────────────┤
│ [+ Add] [Drag to reorder]  │ (small buttons)
└────────────────────────────┘
```

### Filters (Activity Browser)

**Layout**: Horizontal scrollable chips below search bar
```
[Search activities...]

[All] [Wildlife] [Hiking] [Scenic] [Dining] [Winter] >
[Duration ▼] [Distance ▼] [Price ▼]

(Activities list below)
```

**Filter Chip Styling**:
- Height: 28px
- Padding: 6px 12px
- Background: Pale Ice with 15% opacity
- Text: Pale Ice, 12px
- Selected: Background Accent Blue, Text Frost White
- Border radius: 12px (pill-shaped)

### Meal Planning Interface

**Input Style** (compact):
```
SATURDAY BREAKFAST

What we're doing:
☑ Eating out
☐ Cooking at Spinnaker

[Browse Restaurants ▼]

Time: [8:00 AM ▼]
Participants: [Jason, Micah, Sam] [+Add]

[Confirm]
```

**Inputs**:
- Height: 40px
- Font: 14px
- Background: Icy Blue (`#1A3A52`)
- Border: 1px Pale Ice with 30% opacity
- Text: Frost White
- Placeholder: Pale Ice with 50% opacity
- Padding: 8px 12px
- Border radius: 4px

---

## PART 6: INTERACTIVE STATES & ANIMATIONS

### Transitions
- **Button hover/tap**: 150ms ease-in-out
- **Card open/collapse**: 200ms ease-out
- **Menu slide in/out**: 250ms ease-in-out
- **All animations**: Smooth, not bouncy

### Touch Feedback
- **On press**: Slight opacity change (0.85), no ripple effect
- **On hover (web)**: Subtle color shift
- **Visual feedback**: Immediate (no delays)

### Loading States
- **Minimal loader**: Rotating line animation (no spinner)
- **Color**: Accent Blue
- **Size**: 20px
- **Text below**: "Loading..." (12px, Pale Ice)

---

## PART 7: DARK MODE (PRIMARY - NO LIGHT MODE)

This app is **DARK ONLY**. No light mode toggle.

**Why**: 
- Frozen aesthetic is inherently dark/cool
- Mobile usage in mountains (often evening/night)
- Protects night vision when planning outdoors
- Minimal battery drain (important in mountains)

---

## PART 8: ACCESSIBILITY (MINIMAL VIOLATIONS)

### Color Contrast
- All text on backgrounds: Minimum WCAG AA (4.5:1 for body text)
- Frost White on Deep Navy: 11.5:1 ✅
- Pale Ice on Deep Navy: 5.8:1 ✅
- Accent Blue on Deep Navy: 4.2:1 (borderline - OK for UI elements, not body text)

### Touch Targets
- All clickable elements: Minimum 44x44px tap area (even if visuals are smaller)
- Padding: Add invisible padding to make touch areas larger

### Focus States (Mobile)
- Focus ring: 2px Accent Blue (visible on keyboard navigation)
- Only visible on keyboard (not on touch tap)

### Text Sizing
- Minimum: 12px (only for labels/meta)
- Body: 13-14px (always readable)
- No text smaller than 12px for any user-facing content

---

## PART 9: VISUAL EXAMPLES (ASCII ART)

### Homepage/Timeline Screen (Mobile)

```
┌─────────────────────────────┐
│ ≡  Lake Dillon      [icons] │ (top nav, 48px)
├─────────────────────────────┤
│ NOVEMBER 2025               │ (H1, 24px)
│ Your Trip So Far            │ (body, muted)
├─────────────────────────────┤
│ [Fri 11/21] [Sat 11/22] ▸   │ (day selector, horizontal scroll)
│ [← Arrival] [Selected →]    │
├─────────────────────────────┤
│                             │
│ SATURDAY, NOVEMBER 22       │ (H2)
│                             │
│ ┌───────────────────────┐   │
│ │ MORNING (8am)         │   │
│ │ [+ Add Activity]      │   │
│ │ [+ Add Meal]          │   │
│ └───────────────────────┘   │
│                             │
│ ┌───────────────────────┐   │
│ │ AFTERNOON (1pm)       │   │
│ │ Elk Viewing Tour      │   │
│ │ 1:00 PM - 5:00 PM     │   │
│ │ [x] [drag]            │   │
│ │ [+ Add Meal]          │   │
│ └───────────────────────┘   │
│                             │
│ ┌───────────────────────┐   │
│ │ EVENING (6pm)         │   │
│ │ [+ Add Activity]      │   │
│ │ [+ Add Meal]          │   │
│ └───────────────────────┘   │
│                             │
└─────────────────────────────┘
```

### Activity Browser Screen

```
┌─────────────────────────────┐
│ ≡  Activities              │
├─────────────────────────────┤
│ [Search activities...]      │
│                             │
│ [All] [Wildlife] [Scenic]   │
│ [Duration ▼] [Price ▼]      │
├─────────────────────────────┤
│                             │
│ ┌───────────────────────┐   │
│ │ Elk Viewing Tour      │   │
│ │ Wildlife Viewing      │   │
│ │ ⏱️  4-5h │ 📍 45min    │   │
│ │ 💰 $$ per person      │   │
│ │ 👶 ✓  🤰 ✓            │   │
│ │ [More] [Add to Sat]   │   │
│ └───────────────────────┘   │
│                             │
│ ┌───────────────────────┐   │
│ │ Sapphire Pt Overlook  │   │
│ │ Photography/Scenic    │   │
│ │ ⏱️  1h │ 📍 15min      │   │
│ │ 💰 Free               │   │
│ │ 👶 ✓  🤰 ⚠️            │   │
│ │ [More] [Add to Sat]   │   │
│ └───────────────────────┘   │
│                             │
│ ┌───────────────────────┐   │
│ │ Georgetown Loop Train  │   │
│ │ Train/Historic        │   │
│ │ ⏱️  2-3h │ 📍 45min    │   │
│ │ 💰 $$ per person      │   │
│ │ 👶 ✓  🤰 ✓            │   │
│ │ [More] [Add to Sat]   │   │
│ └───────────────────────┘   │
│                             │
└─────────────────────────────┘
```

### Thanksgiving Day Screen

```
┌─────────────────────────────┐
│ ≡  Thanksgiving             │
├─────────────────────────────┤
│ THURSDAY, NOV 27            │
│ Thanksgiving Day            │
├─────────────────────────────┤
│                             │
│ ┌───────────────────────┐   │
│ │ MORNING               │   │
│ │ Light activities OK   │   │
│ │ [+ Add Activity]      │   │
│ │ [+ Add Meal]          │   │
│ └───────────────────────┘   │
│                             │
│ ┌───────────────────────┐   │
│ │ THANKSGIVING DINNER   │   │
│ │ (Main Celebration)    │   │
│ │ ⏰ 5:00 PM            │   │
│ │ ☑ Eating out         │   │
│ │ ☐ Cooking at cabin    │   │
│ │ [Browse Restaurants]  │   │
│ │ Participants: All     │   │
│ └───────────────────────┘   │
│                             │
│ ┌───────────────────────┐   │
│ │ EVENING               │   │
│ │ Family time           │   │
│ │ [+ Add Activity]      │   │
│ └───────────────────────┘   │
│                             │
└─────────────────────────────┘
```

---

## PART 10: DESIGN SYSTEM DELIVERABLES FOR DEVELOPER

### Required Files/Specifications
1. **Color tokens** (CSS variables or Tailwind config)
   ```css
   --color-bg-primary: #0A1929;
   --color-bg-secondary: #1A3A52;
   --color-text-primary: #E8F0F7;
   --color-text-secondary: #B3D9F0;
   --color-accent: #4DB8E8;
   ```

2. **Typography scale** (line-height, letter-spacing)
   ```
   H1: 24px / 700 / 1.2
   H2: 18px / 600 / 1.3
   H3: 16px / 600 / 1.25
   Body: 14px / 400 / 1.5
   Compact: 13px / 400 / 1.4
   Label: 12px / 500 / 1.3
   ```

3. **Spacing tokens** (4px, 8px, 12px, 16px, 24px, 32px)

4. **Component library**:
   - Button (primary, secondary, compact, danger, success)
   - Card (activity, meal, empty)
   - Input (text, dropdown, time)
   - Chip/Filter
   - Time slot container
   - Menu

5. **Icon set** (line-based, monochrome, 16-20px):
   - Calendar, target, fork-spoon, checklist, people, gear
   - Clock, location-pin, dollar-sign, figure, figure-pregnant
   - Plus, minus, x, menu, search, arrow-right, trash
   - Check, warning, info

6. **Animation specs**:
   - Button: 150ms ease-in-out
   - Menu: 250ms ease-in-out
   - Card: 200ms ease-out

---

## FINAL DESIGN BRIEF TO DEVELOPER

> Build **mobile-first, minimal, Frozen-inspired**. Think icy, subtle, sophisticated winter landscape. Dark navy and icy blue. NO bright colors. NO emojis. Clean typography. Buttons small but functional. Hamburger menu for navigation. Every screen should fit on one mobile screen without excessive scrolling.

> This is a TOOL, not entertainment. Beauty comes from simplicity and purposefulness. Every pixel has a reason. Every interaction is intentional.

> **Frozen aesthetic**: Cold, clean, minimalist. Like looking at an icy mountain landscape at twilight. Elegant. Quiet. Peaceful.

---

**END OF DESIGN SYSTEM**

*Ready for implementation with Figma, React Native, or native iOS/Android design specifications.*
