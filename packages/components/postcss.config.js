module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-rem-to-responsive-pixel': {
      rootValue: 32,
      propList: ['*'],
      transformUnit: 'rpx',
    },
  },
}
