const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    plugin(({ addComponents }) => {
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
      })
    }),
  ],
  theme: {
    extend: {
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
}
