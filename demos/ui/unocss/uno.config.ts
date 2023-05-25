// uno.config.ts
import { defineConfig } from 'unocss'
import { presetUno, presetWebFonts } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'bunny', // default provider
      fonts: {
        // these will extend the default theme
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
        // custom ones
        lobster: 'Lobster',
        lato: [
          {
            name: 'Lato',
            weights: ['400', '700'],
            italic: true
          },
          {
            name: 'sans-serif',
            provider: 'none'
          }
        ]
      }
    })
  ],
  transformers: [transformerVariantGroup()]
  // ...UnoCSS options
})
