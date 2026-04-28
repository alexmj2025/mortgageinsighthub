import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a56db',
          foreground: '#ffffff',
          dark: '#1e429f',
        },
        accent: {
          green: '#16a34a',
          red: '#dc2626',
        },
        background: '#f8fafc',
        card: '#ffffff',
        border: '#e2e8f0',
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#475569',
        },
        foreground: '#0f172a',
        secondary: '#475569',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-mobile': ['36px', { lineHeight: '1.1', fontWeight: '700' }],
      },
      maxWidth: {
        'site': '1200px',
      },
    },
  },
  plugins: [],
}

export default config
