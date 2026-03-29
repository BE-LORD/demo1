/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Color System - Deep Space Navy & Electric Teal
        'bg-deepest': '#03051A',
        'bg-deep': '#06091E',
        'bg-card': '#0A0F2E',
        'bg-surface': 'rgba(10,15,46,0.85)',
        'bg-elevated': '#131B42',
        
        // Electric Teal Accent Colors
        'electric-teal': '#00D4C8',
        'bright-teal': '#00FFED',
        'teal-dim': '#00A89E',
        
        // Secondary Accents
        'sky-blue': '#38BDF8',
        'blue-electric': '#60A5FA',
        
        // Text Colors
        'white-pearl': '#EEF4FF',
        'white-muted': 'rgba(238,244,255,0.8)',
        'mist-text': '#7B93C8',
        
        // Utility Colors
        'green-wa': '#22C55E',
        'coral-error': '#F87171',
      },
      fontFamily: {
        'cabinet': ['Cabinet Grotesk', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        'satoshi': ['Satoshi', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        'chakra': ['Chakra Petch', 'system-ui', '-apple-system', 'Segoe UI', 'monospace'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'chat-ring': 'chatRing 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 212, 200, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(0, 212, 200, 0)' },
        },
        chatRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 212, 200, 0.5)' },
          '70%': { boxShadow: '0 0 0 16px rgba(0, 212, 200, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 212, 200, 0)' },
        },
      },
    },
  },
  plugins: [],
}
