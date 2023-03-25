import { Config } from 'tailwindcss'
import { preset } from '@learnvue/tailwind-preset'
import tailwindTypography from '@tailwindcss/typography'

const disabledCss = {
  'code::before': false,
  'code::after': false,
  'blockquote p:first-of-type::before': false,
  'blockquote p:last-of-type::after': false,
  pre: false,
  code: false,
  'pre code': false
}

export default <Config>{
  exclude: ['.nuxt'],
  presets: [preset],
  content: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.{vue,js}',
    'content/**/*.{md,yml,json,json5,csv}',
    'assets/**/*.svg'
  ],
  theme: {
    extend: {
      padding: {
        xs: '0.5rem', // p-2
        sm: '1rem', // p-4
        md: '2rem', // p-8
        lg: '3rem' // p-12
      },
      typography: {
        DEFAULT: { css: disabledCss },
        sm: { css: disabledCss },
        lg: { css: disabledCss },
        xl: { css: disabledCss },
        '2xl': { css: disabledCss }
      }
    }
  },
  plugins: [tailwindTypography]
}
