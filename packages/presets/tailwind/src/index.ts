import type { Config } from 'tailwindcss'

export const preset: Config = {
  darkMode: 'class',
  theme: {
    container: {
      center: true
    },
    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(circle at center, var(--tw-gradient-stops))'
      },
      screens: {
        '3xl': '90rem',
        '4xl': '114rem'
      },
      fontFamily: {
        sans: [
          'Rubik',
          '-apple-system',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif'
        ],
        prose: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        handwritten: ['Virgil', 'sans-serif']
      },
      boxShadow: {
        sm: '0.25rem 0.25rem 0px 0px rgba(21, 202, 130, 0.2)',
        smDark: '0.25rem 0.25rem 0px 0px rgba(21, 202, 130, 0.2)',
        lg: '0.5rem 0.5rem 0px 0px rgba(21, 202, 130, 0.2)',
        lgDark: '0.5rem 0.5rem 0px 0px rgba(21, 202, 130, 0.2)',
        xl: '0.75rem 0.75rem 0px 0px rgba(21, 202, 130, 0.2)',
        xlDark: '0.75rem 0.75rem 0px rgba(21, 202, 130, 0.2)'
      },
      colors: {
        green: {
          DEFAULT: '#15CA82',
          50: '#39EAA4',
          100: '#32EAA1',
          200: '#25E89A',
          300: '#18E694',
          400: '#16D88B',
          500: '#15CA82',
          600: '#12AA6D',
          700: '#0E8958',
          800: '#0B6944',
          900: '#08492F'
        },
        charcoal: {
          DEFAULT: '#0F1115',
          50: '#A1AABD',
          100: '#939EB3',
          200: '#7885A1',
          300: '#616E8A',
          400: '#4E596F',
          500: '#3B4354',
          600: '#262B36',
          700: '#191C23',
          800: '#0F1115',
          900: '#080A0C'
        },
        blue: {
          DEFAULT: '#5F8AF0',
          50: '#C8D7FA',
          100: '#BCCEF9',
          200: '#A5BDF7',
          300: '#8EACF4',
          400: '#769BF2',
          500: '#5F8AF0',
          600: '#2C64EB',
          700: '#134ACC',
          800: '#0E3798',
          900: '#092565'
        }
      }
    }
  },
  variants: {
    extend: {
      backgroundSize: ['hover', 'group-hover']
    }
  },
  content: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.{vue,js}',
    'content/**/*.{md,yml,json,json5,csv}',
    'assets/**/*.svg'
  ],
  plugins: [
    function ({ addComponents }: { addComponents: (args: any) => void }) {
      addComponents({
        '.container': {
          maxWidth: '90%',
          '@screen sm': {
            maxWidth: '90%'
          },
          '@screen md': {
            maxWidth: '90%'
          },
          '@screen lg': {
            maxWidth: '90%'
          },
          '@screen xl': {
            maxWidth: '70rem'
          },
          '@screen 2xl': {
            maxWidth: '80rem'
          }
        }
      })
    }
  ]
}
