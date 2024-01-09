export function requireDefault(path: string) {
  const m = require(path)
  return m.default ?? m
}
