export function px(n: number | string) {
  return n + 'px'
}

px.of = <T extends Record<string, number | string>>(obj: T) => {
  return Object.keys(obj).reduce(
    (o, k: keyof T) => {
      o[k] = px(obj[k])
      return o
    },
    {} as Record<keyof T, string>,
  )
}
