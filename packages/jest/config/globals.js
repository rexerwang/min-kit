/* eslint no-undef: 0 */

const globals = {
  wx: {
    onAppRoute() {},
    onAppRouteDone() {},
  },
  console: {
    ...console,
    debug() {},
  },
}

for (const [key, value] of Object.entries(globals)) {
  Object.defineProperty(globalThis, key, { value, configurable: true, writable: true, enumerable: true })
}
