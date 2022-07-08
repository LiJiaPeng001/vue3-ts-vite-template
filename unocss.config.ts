import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'
import type { Preset } from 'unocss'

const remRE = /^-?[\.\d]+rem$/

export interface RemToPxOptions {
  /**
   * 1rem = n px
   * @default 16
   */
  baseFontSize?: number
}

function remToPxPreset(options: RemToPxOptions = {}): Preset {
  const {
    baseFontSize = 16,
  } = options

  return {
    name: '@unocss/preset-rem-to-px',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (value && typeof value === 'string' && remRE.test(value))
          i[1] = `${+value.slice(0, -3) * baseFontSize}px`
      })
    },
  }
}

export default defineConfig({
  shortcuts: [
    ['btn', 'px-6 py-4 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    remToPxPreset({ baseFontSize: 4 })
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
