/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#ec4899',
        },
        accent: {
          DEFAULT: '#f59e0b',
        },
        background: '#0f172a',
        foreground: '#f8fafc',
        card: {
          DEFAULT: '#1e293b',
          foreground: '#f8fafc',
        },
        border: '#334155',
        input: '#1e293b',
        ring: '#6366f1',
        glass: 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        success: '#22c55e',
        error: '#ef4444',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        bangla: ['var(--font-bangla)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
      },
    },
  },
  plugins: [],
}
