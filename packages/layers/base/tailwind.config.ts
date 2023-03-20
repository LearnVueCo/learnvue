import { Config } from 'tailwindcss'
import { preset } from '@learnvue/tailwind-preset'
export default <Config>{
  exclude: ['.nuxt'],
  presets: [preset],
  content: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.{vue,js}',
    'content/**/*.{md,yml,json,json5,csv}',
    'assets/**/*.svg'
  ]
}
