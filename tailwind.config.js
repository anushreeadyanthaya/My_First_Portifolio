/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          base: '#080B14',
          surface: '#101729',
          elevated: '#19233C',
          border: 'rgba(38, 139, 255, 0.18)',
          'border-subtle': 'rgba(255, 255, 255, 0.08)',
          text: {
            primary: '#F3F6FF',
            secondary: '#A6B0C5',
            muted: '#64748B'
          }
        },
        light: {
          base: '#F8FAFC',
          surface: '#FFFFFF',
          elevated: '#F1F5F9',
          border: 'rgba(15, 23, 42, 0.12)',
          'border-subtle': 'rgba(15, 23, 42, 0.06)',
          text: {
            primary: '#0F172A',
            secondary: '#475569',
            muted: '#94A3B8'
          }
        },
        electric: {
          blue: '#268BFF',
          'blue-hover': '#1A75E8',
          'blue-light': '#0265D2'
        },
        cyber: {
          violet: '#9566FF',
          'violet-hover': '#804DFE',
          'violet-light': '#7C3AED',
          cyan: '#00E5FF',
          emerald: '#10B981',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif']
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'terminal-blink': 'blink 1s step-end infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      },
      boxShadow: {
        'neon-blue': '0 0 20px -3px rgba(38, 139, 255, 0.35)',
        'neon-violet': '0 0 20px -3px rgba(149, 102, 255, 0.35)',
        'terminal-glow': '0 0 35px -5px rgba(38, 139, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
