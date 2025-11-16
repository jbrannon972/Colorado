// Simple script to generate PWA icons
// This creates basic colored SVG files as placeholders
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple SVG icon
const createSVGIcon = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a1929;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e3a5f;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.1}"/>
  <g transform="translate(${size * 0.5}, ${size * 0.5})">
    <!-- Mountain peaks -->
    <path d="M ${-size * 0.3} ${size * 0.15} L ${-size * 0.15} ${-size * 0.1} L 0 ${size * 0.05} L ${size * 0.15} ${-size * 0.15} L ${size * 0.3} ${size * 0.15} Z"
          fill="#a8d5ff" opacity="0.6"/>
    <!-- Lake -->
    <ellipse cx="0" cy="${size * 0.2}" rx="${size * 0.25}" ry="${size * 0.08}" fill="#4a90e2" opacity="0.8"/>
    <!-- Sun/Moon -->
    <circle cx="${size * 0.2}" cy="${-size * 0.2}" r="${size * 0.08}" fill="#ffd700" opacity="0.9"/>
  </g>
</svg>`;

// Save icons
const publicDir = path.join(__dirname, 'public');

// Create 192x192 icon
fs.writeFileSync(
  path.join(publicDir, 'pwa-192x192.svg'),
  createSVGIcon(192)
);

// Create 512x512 icon
fs.writeFileSync(
  path.join(publicDir, 'pwa-512x512.svg'),
  createSVGIcon(512)
);

// Create apple touch icon
fs.writeFileSync(
  path.join(publicDir, 'apple-touch-icon.svg'),
  createSVGIcon(180)
);

// Create mask icon (simple monochrome)
const maskIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#1e3a5f"/>
  <g transform="translate(256, 256)">
    <path d="M -150 75 L -75 -50 L 0 25 L 75 -75 L 150 75 Z" fill="white"/>
    <ellipse cx="0" cy="100" rx="125" ry="40" fill="white"/>
  </g>
</svg>`;

fs.writeFileSync(
  path.join(publicDir, 'mask-icon.svg'),
  maskIcon
);

// Create favicon
fs.writeFileSync(
  path.join(publicDir, 'favicon.svg'),
  createSVGIcon(32)
);

console.log('✓ Generated SVG icons for PWA');
console.log('  - pwa-192x192.svg');
console.log('  - pwa-512x512.svg');
console.log('  - apple-touch-icon.svg');
console.log('  - mask-icon.svg');
console.log('  - favicon.svg');
console.log('\nNote: You can replace these with custom PNG icons later if desired.');
