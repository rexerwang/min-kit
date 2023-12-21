import { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  corePlugins: {
    preflight: false,
    container: false,
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.flex-center': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        },
        '.flex-center-y': {
          display: 'flex',
          'align-items': 'center',
        },
        '.flex-center-x': {
          display: 'flex',
          'justify-content': 'center',
        },
        // prevent agent style
        '.btn': {
          'margin-left': 'unset',
          'margin-right': 'unset',
          'padding-left': 'unset',
          'padding-right': 'unset',
          border: '0',
          'border-color': 'inherit',
          'line-height': 'inherit',
          'font-size': 'inherit',
          '&::after': {
            content: 'none',
          },
        },
        '.skeleton': {
          'background-color': theme('colors.gray.200'),
          'border-radius': theme('spacing.1'),
          animation: theme('animation.pulse'),
        },
      })
    }),
  ],
  theme: {
    extend: {
      colors: {},
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      fontSize: {
        '2xs': ['0.625rem', '0.875rem'],
      },
      borderWidth: {
        DEFAULT: '1PX', // avoid transform 1px
      },
      borderRadius: {
        100: '100%',
      },
    },
  },
} as Config
