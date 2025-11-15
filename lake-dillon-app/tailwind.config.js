/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors (Frozen Palette)
        'deep-navy': '#0A1929',
        'icy-blue': '#1A3A52',
        'frost-white': '#E8F0F7',
        'accent-blue': '#4DB8E8',
        'pale-ice': '#B3D9F0',

        // Functional Colors
        'success-teal': '#6BA8A8',
        'warning-brown': '#8B7A6B',
        'error-rose': '#A67C7C',
        'info-slate': '#7A9BB8',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'h1': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['18px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['16px', { lineHeight: '1.25', fontWeight: '600' }],
        'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-compact': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.3', fontWeight: '500' }],
        'button': ['13px', { lineHeight: '1', fontWeight: '600' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'xxl': '32px',
      },
      maxWidth: {
        'mobile': '425px',
      },
      height: {
        'button': '36px',
        'button-compact': '28px',
        'input': '40px',
        'nav': '48px',
        'list-item': '52px',
      },
      borderRadius: {
        'subtle': '4px',
        'pill': '12px',
      },
    },
  },
  plugins: [],
}
